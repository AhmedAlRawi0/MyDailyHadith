from flask import Flask, jsonify, request, make_response
import os
from flask_cors import CORS
import requests
from datetime import datetime
import pytz
import json
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Load quran.json
with open("quran.json", "r") as f:
    QURAN_DATA = json.load(f)

load_dotenv()

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("MONGO_DB_NAME")
COLLECTION_NAME = "quraan-persistence"

# Connect to MongoDB
try:
    client = MongoClient(MONGO_URI,
                        tls=True,
                        tlsAllowInvalidCertificates=True,
                        server_api=ServerApi('1'))
    client.admin.command('ping')
    print("Connected to MongoDB Alhamdulilah!")
    db = client[DB_NAME]
    persistence_collection = db[COLLECTION_NAME]
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    exit()

###############* Helper functions *###############
def get_current_state():
    doc = persistence_collection.find_one()
    if not doc:
        initial_state = {
            "current_surah": 1,
            "current_verse": 1,
            "last_updated": "1970-01-01",
            "last_verse": None,
            "last_verse_fr": None,
        }
        persistence_collection.insert_one(initial_state)
        return initial_state["current_surah"], initial_state["current_verse"], initial_state["last_updated"], initial_state["last_verse"], initial_state["last_verse_fr"]
    return doc.get("current_surah", 1), doc.get("current_verse", 1), doc.get("last_updated", "1970-01-01"), doc.get("last_verse", None), doc.get("last_verse_fr", None)

def update_current_state(surah, verse, verse_data, verse_data_fr):
    """Update the current state in MongoDB."""
    local_tz = pytz.timezone("US/Eastern")
    last_updated = datetime.now(local_tz).strftime("%Y-%m-%d")

    persistence_collection.update_one(
        {},
        {
            "$set": {
                "current_surah": surah,
                "current_verse": verse,
                "last_updated": last_updated,
                "last_verse": verse_data,
                "last_verse_fr": verse_data_fr,
            }
        },
        upsert=True
    )

def fetch_verse(surah, verse, translation_key):
    """Fetch verse data from the QuranEnc API."""
    url = f"https://quranenc.com/api/v1/translation/aya/{translation_key}/{surah}/{verse}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None

@app.route("/daily-verse", methods=["GET"])
def daily_verse():
    current_surah, current_verse, last_updated, last_verse, last_verse_fr = get_current_state()

    # US/Eastern timezone logic for daily verse API
    local_tz = pytz.timezone("US/Eastern")
    today = datetime.now(local_tz).strftime("%Y-%m-%d")
    language = request.args.get("Language", "english_rwwad")

    if today != last_updated:
        verse_data = fetch_verse(current_surah, current_verse, "english_rwwad")
        verse_data_fr = fetch_verse(current_surah, current_verse, "french_montada")

        if current_verse < QURAN_DATA[str(current_surah)]:
            next_surah, next_verse = current_surah, current_verse + 1
        else:  # Move to the next surah or loop back to the first surah
            next_surah = current_surah + 1 if current_surah < 114 else 1
            next_verse = 1

        if not verse_data or not verse_data_fr:
            return jsonify({"error": "Failed to fetch verse data."}), 500

        update_current_state(next_surah, next_verse, verse_data, verse_data_fr)
        response = make_response(
            jsonify(verse_data_fr if language == "French" else verse_data)
        )
    else:
        response = make_response(
            jsonify(last_verse_fr if language == "French" else last_verse)
        )

    response.headers["Cache-Control"] = "no-store"
    return response

if __name__ == "__main__":
    app.run(debug=True)
