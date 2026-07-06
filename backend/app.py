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

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    bcrypt.init_app(app)
    cors.init_app(app)
    init_db(app)


    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    
    # Prefix this so your React fetch calls are clear
    app.register_blueprint(seller_auth_bp, url_prefix="/api/seller")
    
    # Other seller dashboard routes
    app.register_blueprint(seller_bp, url_prefix="/seller")
    MODEL_PATH = os.path.join(os.path.dirname(__file__), "selfie_multiclass_256x256.tflite")

    @app.route("/tryon", methods=["POST"])
    def tryon():
     try:
        # FIX: decode as BGR (cv2 default), then convert BOTH to RGB
         # because process_tryon() expects RGB input for MediaPipe
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

        # Convert to RGB for the engine
        person_rgb = cv2.cvtColor(person_bgr, cv2.COLOR_BGR2RGB)
        cloth_rgb  = cv2.cvtColor(cloth_bgr,  cv2.COLOR_BGR2RGB)

        # process_tryon() returns BGR
        result_bgr = process_tryon(person_rgb, cloth_rgb)
        result_bgr = np.clip(result_bgr, 0, 255).astype(np.uint8)

        _, buf = cv2.imencode(".jpg", result_bgr)
        enc = base64.b64encode(buf).decode()

        return jsonify({"image": "data:image/jpeg;base64," + enc})

     except Exception as e:
        traceback.print_exc()   # full stack trace in terminal
        return jsonify({"error": str(e)}), 500

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)