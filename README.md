# 🌟 MyDailyHadith

This project embodies the noble Hadith:

> **"May Allah ﷻ beautify a man who hears a saying of mine, so he understands it, remembers it, and conveys it."**

MyDailyHadith automates the sharing of a daily Hadeeth in Arabic and English. The app leverages Flask for the backend and React for the frontend, serving as a platform to disseminate authentic Islamic knowledge effectively. This project is powered by the [HadeethEnc API](https://hadeethenc.com/en/home) and utilizes the Hadeeth dataset provided by them. **Note**: We will be pulling the most recent dataset everynow and then.

![MyDailyHadith](./mydailyhadith-frontend/public/MDHdemo.gif)

**Check it out at _(kindly wait a minute)_:** [https://my-daily-hadith.vercel.app/](https://my-daily-hadith.vercel.app/)

---

## 🕌 **Purpose of the Project**
This project aims to spread beneficial knowledge through the daily sharing of Hadith, as inspired by the teachings of the Prophet Muhammad ﷺ. By facilitating easy access to Hadith, we hope to encourage reflection and practice.

---

## **Features**
- **Daily Hadeeth**: A new Hadeeth is served daily in both Arabic and English.
- **Metadata and Explanations**: Includes grade, attribution, and an explanation for better understanding.
- **Frontend and Backend Integration**: Powered by a Flask backend and React frontend.
- **Optimized API Usage**: Avoids unnecessary API calls by persisting daily Hadeeth data.

---

## **How to Run the Project**

### **1. Backend Setup**

#### Prerequisites:
- Python 3.7+

#### Steps:
1. Clone the repository and navigate to the `backend` directory:
   ```bash
   git clone <repository-url>
   cd MyDailyHadeeth/backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the Flask server:
   ```bash
   python app.py
   ```
4. The backend will be available at `http://127.0.0.1:5000`.

---

### **2. Frontend Setup**

#### Prerequisites:
- Node.js and npm

#### Steps:
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
4. Access the frontend at `http://localhost:3000`.

---

## **📜 Project Structure**
```
MyDailyHadeeth/
├── backend/
│   ├── data/
│   │   ├── data-persistance.json  # JSON file to persist data
│   │   ├── Hadeeths.xlsx     # Hadeeth dataset as downloaded from HadeethEnc.com 
│   ├── app.py                # Flask backend
│   ├── hadith_ids.py         # Hadeeths IDs exttraction from the dataset
│   ├── data-persistance.json # Persists daily Hadeeth & other data
│   ├── requirements.txt      # Backend dependencies & for deployment
│   ├── Procfile              # For deployment
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Styling for the app
├── README.md                 # Documentation
└── LICENSE                   # Project license
```

---

## **🌍 Deployment**
- **Frontend**: Hosted on [Vercel](https://vercel.com/).
- **Backend**: Hosted on [Render](https://render.com/).

---

## **🛠️ Future Enhancements**
Check [Github Issues](https://github.com/AhmedAlRawi0/MyDailyHadith/issues)

---

## **🔗 License**
This project is licensed under the MIT License. Feel free to use, fork, and contribute.
