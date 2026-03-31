import os
from dotenv import load_dotenv

load_dotenv()  # 🔥 THIS IS THE KEY FIX

class Config:
    MONGO_URI = os.getenv("MONGO_URI")
    SECRET_KEY = "secret123"
    DATABASE_NAME = "Virtual"

print("MONGO_URI =", Config.MONGO_URI)