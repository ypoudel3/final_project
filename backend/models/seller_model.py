# 1. Import the specific collection variable you defined in database.py
from database import sellers_collection

def create_seller(seller_data):
    """Inserts a new seller into the 'sellers' collection"""
    # 2. Use the variable directly (no need for db.sellers)
    return sellers_collection.insert_one(seller_data)

def find_seller_by_email(email):
    """Finds a seller by email in the 'sellers' collection"""
    # 3. Use the variable directly
    return sellers_collection.find_one({"email": email})