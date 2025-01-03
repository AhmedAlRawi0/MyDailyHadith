from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
from datetime import datetime
from hadith_ids import get_ids_list
import pytz
from models.database import add_subscriber, remove_subscriber, get_current_hadith_state, update_current_hadith_state
from models.hadeeth import fetch_hadeeth, send_daily_reminder

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Hadeeth IDs list
hadeeth_ids = get_ids_list()

# Endpoint to subscribe to email notifications
@app.route('/subscribe', methods=['POST'])
def subscribe():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'message': 'Invalid email.'}), 400
    
    # Add the email from the database
    response = add_subscriber(email)
    return jsonify(response), 200 if "Successfully" in response["message"] else 400

# Endpoint to unsubscribe from email notifications
@app.route('/unsubscribe', methods=['GET'])
def unsubscribe():
    email = request.args.get('email')
    if not email:
        return jsonify({'message': 'Invalid email.'}), 400
    
    # Remove the email from the database
    response = remove_subscriber(email)
    return jsonify(response), 200 if "Successfully" in response["message"] else 400

# Endpoint to send emails
@app.route('/send-email', methods=['GET'])
def sendEmail():
    current_index, last_updated, last_updated_syd, last_hadeeth, last_hadeeth_fr = get_current_hadith_state()

    local_syd_tz = pytz.timezone('Australia/Sydney')
    today_syd = datetime.now(local_syd_tz).strftime("%Y-%m-%d")

    if today_syd != last_updated_syd: # API call at 8am EST to send daily hadith
       send_daily_reminder()
       update_current_hadith_state(current_index, last_hadeeth, last_hadeeth_fr)
       return jsonify({"message": "Email sent to subscribers"}), 200
    else:
        return jsonify({"message": "Email already sent today"}), 400

# Endpoint to get the daily hadeeth
@app.route('/daily-hadeeth', methods=['GET'])
def daily_hadeeth():
    current_index, last_updated, last_updated_syd, last_hadeeth, last_hadeeth_fr = get_current_hadith_state()
        
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
        update_current_hadith_state(next_index, hadeeth_data, hadeeth_data_fr)

        # Since we are preserving data in the localStorage in the frontend, we need to send the same data from the previous session based on the language selected.
        response = make_response(jsonify(hadeeth_data_fr if language == 'French' else hadeeth_data)) 
    else:
        response = make_response(jsonify(last_hadeeth_fr if language == 'French' else last_hadeeth))
    
    response.headers['Cache-Control'] = 'no-store'
    return response

if __name__ == '__main__':
    # send_daily_hadith() # ! Testing
    app.run(debug=True)
