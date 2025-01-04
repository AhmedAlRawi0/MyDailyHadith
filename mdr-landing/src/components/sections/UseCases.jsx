import React from "react";

const useCases = [
  {
    title: "Muslim Student Associations (MSAs)",
    description:
      "Perfect for displaying Islamic content during events and in prayer rooms",
  },
  {
    title: "Mosques & Islamic Centers",
    description:
      "Enhance your digital displays with authentic, regularly updated content",
  },
  {
    title: "Individuals & Businesses",
    description:
      "Access daily reminders and add a spiritual touch to any environment with beautiful verses and insights",
  },
];

const UseCases = () => (
  <section id="uses" className="py-20 bg-slate-800">
    <div className="container mx-auto px-4">
      <h2
        className="text-2xl md:text-4xl font-bold text-center text-white mb-16"
        data-aos="fade-up"
      >
        Who Can Use MyDailyReminder?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <h3 className="text-xl font-semibold text-emerald-400 mb-4">
              {useCase.title}
            </h3>
            <p className="text-gray-300">{useCase.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default UseCases;
