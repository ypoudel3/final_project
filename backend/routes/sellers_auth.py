from flask import Blueprint, request, jsonify
from extensions import bcrypt
# Note: You'll need to create these functions in your seller_model.py
from models.seller_model import create_seller, find_seller_by_email
from utils.auth_utils import generate_token

seller_auth_bp = Blueprint("seller_auth", __name__)

# 🔐 Seller Signup
@seller_auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No input data"}), 400

    # Extracting all the fields from your React form
    email = data.get("email")
    password = data.get("password")
    business_name = data.get("businessName")
    owner_name = data.get("ownerName")
    shop_type = data.get("shopType")
    address = data.get("address")
    phone = data.get("phone")

    # Basic Validation
    if not email or not password or not business_name:
        return jsonify({"message": "Missing required fields"}), 400

    if find_seller_by_email(email):
        return jsonify({"message": "Seller already exists with this email"}), 400

    # Hashing the password
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    seller = {
        "businessName": business_name,
        "ownerName": owner_name,
        "email": email,
        "password": hashed_password,
        "shopType": shop_type,
        "address": address,
        "phone": phone
    }

    result = create_seller(seller)

    token = generate_token({
        "_id": result.inserted_id,
        "email": email,
        "businessName": business_name,
    })

    return jsonify({
        "message": "Seller registered successfully",
        "token": token,
        "seller": {
            "id": str(result.inserted_id),
            "businessName": business_name,
            "email": email,
        },
    }), 201


# 🔑 Seller Login
@seller_auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No input data"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    seller = find_seller_by_email(email)

    if seller and bcrypt.check_password_hash(seller["password"], password):
        token = generate_token(seller)

        return jsonify({
            "message": "Seller login successful",
            "token": token,
            "seller": {
                "id": str(seller["_id"]),
                "businessName": seller["businessName"],
                "email": seller["email"]
            }
        }), 200

    return jsonify({"message": "Invalid credentials"}), 401