# models/user_model.py
from database import users_collection

def create_user(user_data):
    return users_collection.insert_one(user_data)

def find_user_by_email(email):
    return users_collection.find_one({"email": email})

def find_user_by_id(user_id):
    from bson.objectid import ObjectId
    return users_collection.find_one({"_id": ObjectId(user_id)})