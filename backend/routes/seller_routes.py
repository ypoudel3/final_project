# routes/seller_route.py
from flask import Blueprint, jsonify, request
from database import listings_collection 
from bson import json_util
import json

seller_bp = Blueprint('seller', __name__)

# --- FIX 1: THE DASHBOARD ---
@seller_bp.route('/today', methods=['GET'])
def get_today():
    # We use a hardcoded email for now until your Login is connected
    test_email = "student@test.com" 
    
    # Filter the count by the seller's email
    count = listings_collection.count_documents({"seller_email": test_email})
    
    if count == 0:
        action_msg = "Finish your first listing to start selling!"
    else:
        # This will now say "You have 1 items..." or "2 items..."
        action_msg = f"You have {count} items ready for Virtual Try-On."

    return jsonify({
        "status": "success",
        "action_required": action_msg,
        "listing_count": count
    })

# --- FIX 2: THE LISTINGS (GET & POST) ---
@seller_bp.route('/listings', methods=['GET', 'POST'])
def handle_listings():
    test_email = "student@test.com"

    if request.method == 'POST':
        data = request.json
        new_item = {
            "name": data.get("name"),
            "price": data.get("price"),
            "seller_email": test_email, # 👈 FIX: Added the "Owner Tag"
            "image_url": data.get("image_url", "default.jpg"),
            "category": data.get("category", "General")
        }
        result = listings_collection.insert_one(new_item)
        return jsonify({"message": "Listing created!", "id": str(result.inserted_id)}), 201

    # 👈 FIX: Only find items belonging to THIS seller
    all_listings = list(listings_collection.find({"seller_email": test_email}))
    return json.loads(json_util.dumps(all_listings))

@seller_bp.route('/messages', methods=['GET'])
def get_messages():
    return jsonify({"messages": "No new messages"})