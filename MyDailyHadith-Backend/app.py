from flask import Flask, jsonify, request, make_response
import os
import json
import requests
from flask_cors import CORS
from hadith_ids import get_ids_list
from datetime import datetime, timezone
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import schedule
import time
from dotenv import load_dotenv

app = Flask(__name__)
# Enable CORS for all routes and methods
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Paths to JSON files
INDEX_FILE = 'data/data-persistance.json'
EMAILS_FILE = 'data/emails.json'  # File to store subscribed emails

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

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
            "last_updated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
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

# Function to load subscribed emails
def load_emails():
    try:
        with open(EMAILS_FILE, 'r') as file:
            return json.load(file).get("emails", [])
    except FileNotFoundError:
        return []

# Function to save subscribed emails
def save_emails(emails):
    with open(EMAILS_FILE, 'w') as file:
        json.dump({"emails": emails}, file)

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

# Function to send daily Hadith to all subscribed emails
def send_daily_hadith():
    current_index, last_updated, hadeeth = get_current_state()

    # Prepare the email body
    email_body = f"""
    <h1>Daily Hadith</h1>
    <h2>In Arabic:</h2>
    <p>{hadeeth.get('hadeeth_ar')}</p>
    <h2>In English:</h2>
    <p>{hadeeth.get('hadeeth')}</p>
    <h3>Explanation:</h3>
    <p>{hadeeth.get('explanation')}</p>
    """

    # Send email to all subscribed users
    emails = load_emails()
    for email in emails:
        send_email(email, "Daily Hadith", email_body)

# Endpoint to subscribe to email notifications
@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.json
    email = data.get('email')
    if not email:
        return jsonify({"error": "Email is required."}), 400

    emails = load_emails()
    if email in emails:
        return jsonify({"message": "You are already subscribed."}), 200

    emails.append(email)
    save_emails(emails)
    return jsonify({"message": "Subscription successful."}), 201

# Endpoint to get the daily hadeeth
@app.route('/daily-hadeeth', methods=['GET'])
def daily_hadeeth():
    current_index, last_updated, last_hadeeth = get_current_state()

    # Check if today's date matches the last_updated date
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    if today != last_updated:
        # Fetch a new Hadeeth
        hadeeth_id = hadeeth_ids[current_index]
        hadeeth_data = fetch_hadeeth(hadeeth_id)
        if not hadeeth_data:
            return jsonify({"error": "Failed to fetch hadeeth data."}), 500

        # Update the index and persist the new Hadeeth
        next_index = (current_index + 1) % len(hadeeth_ids)
        update_current_state(next_index, hadeeth_data)
        send_daily_hadith() # send the email everyday as soon as the hadith is updated

        response = make_response(jsonify(hadeeth_data))
        response.headers['Cache-Control'] = 'no-store'
        return response
    else:
        response = make_response(jsonify(last_hadeeth))
        response.headers['Cache-Control'] = 'no-store'
        return response

if __name__ == '__main__':
    # Start the Flask app and scheduler
    while True:
        app.run(debug=True)