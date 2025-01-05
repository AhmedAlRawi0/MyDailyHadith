import React, { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus({ error: true, message: "Please enter a valid email address" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://mydailyhadith.onrender.com/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setStatus({
          error: false,
          message:
            "Successfully subscribed! You should receive an email at 8 AM EST every day iA.",
        });
        setEmail("");
      } else {
        setStatus({
          error: true,
          message: "Subscription failed. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        error: true,
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="subscribe" className="py-16 bg-slate-700">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Stay Connected with Free Daily Reminders
          </h2>
          <p className="text-gray-300 mb-8">
            Subscribe to receive free daily Hadith and Quranic verses directly
            in your inbox. Join thousands of Muslims enriching their daily lives
            with authentic Islamic content.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:outline-none focus:border-emerald-500"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {status && (
              <div
                className={`mt-4 text-sm ${
                  status.error ? "text-red-400" : "text-emerald-400"
                }`}
              >
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
