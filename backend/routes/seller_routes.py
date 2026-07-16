# routes/seller_route.py
from flask import Blueprint, jsonify, request, g
from database import listings_collection
from bson import json_util
import json
import os
from werkzeug.utils import secure_filename
from utils.auth_utils import seller_required

seller_bp = Blueprint('seller', __name__)

# Configure where to save images
UPLOAD_FOLDER = os.path.join('static', 'uploads')
if os.path.exists(UPLOAD_FOLDER):
    if os.path.isfile(UPLOAD_FOLDER):
        # If it's a file, get it out of the way!
        os.remove(UPLOAD_FOLDER)
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)
else:
    # If nothing is there, just create the folder
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@seller_bp.route('/today', methods=['GET'])
@seller_required
def get_today():
    seller_email = g.seller_email
    count = listings_collection.count_documents({"seller_email": seller_email})

    if count == 0:
        action_msg = "Finish your first listing to start selling!"
    else:
        action_msg = f"You have {count} items ready for Virtual Try-On."

    return jsonify({
        "status": "success",
        "action_required": action_msg,
        "listing_count": count
    })


@seller_bp.route('/listings', methods=['GET', 'POST'])
@seller_required
def handle_listings():
    # seller_email now comes from the verified token, never from the client
    seller_email = g.seller_email

    if request.method == 'POST':
        # 1. Check if a file was sent in the request
        file = request.files.get('image')

        # 2. Get text data (Since we send files, we use .form instead of .json)
        name = request.form.get("name")
        price = request.form.get("price")
        category = request.form.get("category", "General")

        if not name or not price:
            return jsonify({"message": "Name and price are required"}), 400

        filename = "default.jpg"  # Default if no image is uploaded

        if file and file.filename != '':
            # 3. Secure the filename and save it to our folder
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))

        # 4. Create the URL for the image so React can find it
        # We assume your Flask runs on port 5000
        image_url = f"http://127.0.0.1:5000/static/uploads/{filename}"

        # Denormalize the shop name onto the listing itself so the public
        # try-on page can group items by shop without an extra lookup/join.
        shop_name = g.seller_business_name or seller_email

        new_item = {
            "name": name,
            "price": price,
            "seller_email": seller_email,   # tied to the logged-in seller
            "seller_id": g.seller_id,
            "shop_name": shop_name,
            "image_url": image_url,
            "category": category
        }

        result = listings_collection.insert_one(new_item)
        return jsonify({"message": "Listing created!", "id": str(result.inserted_id)}), 201

    # GET: only return this seller's own listings
    all_listings = list(listings_collection.find({"seller_email": seller_email}))
    return json.loads(json_util.dumps(all_listings))


@seller_bp.route('/messages', methods=['GET'])
@seller_required
def get_messages():
    return jsonify({"messages": "No new messages"})


@seller_bp.route('/public/listings', methods=['GET'])
def get_public_listings():
    """
    PUBLIC endpoint - intentionally NOT behind @seller_required.
    This is what the customer-facing Try-On page calls to populate
    "Step 2: Select Your Outfit" with real items from every seller,
    grouped under a heading for each seller's shop name.

    Response shape:
    {
        "shops": {
            "Zara": [ {..listing..}, {..listing..} ],
            "H&M":  [ {..listing..} ]
        }
    }
    """
    all_listings = list(listings_collection.find({}))

    grouped = {}
    for item in all_listings:
        shop = item.get("shop_name") or "Unknown Shop"
        grouped.setdefault(shop, []).append(item)

    return json.loads(json_util.dumps({"shops": grouped}))