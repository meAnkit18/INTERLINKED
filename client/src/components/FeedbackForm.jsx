import React, { useState } from "react";
import { motion } from "framer-motion";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
      location: "",
      feedback: "",
      rating: 0,
    });
  };

  return (
    <section className="py-16 px-6 md:px-12 max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-8">
        Share Your Feedback
      </h2>

  
      <form
        onSubmit={handleFeedbackSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
      >
  
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

      
  
        <div>
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            placeholder="City, State or Area"
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

  
        <div>
          <label className="block text-gray-700 font-medium mb-2">Feedback</label>
          <textarea
            name="feedback"
            placeholder="Write your feedback here..."
            className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={formData.feedback}
            onChange={handleChange}
          ></textarea>
        </div>

  
        <div>
          <label className="block text-gray-700 font-medium mb-3">Rate Us</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.span
                key={star}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`cursor-pointer text-3xl ${
                  formData.rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => handleRating(star)}
              >
                ★
              </motion.span>
            ))}
          </div>
        </div>

  
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition w-full sm:w-auto"
          >
            Submit
          </button>
        </div>
      </form>

  
      {feedbacksList.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Feedbacks:</h3>
          <ul className="space-y-4">
            {feedbacksList.map((fb, idx) => (
              <li
                key={idx}
                className="p-4 bg-sky-50 rounded-lg shadow-md border border-sky-100"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sky-800">{fb.name}</h4>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-lg ${
                          fb.rating >= star ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{fb.email}</p>
                <p className="mt-2 text-gray-800">{fb.feedback}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default FeedbackForm;
