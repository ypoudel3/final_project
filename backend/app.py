from flask import Flask
from database import Config
from extensions import bcrypt, cors, init_db
from routes.auth_route import auth_bp
from routes.sellers_auth import seller_auth_bp 
from routes.seller_routes import seller_bp

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

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)