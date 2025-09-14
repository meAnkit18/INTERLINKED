import React, { useState } from "react";
import { motion } from "framer-motion";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    feedback: "",
    rating: 0,
  });

  const [feedbacksList, setFeedbacksList] = useState([]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handleRating = (ratingValue) => {
    setFormData({
      ...formData,
      rating: ratingValue,
    });
  };

  
  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.feedback || formData.rating === 0) {
      alert("Please fill all fields and provide a rating.");
      return;
    }

    setFeedbacksList([...feedbacksList, formData]);

  
    setFormData({
      name: "",
      email: "",
      location: "",
      feedback: "",
      rating: 0,
    });
  };

  return (
    <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto bg-gradient-to-b from-teal-50 to-cyan-50 min-h-screen">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-teal-800 mb-4"
        >
          आपकी राय • Share Your Feedback
        </motion.h2>
        <p className="text-teal-600 text-lg font-medium">
          आपकी बात हमारे लिए महत्वपूर्ण है • Your voice matters to us
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleFeedbackSubmit}
        className="bg-white shadow-2xl rounded-3xl p-8 md:p-10 space-y-8 border-2 border-teal-100"
      >
        {/* Name Field */}
        <div>
          <label className="block text-teal-700 font-bold text-lg mb-3">
            नाम • Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="अपना नाम लिखें • Enter your name"
            className="w-full p-4 border-2 border-teal-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 text-teal-800 font-medium"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-teal-700 font-bold text-lg mb-3">
            ईमेल • Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="आपका ईमेल • Your email address"
            className="w-full p-4 border-2 border-teal-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 text-teal-800 font-medium"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
  
        {/* Location Field */}
        <div>
          <label className="block text-teal-700 font-bold text-lg mb-3">
            स्थान • Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="शहर, राज्य या क्षेत्र • City, State or Area"
            className="w-full p-4 border-2 border-teal-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 text-teal-800 font-medium"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        {/* Feedback Field */}
        <div>
          <label className="block text-teal-700 font-bold text-lg mb-3">
            आपकी राय • Feedback <span className="text-red-500">*</span>
          </label>
          <textarea
            name="feedback"
            rows="5"
            placeholder="अपनी बात यहाँ लिखें... • Write your feedback here..."
            className="w-full p-4 border-2 border-teal-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-300 focus:border-teal-500 transition-all duration-200 text-teal-800 font-medium resize-none"
            value={formData.feedback}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Rating Field */}
        <div>
          <label className="block text-teal-700 font-bold text-lg mb-4">
            रेटिंग दें • Rate Us <span className="text-red-500">*</span>
          </label>
          <div className="flex space-x-3 justify-center md:justify-start">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.span
                key={star}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
                className={`cursor-pointer text-5xl transition-colors duration-200 ${
                  formData.rating >= star ? "text-yellow-400" : "text-teal-300"
                } hover:text-yellow-500`}
                onClick={() => handleRating(star)}
              >
                ★
              </motion.span>
            ))}
          </div>
          <p className="text-teal-600 text-sm mt-2 text-center md:text-left">
            {formData.rating > 0 ? `आपकी रेटिंग: ${formData.rating}/5` : "कृपया रेटिंग दें"}
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-black text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl w-full sm:w-auto min-w-[200px]"
          >
            भेजें • Submit
          </motion.button>
        </div>
      </motion.form>

      {/* Feedbacks List */}
      {feedbacksList.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-teal-800 mb-8 text-center">
            हाल की प्रतिक्रियाएं • Recent Feedbacks
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {feedbacksList.map((fb, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-teal-200 hover:border-teal-400"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-teal-800 text-lg">{fb.name}</h4>
                    <p className="text-teal-600 text-sm font-medium">{fb.email}</p>
                    {fb.location && <p className="text-teal-500 text-xs">{fb.location}</p>}
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          fb.rating >= star ? "text-yellow-400" : "text-teal-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-teal-700 font-medium leading-relaxed">{fb.feedback}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default FeedbackForm;