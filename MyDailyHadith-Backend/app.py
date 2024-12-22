from flask import Flask, jsonify, request, make_response
import os
import requests
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from hadith_ids import get_ids_list
from pymongo.server_api import ServerApi
from pymongo.errors import DuplicateKeyError

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Load environment variables
load_dotenv()

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = os.getenv("MONGO_DB_NAME")

client = MongoClient(MONGO_URI, 
                     tls=True,
                     tlsAllowInvalidCertificates=True,
                     server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client[DB_NAME]
persistence_collection = db['persistence']
subscribers_collection = db['subscribers']

# Email configuration
SMTP_SERVER, SMTP_PORT = "smtp.gmail.com", 587
EMAIL_ADDRESS, EMAIL_PASSWORD = os.getenv('EMAIL_ADDRESS'), os.getenv('EMAIL_PASSWORD')

# Hadeeth IDs list
hadeeth_ids = get_ids_list()

# Function to get the current state from MongoDB
def get_current_state():
    doc = persistence_collection.find_one()
    if not doc:
        # Initialize persistence document if it doesn't exist
        initial_state = {
            "current_index": 0,
            "last_updated": "1970-01-01",
            "last_hadeeth": None
        }
        persistence_collection.insert_one(initial_state)
        return initial_state["current_index"], initial_state["last_updated"], initial_state["last_hadeeth"]
    return doc.get("current_index", 0), doc.get("last_updated", "1970-01-01"), doc.get("last_hadeeth", None)

# Function to update the current state in MongoDB
def update_current_state(index, hadeeth_data):
    persistence_collection.update_one(
        {},
        {"$set": {
            "current_index": index,
            "last_updated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
            "last_hadeeth": hadeeth_data
        }},
        upsert=True  # Create the document if it doesn't exist
    )

# Function to fetch hadeeth data from the API
def fetch_hadeeth(hadeeth_id):
    url_en = f"https://hadeethenc.com/api/v1/hadeeths/one/?id={hadeeth_id}&language=en"
    response_en = requests.get(url_en)
    if response_en.status_code == 200:
        return response_en.json()
    return None

# Function to retrieve subscribers from MongoDB
def get_subscribers():
    return [doc['email'] for doc in subscribers_collection.find({})]

# Function to add a subscriber to MongoDB
def add_subscriber(email):
    try:
        subscribers_collection.insert_one({"email": email})
        return {"message": "Successfully subscribed!"}
    except DuplicateKeyError:
        return {"message": "Email already subscribed!"}
    except Exception as e:
        return {"message": f"An error occurred: {e}"}


# Function to send email
def send_email(to_email, subject, body):
    try:
        message = MIMEMultipart()
        message["From"] = EMAIL_ADDRESS
        message["To"] = to_email
        message["Subject"] = subject
        message.attach(MIMEText(body, "html"))
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, to_email, message.as_string())
        print(f"Email sent to {to_email}")
    except Exception as e:
        print(f"Failed to send email to {to_email}: {e}")

# Function to send daily Hadith to all subscribers
def send_daily_hadith():
    subscribers = get_subscribers()
    if not subscribers:
        print("No subscribers to send the email to.")
        return

    current_index, last_updated, hadeeth = get_current_state()
    email_body = f"""
    <h1>Daily Hadith</h1>
    <h2>In Arabic:</h2>
    <p>{hadeeth.get('hadeeth_ar')}</p>
    <h2>In English:</h2>
    <p>{hadeeth.get('hadeeth')}</p>
    <h3>Explanation:</h3>
    <p>{hadeeth.get('explanation')}</p>
    """
    for email in subscribers:
        send_email(email, "Daily Hadith", email_body)

# Endpoint to subscribe to email notifications
@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'message': 'Invalid email.'}), 400
    response = add_subscriber(email)
    return jsonify(response), 200 if "Successfully" in response["message"] else 400

# Endpoint to get the daily hadeeth
@app.route('/daily-hadeeth', methods=['GET'])
def daily_hadeeth():
    current_index, last_updated, last_hadeeth = get_current_state()
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    if today != last_updated:
        hadeeth_id = hadeeth_ids[current_index]
        hadeeth_data = fetch_hadeeth(hadeeth_id)
        if not hadeeth_data:
            return jsonify({"error": "Failed to fetch hadeeth data."}), 500

        next_index = (current_index + 1) % len(hadeeth_ids)
        update_current_state(next_index, hadeeth_data)
        send_daily_hadith()  # Send daily email
        response = make_response(jsonify(hadeeth_data))
        response.headers['Cache-Control'] = 'no-store'
        return response
    else:
        response = make_response(jsonify(last_hadeeth))
        response.headers['Cache-Control'] = 'no-store'
        return response

if __name__ == '__main__':
    app.run(debug=True)
