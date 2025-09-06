import React from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import heroImage from "../assets/hero.png";

// Team images
import team1 from "../assets/team1.png";
import team2 from "../assets/team2.png";
import team3 from "../assets/team3.png";
import team4 from "../assets/team4.png";
import team5 from "../assets/team5.png";
import team6 from "../assets/team6.png";

// Feedback images
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import user4 from "../assets/user4.png";
import user5 from "../assets/user5.png";
import user6 from "../assets/user6.png";

const LandingPage = () => {
  const features = [
    { emoji: "📣", title: "Transparency", desc: "Track civic issues in real-time.", bg: "bg-sky-100" },
    { emoji: "🤖", title: "AI Verification", desc: "Smart AI ensures authenticity.", bg: "bg-sky-100" },
    { emoji: "🔗", title: "Blockchain Security", desc: "Immutable tracking of requests.", bg: "bg-sky-100" },
    { emoji: "🤝", title: "Community Engagement", desc: "Connect to solve issues together.", bg: "bg-sky-100" },
  ];

  const aboutBenefits = [
    { emoji: "🎯", title: "Vision", desc: "Empowering citizens through transparency." },
    { emoji: "💡", title: "Innovation", desc: "Leveraging tech for civic improvements." },
    { emoji: "🌐", title: "Accessibility", desc: "Easy-to-use platform for everyone." },
    { emoji: "⚖️", title: "Accountability", desc: "Every action is traceable." },
    { emoji: "🛠️", title: "Efficiency", desc: "Resolve issues faster with AI & community." },
    { emoji: "💬", title: "Feedback Driven", desc: "Continuous improvement based on feedback." },
  ];

  const teamMembers = [
    { name: "Kaustuv", role: "Team Leader", image: team1 },
    { name: "Aakash Kumar", role: "UI/UX Designer", image: team2 },
    { name: "Ankit Singh", role: "Fullstack Dev", image: team3 },
    { name: "Ayush Gupta", role: "AI Engineer", image: team4 },
    { name: "Lakshya Jaishwal", role: "Android Developer", image: team5 },
    { name: "Khushi Aggrawal", role: "Blockchain Dev", image: team6 },
  ];

  const feedbacks = [
    { name: "Rohit Sharma", feedback: "Excellent platform!", image: user1 },
    { name: "Priya Verma", feedback: "AI verification is reliable.", image: user2 },
    { name: "Anil Kumar", feedback: "Community engagement is amazing!", image: user3 },
    { name: "Neha Singh", feedback: "Easy to use and very responsive.", image: user4 },
    { name: "Vikas Yadav", feedback: "Real-time updates are impressive.", image: user5 },
    { name: "Simran Kaur", feedback: "Helps resolve issues quickly.", image: user6 },
  ];

  const faqs = [
    { q: "What is Jan Samadhan?", a: "A civic platform to report issues and engage with community." },
    { q: "How to report an issue?", a: "Use the 'Report Issue' button and fill the details." },
    { q: "Is my data secure?", a: "Yes, we use AI verification and blockchain security." },
    { q: "Can I track my report?", a: "Yes, real-time tracking is available." },
    { q: "Is there a mobile app?", a: "Currently web-only, mobile app coming soon." },
    { q: "How is community engagement handled?", a: "Users can comment, vote, and support issues." },
  ];

  return (
    <div className="bg-sky-50">
      <NavBar />

      {/* Hero Section */}
      <section className="relative bg-sky-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col-reverse md:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="w-full md:w-1/2">
            <div className="bg-white bg-opacity-90 p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-300">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-sky-700">Jan Samadhan - Empower Your Voice</h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                A civic platform where every citizen's voice is heard. Report issues, connect with the community, and experience transparent governance.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-sky-600 text-white rounded-full font-semibold shadow-md hover:bg-sky-700 hover:shadow-lg transition transform hover:-translate-y-1">Join Now</button>
                <button className="px-6 py-3 bg-white text-sky-600 rounded-full font-semibold shadow-md hover:bg-sky-100 hover:shadow-lg transition transform hover:-translate-y-1 border border-sky-300">Report Issue</button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="w-full md:w-1/2 flex justify-center relative">
            <img src={heroImage} alt="Hero" className="w-full max-w-md md:max-w-lg object-contain rounded-3xl shadow-2xl" />
            <div className="absolute top-0 -right-16 w-48 h-48 bg-sky-200 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute bottom-0 -left-16 w-64 h-64 bg-sky-300 rounded-full opacity-20 animate-pulse"></div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 md:px-12 py-24">
        <h2 className="text-4xl font-bold text-center mb-12 text-sky-700">What We Do</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div key={i} className={`p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${f.bg}`} whileHover={{ scale: 1.05 }} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-4xl mb-4">{f.emoji}</div>
              <h3 className="text-xl font-semibold mb-2 text-sky-700">{f.title}</h3>
              <p className="text-gray-700">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 md:px-12 py-24">
        <h2 className="text-4xl font-bold text-center mb-12 text-sky-700">About Jan Samadhan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {aboutBenefits.map((b, i) => (
            <motion.div key={i} className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="text-5xl mb-4">{b.emoji}</div>
              <h3 className="text-xl font-semibold mb-2 text-sky-700">{b.title}</h3>
              <p className="text-gray-700">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 md:px-12 py-24">
        <h2 className="text-4xl font-bold text-center mb-12 text-sky-700">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((m, i) => (
            <motion.div key={i} className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white flex flex-col items-center text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <img src={m.image} alt={m.name} className="w-28 h-28 rounded-full mb-4 shadow-md" />
              <h3 className="text-xl font-semibold text-sky-700">{m.name}</h3>
              <p className="text-gray-700">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section className="container mx-auto px-6 md:px-12 py-24">
        <h2 className="text-4xl font-bold text-center mb-12 text-sky-700">What Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {feedbacks.map((f, i) => (
            <motion.div key={i} className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white flex flex-col items-center text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <img src={f.image} alt={f.name} className="w-20 h-20 rounded-full mb-4 shadow-md" />
              <h3 className="text-xl font-semibold text-sky-700">{f.name}</h3>
              <p className="text-gray-700">{f.feedback}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 md:px-12 py-24">
        <h2 className="text-4xl font-bold text-center mb-12 text-sky-700">FAQs</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((f, i) => (
            <motion.div key={i} className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="font-semibold text-sky-700 mb-2">{f.q}</h3>
              <p className="text-gray-700">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
