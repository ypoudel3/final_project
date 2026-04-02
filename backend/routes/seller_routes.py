# routes/seller_route.py
from flask import Blueprint, jsonify, request
# 1. Import your MongoDB collection
from database import listings_collection 
from bson import json_util
import json

seller_bp = Blueprint('seller', __name__)

@seller_bp.route('/today', methods=['GET'])
def get_today():
    # 2. Make this dynamic by counting documents in MongoDB
    count = listings_collection.count_documents({})
    
    if count == 0:
        action_msg = "Finish your first listing to start selling!"
    else:
        action_msg = f"You have {count} items ready for Virtual Try-On."

    return jsonify({
        "status": "success",
        "message": "Seller dashboard active",
        "action_required": action_msg,
        "listing_count": count
    })

@seller_bp.route('/listings', methods=['GET', 'POST'])
def handle_listings():
    if request.method == 'POST':
        # 3. Logic to SAVE a new clothing item to MongoDB
        data = request.json
        new_item = {
            "name": data.get("name"),
            "price": data.get("price"),
            "image_url": data.get("image_url"), # We will handle uploads later
            "category": data.get("category", "General")
        }
        result = listings_collection.insert_one(new_item)
        return jsonify({"message": "Listing created!", "id": str(result.inserted_id)}), 201

    # 4. Fetch all listings from MongoDB
    all_listings = list(listings_collection.find())
    # Convert MongoDB BSON to JSON format
    return json.loads(json_util.dumps(all_listings))

@seller_bp.route('/messages', methods=['GET'])
def get_messages():
    return jsonify({"messages": "No new messages"})