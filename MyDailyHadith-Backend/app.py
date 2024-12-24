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
import pytz

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
            "last_updated_syd": "1970-01-01",
            "last_hadeeth": None,
            "last_hadeeth_fr": None
        }
        persistence_collection.insert_one(initial_state)
        return initial_state["current_index"], initial_state["last_updated"], initial_state["last_updated_syd"], initial_state["last_hadeeth"], initial_state["last_hadeeth_fr"]
    return doc.get("current_index", 0), doc.get("last_updated", "1970-01-01"), doc.get("last_updated_syd", "1970-01-01"), doc.get("last_hadeeth", None), doc.get("last_hadeeth_fr", None)

# Function to update the current state in MongoDB
def update_current_state(index, hadeeth_data, hadeeth_data_fr):
    local_tz = pytz.timezone('US/Eastern')
    local_syd_tz = pytz.timezone('Australia/Sydney')
    persistence_collection.update_one(
        {},
        {"$set": {
            "current_index": index,
            "last_updated": datetime.now(local_tz).strftime("%Y-%m-%d"),
            "last_updated_syd": datetime.now(local_syd_tz).strftime("%Y-%m-%d"),
            "last_hadeeth": hadeeth_data,
            "last_hadeeth_fr": hadeeth_data_fr
        }},
        upsert=True  # Create the document if it doesn't exist
    )

# Function to fetch hadeeth data from the API
def fetch_hadeeth(hadeeth_id):
    url_en = f"https://hadeethenc.com/api/v1/hadeeths/one/?id={hadeeth_id}&language=en"
    url_fr = f"https://hadeethenc.com/api/v1/hadeeths/one/?id={hadeeth_id}&language=fr" #! DO not orget to comapre datasets...
    response_en = requests.get(url_en)
    response_fr = requests.get(url_fr)
    if response_en.status_code == 200 and response_fr.status_code == 200:
        return response_en.json(), response_fr.json()
    elif response_en.status_code == 200:
        return response_en.json()
    elif response_fr.status_code == 200:
        return response_fr.json()
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

# Function to remove a subscriber from MongoDB
def remove_subscriber(email):
    try:
        result = subscribers_collection.delete_one({"email": email})
        if result.deleted_count > 0:
            return {"message": "Successfully unsubscribed!"}
        else:
            return {"message": "Email not found in subscription list."}
    except Exception as e:
        return {"message": f"An error occurred: {e}"}

