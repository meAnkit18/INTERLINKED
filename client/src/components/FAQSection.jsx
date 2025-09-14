import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: "जन समाधान क्या है?",
      qEng: "What is Jan Samadhan?",
      a: "यह एक डिजिटल मंच है जहाँ आप अपनी समस्याओं को दर्ज कर सकते हैं और समुदाय से जुड़ सकते हैं। यह नागरिक सेवाओं में सुधार लाने के लिए बनाया गया है।",
      aEng: "A civic platform to report issues and engage with the community for better public services.",

    },
    {
      q: "समस्या कैसे दर्ज करें?",
      qEng: "How to report an issue?",
      a: "'समस्या दर्ज करें' बटन पर क्लिक करें और अपनी समस्या का विवरण भरें। फोटो भी अपलोड कर सकते हैं।",
      aEng: "Click the 'Report Issue' button and fill in the details. You can also upload photos.",

    },
    {
      q: "क्या मेरा डेटा सुरक्षित है?",
      qEng: "Is my data secure?",
      a: "हाँ, हम AI वेरिफिकेशन और ब्लॉकचेन सुरक्षा का उपयोग करते हैं। आपकी व्यक्तिगत जानकारी पूर्णतः सुरक्षित है।",
      aEng: "Yes, we use AI verification and blockchain security for complete data protection.",

    },
    {
      q: "अपनी रिपोर्ट को कैसे ट्रैक करें?",
      qEng: "Can I track my report?",
      a: "हाँ, आप रियल-टाइम में अपनी रिपोर्ट की स्थिति देख सकते हैं। SMS और ईमेल अपडेट भी मिलते हैं।",
      aEng: "Yes, real-time tracking is available with SMS and email updates.",

    },
    {
      q: "क्या मोबाइल ऐप उपलब्ध है?",
      qEng: "Is there a mobile app?",
      a: "फिलहाल केवल वेबसाइट उपलब्ध है। मोबाइल ऐप जल्दी ही लॉन्च होगा।",
      aEng: "Currently web-only, mobile app launching soon.",

    },
    {
      q: "समुदायिक भागीदारी कैसे काम करती है?",
      qEng: "How does community engagement work?",
      a: "उपयोगकर्ता टिप्पणी कर सकते हैं, वोट दे सकते हैं, और मुद्दों का समर्थन कर सकते हैं। यह सामुदायिक सहयोग बढ़ाता है।",
      aEng: "Users can comment, vote, and support issues to build community collaboration.",

    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50 py-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
          >

          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-teal-800 mb-6">
            अक्सर पूछे जाने वाले प्रश्न
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold text-teal-600 mb-4">
            Frequently Asked Questions
          </h3>
          <div className="w-24 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="text-teal-700 text-lg font-medium mt-6 max-w-2xl mx-auto">
            आपके सभी सवालों के जवाब यहाँ मिल जाएंगे • Find answers to all your questions here
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 overflow-hidden ${activeIndex === index
                  ? 'border-teal-400 shadow-teal-200 scale-[1.02]'
                  : 'border-teal-100 hover:border-teal-300'
                }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <motion.span
                    className="text-3xl md:text-4xl flex-shrink-0"
                    animate={{ rotate: activeIndex === index ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.icon}
                  </motion.span>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-black text-teal-800 group-hover:text-teal-900 transition-colors">
                      {faq.q}
                    </h3>
                    <p className="text-sm md:text-base font-semibold text-teal-600 mt-1 opacity-80">
                      {faq.qEng}
                    </p>
                  </div>
                </div>

                <motion.div
                  animate={{
                    rotate: activeIndex === index ? 45 : 0,
                    scale: activeIndex === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-xl md:text-2xl flex-shrink-0 ml-4 ${activeIndex === index
                      ? 'bg-teal-500 text-white shadow-lg'
                      : 'bg-teal-100 text-teal-600 group-hover:bg-teal-200'
                    }`}
                >
                  +
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0, y: -20 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut"
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border-l-4 border-teal-400">
                        <div className="space-y-4">
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-teal-800 font-bold text-base md:text-lg leading-relaxed"
                          >
                            {faq.a}
                          </motion.p>
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-teal-600 font-medium text-sm md:text-base leading-relaxed border-t border-teal-200 pt-4"
                          >
                            {faq.aEng}
                          </motion.p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;