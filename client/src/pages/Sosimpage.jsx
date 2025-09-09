
import React, { useState } from "react";


export default function Sosimpage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [coords, setCoords] = useState(null);

  
  const sendAlert = async (level = "high") => {
    setLoading(true);
    setStatus(null);

    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setCoords({ latitude, longitude });
          fakeNetworkRequest({ latitude, longitude, level, message });
        },
        (err) => {
          
          console.warn("Geolocation failed:", err.message);
          fakeNetworkRequest({ latitude: null, longitude: null, level, message });
        },
        { timeout: 5000 }
      );
    } else {
      
      fakeNetworkRequest({ latitude: null, longitude: null, level, message });
    }
  };

  function fakeNetworkRequest(payload) {
    // simulate an API send
    console.log("[SOS] sending payload:", payload);
    setTimeout(() => {
      setLoading(false);
      setStatus({ ok: true, text: "Alert sent (dummy)." });
    }, 1200);
  }

  const quickMessage = (text) => {
    setMessage(text);
  };

  return (
    <main className="min-h-screen mt-18 bg-gradient-to-b from-gray-100 to-white flex items-center justify-center p-2">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 md:p-10">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-red-600">SOS — Emergency Alert</h1>
            <p className="text-sm text-gray-500">This is a dummy page. No real alerts are sent.</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-700 text-sm font-medium">Demo Mode</span>
          </div>
        </header>

        <section className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Describe the situation (optional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g. I need immediate medical assistance at my location"
            className="w-full rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-red-200"
            rows={3}
          />
          <div className="mt-3 flex gap-2">
            <button onClick={() => quickMessage("Medical emergency — unconscious")}
              className="text-sm px-3 py-1 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">Medical</button>
            <button onClick={() => quickMessage("Feeling threatened — need police")}
              className="text-sm px-3 py-1 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">Police</button>
            <button onClick={() => quickMessage("Fire emergency — building on fire")}
              className="text-sm px-3 py-1 rounded-md border border-gray-200 text-gray-700 hover:bg-gray-50">Fire</button>
          </div>
        </section>

        <section className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2 flex items-center">
              <button
                onClick={() => sendAlert("high")}
                disabled={loading}
                className="w-full md:w-auto flex-1 md:flex-none text-white bg-red-600 hover:bg-red-700 active:scale-95 transition-transform duration-150 font-bold px-6 py-4 rounded-lg text-xl shadow-md focus:outline-none focus:ring-4 focus:ring-red-200">
                {loading ? "Sending..." : "SEND SOS"}
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <button onClick={() => sendAlert("low")} disabled={loading}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50">Send Low-priority Alert</button>

              <button onClick={() => { setMessage(""); setStatus(null); setCoords(null); }}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50">Reset</button>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Nearby Contacts (dummy)</h2>
          <ul className="space-y-2">
            <li className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
              <div>
                <div className="font-medium">Mom</div>
                <div className="text-xs text-gray-500">+91 98765 43210</div>
              </div>
              <div>
                <button className="text-sm px-3 py-1 rounded-md bg-gray-50 border">Call</button>
              </div>
            </li>

            <li className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
              <div>
                <div className="font-medium">Friend — Rohit</div>
                <div className="text-xs text-gray-500">+91 91234 56789</div>
              </div>
              <div>
                <button className="text-sm px-3 py-1 rounded-md bg-gray-50 border">Call</button>
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">Status</h2>
          <div className="rounded-lg border border-gray-100 p-3 bg-gray-50">
            <div className="text-sm text-gray-700">{status ? status.text : "No alert sent yet."}</div>
            <div className="mt-2 text-xs text-gray-500">{coords ? `Lat: ${coords.latitude.toFixed(5)}, Lon: ${coords.longitude.toFixed(5)}` : "Location: not available"}</div>
          </div>
        </section>

        <footer className="text-xs text-gray-400">This is a dummy SOS page for UI/demo purposes only. Integrate with real services (SMS, call, push notifications, 3rd party emergency APIs) before using in production.</footer>
      </div>
    </main>
  );
}
