# database.py
from pymongo import MongoClient
from config import Config

# ✅ Single MongoDB connection for entire app
client = MongoClient(Config.MONGO_URI)
db = client["Virtual"]  # Your database name

# ✅ Export collections
users_collection = db["users"]
sos_alerts_collection = db["sos_alerts"]
legal_chats_collection = db["legal_chats"]
financial_records_collection = db["financial_records"]
abuse_reports_collection = db["abuse_reports"]
listings_collection = db["listings"]
sellers_collection = db["sellers"]