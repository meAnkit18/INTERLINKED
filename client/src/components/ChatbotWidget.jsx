import { useEffect, useRef, useState } from "react";
import chatbotsvg from "../assets/chatbotsvg.svg";


const translations = {
  en: {
    welcome: "Hi! 👋 I’m here to help you report civic issues, track complaints, or get answers to common questions. What would you like to do today?",
    report: "Report a Problem",
    track: "Track My Report",
    faqs: "FAQs",
    account: "My Account",
    placeholder: "Type your message...",
  },
  hi: {
    welcome: "नमस्ते! 👋 मैं आपकी मदद करने के लिए यहां हूँ। आप नागरिक मुद्दों की रिपोर्ट कर सकते हैं, शिकायत ट्रैक कर सकते हैं या सामान्य प्रश्नों के उत्तर पा सकते हैं। आज आप क्या करना चाहेंगे?",
    report: "समस्या रिपोर्ट करें",
    track: "मेरी रिपोर्ट देखें",
    faqs: "सामान्य प्रश्न",
    account: "मेरा खाता",
    placeholder: "अपना संदेश टाइप करें...",
  },
  sat: {
    welcome: "ᱥᱟᱱᱛᱟᱲᱤ! 👋 ᱟᱹᱨ ᱟᱹᱱ ᱛᱷᱚᱨᱚ ᱠᱚᱨᱚ ᱯᱤᱫᱟᱭ ᱵᱟᱹᱨᱟᱭ।",
    report: "ᱠᱟᱹᱨᱟ ᱵᱟᱹᱨᱟᱭ",
    track: "ᱟᱹᱱ ᱛᱟᱲᱤ ᱵᱟᱹᱨᱟᱭ",
    faqs: "FAQ",
    account: "ᱠᱷᱟᱹᱭᱟᱹ",
    placeholder: "ᱠᱷᱤᱫᱤᱭ ᱟᱹᱱ ᱛᱟᱲᱤ...",
  },
  ho: {
    welcome: "ᱦᱚ ᱵᱷᱚᱫᱚ! 👋 ᱟᱦᱮ ᱟᱹᱱ ᱛᱷᱚᱨᱚ ᱠᱚᱨᱚ ᱠᱚᱨᱚᱱ ᱨᱮᱫᱮᱭᱟᱹᱨ।",
    report: "ᱨᱮᱫᱮᱭᱟᱹᱨ ᱠᱚᱨᱚ",
    track: "ᱟᱦᱮ ᱨᱮᱫᱮᱭᱟᱹᱨ",
    faqs: "FAQ",
    account: "ᱠᱚᱨᱚ ᱠᱷᱚᱭᱚ",
    placeholder: "ᱟᱹᱱ ᱛᱷᱚᱨᱚ ᱠᱚᱨᱚ...",
  },
  kharia: {
    welcome: "Kharia welcome text",
    report: "Kharia Report",
    track: "Kharia Track",
    faqs: "Kharia FAQs",
    account: "Kharia Account",
    placeholder: "Kharia type message...",
  },
};


function SendIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} {...props}>
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22l-4-9-9-4 20-7z" />
    </svg>
  );
}

function LoaderDots() {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0s" }} />
      <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.2s" }} />
      <span className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.4s" }} />
    </span>
  );
}

export default function ChatbotWidget({ title = "Jan Samadhan", subtitle = "Your Civic Help Desk", modelName = "gemini-2.0-flash" }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en");
  const listRef = useRef(null);

  
  useEffect(() => {
    setMessages([{ id: crypto.randomUUID(), role: "assistant", content: translations[language].welcome }]);
  }, [language]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  async function sendMessage(userText) {
    const userMsg = { id: crypto.randomUUID(), role: "user", content: userText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              ...messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
              { role: "user", parts: [{ text: userText }] },
            ],
          }),
        }
      );

      if (!res.ok) throw new Error(`Gemini API error ${res.status}`);

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: "Error connecting to the server. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    sendMessage(text);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const t = translations[language];

  return (
    <div className="fixed bottom-8 right-4 z-50">
      {!open && (
        <button onClick={() => setOpen(true)} className="rounded-full p-4 bg-gradient-to-r from-sky-400 to-sky-500 shadow-lg hover:shadow-2xl transition transform hover:scale-105 focus:outline-none" aria-label="Open Chatbot">
          <div className="h-10 w-10">
            <img src={chatbotsvg} alt="Chatbot" className="h-10 w-10" />
          </div>
        </button>
      )}

      {open && (
        <div className="w-[22rem] sm:w-[26rem] h-[34rem] bg-white rounded-2xl shadow-2xl border border-sky-200 flex flex-col overflow-hidden">
         
          <div className="p-4 bg-gradient-to-r from-sky-400 to-sky-500 text-white flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-xs opacity-90">{subtitle}</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/90 hover:text-white px-2 rounded-md focus:outline-none" aria-label="Close chatbot">
              ✕
            </button>
          </div>


          <div className="p-2 bg-sky-50 border-b border-sky-200">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full p-2 rounded border border-sky-300 text-sm">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="sat">Santhali</option>
              <option value="ho">Ho</option>
              <option value="kharia">Kharia</option>
            </select>
          </div>

        
          <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-sky-50" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow ${m.role === "user" ? "bg-sky-500 text-white" : "bg-white border border-sky-200 text-sky-900"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow bg-white border border-sky-200 text-sky-800">
                  <LoaderDots />
                </div>
              </div>
            )}
            {error && <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-md">{error}</div>}
          </div>

       
          {messages.length === 1 && (
            <div className="p-4 grid grid-cols-2 gap-2 bg-sky-50 border-t border-sky-200">
              {[{ label: `📝 ${t.report}`, value: t.report }, { label: `🔍 ${t.track}`, value: t.track }, { label: `❓ ${t.faqs}`, value: t.faqs }, { label: `👤 ${t.account}`, value: t.account }].map((action) => (
                <button key={action.value} onClick={() => sendMessage(action.value)} className="px-3 py-2 rounded-full bg-sky-100 text-sky-800 text-sm hover:bg-sky-200 transition">
                  {action.label}
                </button>
              ))}
            </div>
          )}

       
          <div className="p-3 border-t border-sky-200 bg-white">
            <div className="flex items-end gap-2">
              <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} rows={1} placeholder={t.placeholder} className="flex-1 resize-none rounded-xl border border-sky-300 bg-white text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" />
              <button onClick={handleSend} disabled={loading || !input.trim()} className="p-2 rounded-xl bg-sky-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-600 active:scale-95 transition" aria-label="Send message">
                <SendIcon />
              </button>
            </div>
           
          </div>
        </div>
      )}
    </div>
  );
}
