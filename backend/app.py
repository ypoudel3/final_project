from flask import Flask
from flask_cors import CORS
from database import Config
from extensions import bcrypt, cors, init_db
from routes.auth_route import auth_bp
from routes.seller_routes import seller_bp
def create_app():
    app = Flask(__name__)
    CORS(app) 
    app.config.from_object(Config)

    bcrypt.init_app(app)
    cors.init_app(app)
    init_db(app)

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(seller_bp, url_prefix="/seller")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)