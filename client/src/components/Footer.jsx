import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-sky-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Jan Samadhan</h3>
          <p>Empowering citizens to report civic issues efficiently.</p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-sky-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-sky-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-sky-400 transition"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-sky-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-sky-400 transition">About</Link></li>
            <li><Link to="/report" className="hover:text-sky-400 transition">Report Issue</Link></li>
            <li><Link to="/contact" className="hover:text-sky-400 transition">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-sky-400 transition">FAQs</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Contact Us</h4>
          <p>123 Civic Street, Sector 10, New Delhi, India</p>
          <p>Email: support@jansamadhan.in</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
          <p>Subscribe for latest updates and news.</p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <button className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        © 2025 Jan Samadhan. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
