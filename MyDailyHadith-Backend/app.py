from flask import Flask, jsonify
import json
import requests
from flask_cors import CORS
from hadith_ids import get_ids_list
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Path to the JSON file storing the current state
INDEX_FILE = 'data/data-persistance.json'

# Hadeeth IDs list
hadeeth_ids = get_ids_list()

# Function to get the current state
def get_current_state():
    try:
        with open(INDEX_FILE, 'r') as file:
            data = json.load(file)
            return data.get("current_index", 0), data.get("last_updated", "1970-01-01"), data.get("last_hadeeth", None)
    except FileNotFoundError:
        return 0, "1970-01-01", None

# Function to update the current state
def update_current_state(index, hadeeth_data):
    with open(INDEX_FILE, 'w') as file:
        json.dump({
            "current_index": index,
            "last_updated": datetime.now().strftime("%Y-%m-%d"),
            "last_hadeeth": hadeeth_data
        }, file)

# Function to fetch hadeeth data from the API
def fetch_hadeeth(hadeeth_id):
    url_en = f"https://hadeethenc.com/api/v1/hadeeths/one/?id={hadeeth_id}&language=en"

    response_en = requests.get(url_en)

    if response_en.status_code == 200:
        return response_en.json()
    else:
        return None

# Endpoint to get the daily hadeeth
@app.route('/daily-hadeeth', methods=['GET'])
def daily_hadeeth():
    current_index, last_updated, last_hadeeth = get_current_state()

    # Check if today's date matches the last_updated date
    today = datetime.now().strftime("%Y-%m-%d")
    if today != last_updated:
        # Fetch a new Hadeeth
        hadeeth_id = hadeeth_ids[current_index]
        hadeeth_data = fetch_hadeeth(hadeeth_id)
        if not hadeeth_data:
            return jsonify({"error": "Failed to fetch hadeeth data."}), 500

        # Update the index and persist the new Hadeeth
        next_index = (current_index + 1) % len(hadeeth_ids)
        update_current_state(next_index, hadeeth_data)

        return jsonify(hadeeth_data)
    else:
        # Return the persisted Hadeeth
        return jsonify(last_hadeeth)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
