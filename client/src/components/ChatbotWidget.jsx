import { useEffect, useRef, useState } from "react";
import chatbotsvg from "../assets/chatbotsvg.svg";

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

export default function ChatbotWidget({
  title = "Jan Samadhan AI",
  subtitle = "",
  welcome = "Hello! how can i help you?",
  modelName = "gemini-2.0-flash",
}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: crypto.randomUUID(), role: "assistant", content: welcome },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  async function sendMessage(userText) {
    const userMsg = { id: crypto.randomUUID(), role: "user", content: userText };
    setMessages(prev => [...prev, userMsg]);
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
              ...messages.map(m => ({
                role: m.role === "assistant" ? "model" : "user",
                parts: [{ text: m.content }],
              })),
              { role: "user", parts: [{ text: userText }] },
            ],
          }),
        }
      );

      if (!res.ok) throw new Error(`Gemini API error ${res.status}`);

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: "assistant", content: reply }]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setMessages(prev => [...prev, { id: crypto.randomUUID(), role: "assistant", content: "Error connecting to Gemini." }]);
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

  return (
    <div className="fixed bottom-8 right-1 z-9999">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full border-black px-4 py-3 bg-transparent font-medium hover:shadow-2xl active:scale-95 transition"
          aria-label="Open Legal Assistant Chatbot"
        >
          <div className="h-10 w-10 bg-sky-500 rounded-2xl">
            <img
              src={chatbotsvg}
              className="shadow-3xl"
              alt="Chatbot"
            />
          </div>
        </button>
      )}

      {open && (
        <div className="w-[22rem] sm:w-[26rem] h-[34rem] bg-neutral-50 dark:bg-neutral-900 shadow-2xl rounded-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden">
          
          <div className="p-4 bg-gradient-to-r from-sky-500 to-sky-300 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-xs opacity-90">{subtitle}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/90 hover:text-white px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/40"
                aria-label="Close chatbot"
              >
                ✕
              </button>
            </div>
          </div>

          
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50 dark:bg-neutral-900"
            aria-live="polite"
          >
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow ${
                  m.role === "user"
                    ? "bg-sky-500 text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100"
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100">
                  <LoaderDots />
                </div>
              </div>
            )}
            {error && <div className="text-xs text-red-600 dark:text-red-400">{error}</div>}
          </div>

          
          <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Type your legal issue or question..."
                className="flex-1 resize-none rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 text-neutral-900 dark:text-neutral-100"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="p-2 rounded-xl bg-sky-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 active:scale-95 transition"
                aria-label="Send message"
              >
                <SendIcon />
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
