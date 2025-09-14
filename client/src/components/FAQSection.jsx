import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { q: "What is Jan Samadhan?", a: "A civic platform to report issues and engage with the community." },
    { q: "How to report an issue?", a: "Use the 'Report Issue' button and fill in the details." },
    { q: "Is my data secure?", a: "Yes, we use AI verification and blockchain security." },
    { q: "Can I track my report?", a: "Yes, real-time tracking is available." },
    { q: "Is there a mobile app?", a: "Currently web-only, mobile app coming soon." },
    { q: "How is community engagement handled?", a: "Users can comment, vote, and support issues." },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto px-6 md:px-12 py-24">
      <h2 className="text-4xl font-bold text-center mb-12 text-sky-700">
        FAQs
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
           
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left text-lg font-semibold text-sky-700 focus:outline-none"
            >
              {faq.q}
              <span className="text-sky-500 text-xl">
                {activeIndex === index ? "−" : "+"}
              </span>
            </button>

           
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-5 text-gray-700"
                >
                  {faq.a}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
