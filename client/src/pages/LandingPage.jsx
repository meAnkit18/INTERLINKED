import React from "react";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

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

  // ✅ Anime avatars for team
  const teamMembers = [
    { name: "Kaustuv", role: "Team Leader", image: "https://thvnext.bing.com/th/id/OIP.6MT8enO2sKdofIZiM9AS0AHaHa?w=182&h=182&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3" },
    { name: "Aakash Kumar", role: "UI/UX Designer", image: "https://thvnext.bing.com/th/id/OIP.xkVR0PWQY69tZCzh1vDnagHaHa?w=179&h=150&c=6&o=7&cb=ucfimgc2&pid=1.7&rm=3" },
    { name: "Ankit Singh", role: "Fullstack Dev", image: "https://thvnext.bing.com/th/id/OIP.v2btc1HcWm37V1Mt8vkaTgHaHa?w=192&h=192&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3"},
    { name: "Lakshya Jaishwal", role: "Android Developer", image: "https://thvnext.bing.com/th/id/OIP.pOEGDBb2WjbtWDPRH_9y9QHaEK?w=268&h=180&c=7&r=0&o=5&cb=ucfimgc2&pid=1.7" },
    { name: "Ayush Gupta", role: "AI Engineer", image: "https://thvnext.bing.com/th/id/OIP.UMCoxORsxHCrqEaj0vzF2gAAAA?w=207&h=208&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3" },
    { name: "Khushi Aggrawal", role: "Blockchain Dev", image: "https://thvnext.bing.com/th/id/OIP.n3G1OPZb30t96q65BWemygHaLH?w=131&h=195&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3"},];

  // ✅ Indian profile pics (gender-wise)
  const feedbacks = [
    { name: "Rohit Sharma", feedback: "Excellent platform!", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Priya Verma", feedback: "AI verification is reliable.", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Anil Kumar", feedback: "Community engagement is amazing!", image: "https://randomuser.me/api/portraits/men/28.jpg" },
    { name: "Neha Singh", feedback: "Easy to use and very responsive.", image: "https://randomuser.me/api/portraits/women/65.jpg" },
    { name: "Vikas Yadav", feedback: "Real-time updates are impressive.", image: "https://randomuser.me/api/portraits/men/41.jpg" },
    { name: "Simran Kaur", feedback: "Helps resolve issues quickly.", image: "https://randomuser.me/api/portraits/women/50.jpg" },
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
            <img
              src="https://thumbs.dreamstime.com/b/illustration-urban-commuters-traveling-city-various-ways-urban-commuting-illustration-123447333.jpg"
              alt="Hero"
              className="w-full max-w-md md:max-w-lg object-contain rounded-3xl shadow-2xl"
            />
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
            <motion.div
              key={i}
              className={`p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${f.bg}`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
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
            <motion.div
              key={i}
              className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
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
            <motion.div
              key={i}
              className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
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
            <motion.div
              key={i}
              className="p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
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
            <motion.div
              key={i}
              className="p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-sky-700 mb-2">{f.q}</h3>
              <p className="text-gray-700">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
