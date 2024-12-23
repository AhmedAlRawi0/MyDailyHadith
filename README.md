# 🌟 MyDailyHadith

This project embodies the noble Hadith:

> **"May Allah brighten the person who hears something from us and conveys it as he heard it, for perhaps the one to whom it is conveyed is more mindful than the hearer."**
<sub>[Authentic Hadith Narrated by At-Termedhy & Others - Sunan At-Termedhy - 2657]</sub>

MyDailyHadith automates the sharing of a daily Hadeeth in Arabic, English and French. The app leverages Flask for the backend and React for the frontend, serving as a platform to disseminate authentic Islamic knowledge effectively. This project is powered by the [HadeethEnc API](https://hadeethenc.com/en/home) and utilizes the Hadeeth dataset provided by them. **Note**: We will be pulling the most recent dataset everynow and then.

![MyDailyHadith](./mydailyhadith-frontend/public/MDHdemo.gif)

**Check it out at:** [https://my-daily-hadith.vercel.app/](https://my-daily-hadith.vercel.app/)

---

## 🕌 **Purpose of the Project**
This project aims to spread beneficial knowledge through the daily sharing of Hadith, as inspired by the teachings of the Prophet Muhammad ﷺ. By facilitating easy access to Hadith, we hope to encourage reflection and practice.

---

## **Features**
- **Daily Hadeeth**: A new Hadeeth is served daily in Arabic, English, and French.
- **Metadata and Explanations**: Includes grade, attribution, and an explanation for better understanding.
- **Frontend and Backend Integration**: Powered by a Flask backend and React frontend.
- **Optimized API Usage**: Avoids unnecessary API calls by persisting daily Hadeeth data.
- **Email Subscription**: Users can subscribe to receive the daily Hadeeth in their inbox at a specified time.
- **Responsive Design**: Optimized for both desktop and mobile experiences.
- **Display Mode**: A scrolling effect for seamless viewing on public screens or digital displays, making it ideal for masjids or Islamic centers.
- **Secure Data Management**: Hadeeth data is securely stored and managed using MongoDB.

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

## **🌍 Deployment**
- **Frontend**: Hosted on [Vercel](https://vercel.com/).
- **Backend**: Hosted on [Render](https://render.com/).

---

## **🛠️ Future Enhancements**
- Stay tuned for **MyDailyVerse**! 🌟 
- Also, Check our [Github Issues](https://github.com/AhmedAlRawi0/MyDailyHadith/issues)

---

## **🔗 License**
This project is licensed under the MIT License. Feel free to use, fork, and contribute.
