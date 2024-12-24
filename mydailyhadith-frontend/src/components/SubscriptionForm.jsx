import React from "react";
import "../styling/SubscriptionForm.css";

const SubscriptionForm = ({
  language,
  email,
  setEmail,
  subscriptionMessage,
  handleSubscription,
}) => (
  <section className="subscription">
    {language === "English" ? (
      <>
        Subscribe to Receive Daily Hadith via Email <i>(Check Spam)</i>
      </>
    ) : (
      <>
        Abonnez-vous pour recevoir le hadith quotidien par e-mail{" "}
        <i>(Vérifiez les spams)</i>
      </>
    )}
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={
          language === "English" ? "Enter your email" : "Entrez votre e-mail"
        }
        className="email-input"
      />
      <button onClick={handleSubscription} className="subscribe-button">
        {language === "English" ? "Subscribe" : "S'abonner"}
      </button>
    </div>
    {subscriptionMessage && (
      <p className="subscription-message">{subscriptionMessage}</p>
    )}
  </section>
);

export default SubscriptionForm;