# Function to send email
def send_email(to_email, subject, body):
    try:
        # Specify the sender's name and email
        sender_name = "My Daily Hadith"
        sender_email = EMAIL_ADDRESS
        
        message = MIMEMultipart()
        message["From"] = f"{sender_name} <{sender_email}>"
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
    subscribers = get_subscribers()  # Get all subscriber emails from the database
    if not subscribers:
        print("No subscribers to send the email to.")
        return

    # Get the current state
    current_index, last_updated, last_updated_syd, hadeeth, hadeeth_fr = get_current_state()

    # Get today's date in a readable format
    local_tz = pytz.timezone('US/Eastern')
    today_date = datetime.now(local_tz).strftime("%A, %B %d, %Y")

    # Email HTML content template
    for to_email in subscribers:
        #unsubscribe_link = f"http://127.0.0.1:5000/unsubscribe?email={to_email}"
        unsubscribe_link = f"https://mydailyhadith.onrender.com/unsubscribe?email={to_email}"

        email_body = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <style>
                body {{
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    background: linear-gradient(to bottom, #f7f2e9, #eae7dc);
                    color: #333;
                }}
                .container {{
                    max-width: 800px;
                    margin: 30px auto;
                    background-color: #fff;
                    border: 10px solid #d4af37;
                    border-radius: 12px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    padding: 20px;
                }}
                h1 {{
                    font-family: 'Amiri', serif;
                    text-align: center;
                    font-size: 28px;
                    color: #d4af37;
                    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
                    margin-bottom: 10px;
                    border-bottom: 2px solid #d4af37;
                    padding-bottom: 5px;
                }}
                h2 {{
                    font-family: 'Amiri', serif;
                    font-size: 20px;
                    color: #2c3e50;
                    margin-bottom: 10px;
                    text-decoration: underline;
                }}
                p {{
                    font-family: 'Amiri', serif;
                    font-size: 16px;
                    line-height: 1.7;
                    color: #34495e;
                    margin-bottom: 15px;
                }}
                .date {{
                    text-align: center;
                    font-size: 14px;
                    color: #7f8c8d;
                    margin-bottom: 20px;
                    font-style: italic;
                }}
                .arabic {{
                    font-family: 'Amiri', serif;
                    font-size: 18px;
                    text-align: right;
                    direction: rtl;
                    color: #2c3e50;
                    padding: 10px;
                    margin-bottom: 15px;
                }}
                .separator {{
                    width: 100%;
                    height: 2px;
                    background: #d4af37;
                    margin: 15px 0;
                }}
                .footer {{
                    text-align: center;
                    font-size: 12px;
                    color: #7f8c8d;
                    margin-top: 20px;
                }}
                .footer a {{
                    color: #3498db;
                    text-decoration: none;
                }}
                .footer a:hover {{
                    text-decoration: underline;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Daily Hadith</h1>
                <p class="date">{today_date}</p>
                <div class="separator"></div>
                <h2 style="text-align: right; direction: rtl;">الحديث:</h2>
                <p class="arabic">{hadeeth.get('hadeeth_ar')}</p>
                <h2 style="text-align: right; direction: rtl;">الشرح:</h2>
                <p class="arabic">{hadeeth.get('explanation_ar')}</p>
                <div class="separator"></div>
                <h2>The Hadith:</h2>
                <p>{hadeeth.get('hadeeth')}</p>
                <h2>Explanation:</h2>
                <p>{hadeeth.get('explanation')}</p>
                <div class="separator"></div>
                <h2>Le Hadith:</h2>
                <p>{hadeeth_fr.get('hadeeth')}</p>
                <h2>Explication:</h2>
                <p>{hadeeth_fr.get('explanation')}</p>
                <div class="separator"></div>
                <div class="footer">
                    <p>
                        © {datetime.now().year} MyDailyHadith | 
                        <a href="https://my-daily-hadith.vercel.app">Visit Website</a> | 
                        <a href="{unsubscribe_link}">Unsubscribe</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
        """

        send_email(to_email, f"Daily Hadith - {today_date}", email_body)

# Endpoint to subscribe to email notifications
@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'message': 'Invalid email.'}), 400
    response = add_subscriber(email)
    return jsonify(response), 200 if "Successfully" in response["message"] else 400

# Endpoint to unsubscribe from email notifications
@app.route('/unsubscribe', methods=['POST'])
def unsubscribe():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')

    if not email:
        return jsonify({'message': 'Invalid email.'}), 400

    # Remove the email from the database
    result = subscribers_collection.delete_one({'email': email})

    if result.deleted_count > 0:
        return jsonify({'message': 'Successfully unsubscribed.'}), 200
    else:
        return jsonify({'message': 'Email not found or already unsubscribed.'}), 400

# Endpoint to get the daily hadeeth
@app.route('/daily-hadeeth', methods=['GET'])
def daily_hadeeth():
    current_index, last_updated, last_updated_syd, last_hadeeth, last_hadeeth_fr = get_current_state()
    local_syd_tz = pytz.timezone('Australia/Sydney')
    today_syd = datetime.now(local_syd_tz).strftime("%Y-%m-%d")
    if today_syd != last_updated_syd:
        send_daily_hadith()
        update_current_state(current_index, last_hadeeth, last_hadeeth_fr)

    local_tz = pytz.timezone('US/Eastern')
    today = datetime.now(local_tz).strftime("%Y-%m-%d")
    language = request.args.get('Language', 'English')
    if today != last_updated: # First API call of the day
        hadeeth_id = hadeeth_ids[current_index]
        hadeeth_data, hadeeth_data_fr = fetch_hadeeth(hadeeth_id) 
        if not hadeeth_data and not hadeeth_data_fr:
            return jsonify({"error": "Failed to fetch English & French hadeeth data."}), 500
        elif not hadeeth_data_fr:
            hadeeth_data_fr = hadeeth_data

        next_index = (current_index + 1) % len(hadeeth_ids)
        update_current_state(next_index, hadeeth_data, hadeeth_data_fr)
        send_daily_hadith()  # Send daily email
        response = make_response(jsonify(hadeeth_data))
    else:
        response = make_response(jsonify(last_hadeeth_fr if language == 'French' else last_hadeeth))
    
    
    

    response.headers['Cache-Control'] = 'no-store'
    return response

if __name__ == '__main__':
    #send_daily_hadith() #! Testing
    app.run(debug=True)
