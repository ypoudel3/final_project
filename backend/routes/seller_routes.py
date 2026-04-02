# routes/seller_route.py
from flask import Blueprint, jsonify, request
from database import listings_collection 
from bson import json_util
import json
import os # 👈 Needed to handle folders
from werkzeug.utils import secure_filename # 👈 Makes file names safe

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
def get_today():
    test_email = "student@test.com" 
    count = listings_collection.count_documents({"seller_email": test_email})
    
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
def handle_listings():
    test_email = "student@test.com"

    if request.method == 'POST':
        # 1. Check if a file was sent in the request
        file = request.files.get('image')
        
        # 2. Get text data (Since we send files, we use .form instead of .json)
        name = request.form.get("name")
        price = request.form.get("price")
        category = request.form.get("category", "General")

        filename = "default.jpg" # Default if no image is uploaded
        
        if file and file.filename != '':
            # 3. Secure the filename and save it to our folder
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))

        # 4. Create the URL for the image so React can find it
        # We assume your Flask runs on port 5000
        image_url = f"http://127.0.0.1:5000/static/uploads/{filename}"

        new_item = {
            "name": name,
            "price": price,
            "seller_email": test_email,
            "image_url": image_url, # 👈 This is the address React will use
            "category": category
        }
        
        result = listings_collection.insert_one(new_item)
        return jsonify({"message": "Listing created!", "id": str(result.inserted_id)}), 201

    # Fetch all listings
    all_listings = list(listings_collection.find({"seller_email": test_email}))
    return json.loads(json_util.dumps(all_listings))

@seller_bp.route('/messages', methods=['GET'])
def get_messages():
    return jsonify({"messages": "No new messages"})