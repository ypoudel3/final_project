from flask import Blueprint, request, jsonify
from extensions import bcrypt
from models.user_model import create_user, find_user_by_email

auth_bp = Blueprint("auth", __name__)

# 🔐 Signup
@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No input data"}), 400

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    if find_user_by_email(email):
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    user = {
        "username": username,
        "email": email,
        "password": hashed_password
    }

    create_user(user)

    return jsonify({"message": "User registered successfully"}), 201


# 🔑 Login
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No input data"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    user = find_user_by_email(email)

    if user and bcrypt.check_password_hash(user["password"], password):
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": str(user["_id"]),
                "username": user["username"],
                "email": user["email"]
            }
        }), 200

    return jsonify({"message": "Invalid credentials"}), 401