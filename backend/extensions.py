from flask_bcrypt import Bcrypt
from flask_cors import CORS
from pymongo import MongoClient

bcrypt = Bcrypt()
cors = CORS()

client = None
db = None

def init_db(app):
    global client, db
    client = MongoClient(app.config["MONGO_URI"])
    db = client["Virtual"]