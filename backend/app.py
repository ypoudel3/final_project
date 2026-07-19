from flask import Flask, request, jsonify
from database import Config
from extensions import bcrypt, cors, init_db
from routes.auth_route import auth_bp
from routes.sellers_auth import seller_auth_bp
from routes.seller_routes import seller_bp
from flask_cors import CORS
import numpy as np
import cv2
import base64
import traceback
import os
from tryon_engine import process_tryon
from models.tryon_model import save_tryon_result, get_user_tryon_results


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    bcrypt.init_app(app)
    cors.init_app(app)
    init_db(app)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(seller_auth_bp, url_prefix="/api/seller")
    app.register_blueprint(seller_bp, url_prefix="/seller")

    MODEL_PATH = os.path.join(os.path.dirname(__file__), "selfie_multiclass_256x256.tflite")

    @app.route("/tryon", methods=["POST"])
    def tryon():
        try:
            if "person" not in request.files or "cloth" not in request.files:
                return jsonify({"error": "Both 'person' and 'cloth' files are required"}), 400

            person_bgr = cv2.imdecode(
                np.frombuffer(request.files["person"].read(), np.uint8), 1
            )
            cloth_bgr = cv2.imdecode(
                np.frombuffer(request.files["cloth"].read(), np.uint8), 1
            )

            if person_bgr is None:
                return jsonify({"error": "Could not decode person image"}), 400
            if cloth_bgr is None:
                return jsonify({"error": "Could not decode cloth image"}), 400

            person_rgb = cv2.cvtColor(person_bgr, cv2.COLOR_BGR2RGB)
            cloth_rgb = cv2.cvtColor(cloth_bgr, cv2.COLOR_BGR2RGB)

            result_bgr = process_tryon(person_rgb, cloth_rgb)
            result_bgr = np.clip(result_bgr, 0, 255).astype(np.uint8)

            _, buf = cv2.imencode(".jpg", result_bgr)
            enc = base64.b64encode(buf).decode()
            data_url = "data:image/jpeg;base64," + enc

            # save result if a logged-in user made the request
            user_id = request.form.get("user_id")
            cloth_name = request.form.get("cloth_name", "My Try-On")
            if user_id:
                save_tryon_result(user_id, data_url, tag=cloth_name)

            return jsonify({"image": data_url})

        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500

    @app.route("/tryon/gallery/<user_id>", methods=["GET"])
    def get_gallery(user_id):
        try:
            results = get_user_tryon_results(user_id)
            return jsonify({"results": results})
        except Exception as e:
            traceback.print_exc()
            return jsonify({"error": str(e)}), 500

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)