from flask import Flask, jsonify
import json
import requests
from flask_cors import CORS
from hadith_ids import get_ids_list

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Path to the JSON file storing the current index
INDEX_FILE = 'data/current_index.json'

# Hadeeth IDs list
hadeeth_ids = get_ids_list()

# Function to get the current index
def get_current_index():
    try:
        with open(INDEX_FILE, 'r') as file:
            data = json.load(file)
            return data.get("current_index", 0)
    except FileNotFoundError:
        return 0

# Function to update the current index
def update_current_index(index):
    with open(INDEX_FILE, 'w') as file:
        json.dump({"current_index": index}, file)

# Function to fetch hadeeth data from the API
def fetch_hadeeth(hadeeth_id):
    url_en = f"https://hadeethenc.com/api/v1/hadeeths/one/?id={hadeeth_id}&language=en"

    response_en = requests.get(url_en)

    if response_en.status_code == 200:
        return response_en.json()
    else:
        return None

# Endpoint to get the daily hadeeth, TBD: every time the api is called, another hadeeth is fetched. What we want to do is to fetch a hadeeth for a day only. we can store a timestamp in the json file and compare it with the current date.
#  If the date is different, we fetch a new hadeeth. If the date is the same, we return the same hadeeth by skipping lines 52, 53
@app.route('/daily-hadeeth', methods=['GET'])
def daily_hadeeth():
    current_index = get_current_index()
    hadeeth_id = hadeeth_ids[current_index]

    # Fetch the Hadeeth
    hadeeth_data = fetch_hadeeth(hadeeth_id)
    if not hadeeth_data:
        return jsonify({"error": "Failed to fetch hadeeth data."}), 500

    # Update the index for the next day, the modulo operator (%) is used to cycle back to the beginning of the list
    next_index = (current_index + 1) % len(hadeeth_ids)
    update_current_index(next_index)

    return jsonify(hadeeth_data)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
