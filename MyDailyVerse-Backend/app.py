from flask import Flask, jsonify, request, make_response
import os
from flask_cors import CORS
import requests
from datetime import datetime
import pytz
import json
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Load quran.json
with open("quran.json", "r") as f:
    QURAN_DATA = json.load(f)

load_dotenv()

# PostgreSQL configuration
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_PORT = os.getenv("DB_PORT")

# Connect to PostgreSQL
try:
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT,
        cursor_factory=RealDictCursor # returning rows as dictionaries instead of tuples.
    )
    print("Connected to AWS RDS Alhamdulilah!")
except Exception as e:
    print(f"Error connecting to PostgreSQL: {e}")
    exit()

###############* Helper functions *###############
def get_current_state():
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM quraan LIMIT 1;") 
        result = cursor.fetchone()
        if not result:
            initial_state = { # can be futher refactored...
                "current_surah": 1,
                "current_verse": 1,
                "last_updated": "1970-01-01",
                "last_updated_syd": "1970-01-01",
                "last_verse": None,
                "last_verse_fr": None,
            }
            cursor.execute(
                """
                INSERT INTO quraan (current_surah, current_verse, last_updated, last_updated_syd, last_verse, last_verse_fr)
                VALUES (%s, %s, %s, %s, %s, %s);
                """,
                (
                    initial_state["current_surah"],
                    initial_state["current_verse"],
                    initial_state["last_updated"],
                    initial_state["last_updated_syd"],
                    json.dumps(initial_state["last_verse"]),
                    json.dumps(initial_state["last_verse_fr"]),
                ),
            )
            conn.commit()
            return initial_state
        return result


def update_current_state(surah, verse, verse_data, verse_data_fr):
    """Update the current state in PostgreSQL."""
    local_tz = pytz.timezone("US/Eastern")
    local_syd_tz = pytz.timezone("Australia/Sydney")

    last_updated = datetime.now(local_tz).strftime("%Y-%m-%d")
    last_updated_syd = datetime.now(local_syd_tz).strftime("%Y-%m-%d")

    with conn.cursor() as cursor:
        cursor.execute(
            """
            UPDATE quraan
            SET current_surah = %s,
                current_verse = %s,
                last_updated = %s,
                last_updated_syd = %s,
                last_verse = %s,
                last_verse_fr = %s;
            """,
            (
                surah,
                verse,
                last_updated,
                last_updated_syd,
                json.dumps(verse_data),
                json.dumps(verse_data_fr),
            ),
        )
        conn.commit()

def fetch_verse(surah, verse, translation_key):
    """Fetch verse data from the QuranEnc API."""
    url = f"https://quranenc.com/api/v1/translation/aya/{translation_key}/{surah}/{verse}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None

@app.route("/daily-verse", methods=["GET"])
def daily_verse():
    current_state = get_current_state()
    current_surah = current_state["current_surah"]
    current_verse = current_state["current_verse"]
    last_updated = current_state["last_updated"]
    last_updated_syd = current_state["last_updated_syd"]
    last_verse = current_state["last_verse"]
    last_verse_fr = current_state["last_verse_fr"]

    # Sydney timezone logic for sending daily reminders
    local_syd_tz = pytz.timezone("Australia/Sydney")
    today_syd = datetime.now(local_syd_tz).strftime("%Y-%m-%d")
    if today_syd != last_updated_syd:
        # TODO - Placeholder for sending daily verse emails until we factor out shared modules.
        # send_daily_verse()
        update_current_state(current_surah, current_verse, last_verse, last_verse_fr)

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
    '''
    url = f"https://quranenc.com/api/v1/translation/aya/french_montada/2/282"
    response = requests.get(url)
    return response.json()
    '''
    return response

if __name__ == "__main__":
    app.run(debug=True)
