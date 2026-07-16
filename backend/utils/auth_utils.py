# utils/auth_utils.py
"""
Shared JWT helpers for the seller side of the app.

- generate_token(seller)  -> creates a signed token after signup/login
- seller_required(fn)     -> decorator that protects a route; only lets the
                              request through if a valid token is attached,
                              and makes the seller's id/email available on
                              flask.g for the route to use
"""

import os
import jwt
from datetime import datetime, timedelta, timezone
from functools import wraps
from flask import request, jsonify, g

# In production set this via an environment variable instead of hardcoding it.
SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "dev-secret-change-me")
TOKEN_EXPIRY_HOURS = 24


def generate_token(seller):
    """
    seller: dict-like with at least _id and email (businessName optional)
    """
    payload = {
        "seller_id": str(seller["_id"]),
        "email": seller["email"],
        "businessName": seller.get("businessName"),
        "exp": datetime.now(timezone.utc) + timedelta(hours=TOKEN_EXPIRY_HOURS),
        "iat": datetime.now(timezone.utc),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def seller_required(f):
    """
    Protects a route. The frontend must send:
        Authorization: Bearer <token>
    On success, g.seller_id / g.seller_email / g.seller_business_name
    are populated for the route to use.
    """

    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")

        if not auth_header.startswith("Bearer "):
            return jsonify({"message": "Missing or invalid authorization token"}), 401

        token = auth_header.split(" ", 1)[1]

        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Session expired, please log in again"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token"}), 401

        g.seller_id = payload["seller_id"]
        g.seller_email = payload["email"]
        g.seller_business_name = payload.get("businessName")

        return f(*args, **kwargs)

    return decorated