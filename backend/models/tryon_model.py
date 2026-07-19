from database import tryon_results_collection
from bson.objectid import ObjectId
from datetime import datetime


def save_tryon_result(user_id, image_data_url, tag="My Try-On"):
    doc = {
        "user_id": user_id,
        "image": image_data_url,   # base64 data URL, same format TryOnUI already renders
        "tag": tag,
        "created_at": datetime.utcnow()
    }
    result = tryon_results_collection.insert_one(doc)
    return str(result.inserted_id)


def get_user_tryon_results(user_id):
    results = list(
        tryon_results_collection.find({"user_id": user_id}).sort("created_at", -1)
    )
    for r in results:
        r["_id"] = str(r["_id"])
    return results