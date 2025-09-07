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
<<<<<<< HEAD
    { name: "Ankit Singh", role: "Fullstack Dev", image: "https://thvnext.bing.com/th/id/OIP.v2btc1HcWm37V1Mt8vkaTgHaHa?w=192&h=192&c=7&r=0&o=7&cb=ucfimgc2&pid=1.7&rm=3"},
=======
    { name: "Ankit Kumar", role: "Fullstack Dev", image: "data:image/webp;base64,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" },
>>>>>>> 49f43b8a910e0fb3678827a8ac9ff27565aa56f5
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
