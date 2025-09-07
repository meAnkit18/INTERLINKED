import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

function ReportPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const [facingMode, setFacingMode] = useState("user");

  const webcamRef = useRef(null);

  // 📸 Capture photo
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setPreview(imageSrc);
      setImage(imageSrc);
    }
  };

  // 🔄 Switch camera
  const switchCamera = () => {
    setFacingMode((prev) =>
      prev === "user" ? { exact: "environment" } : "user"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Report submitted (UI only, no backend)");
    setTitle("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setUseCamera(false);
  };

  return (
    <div className="min-h-screen bg-sky-50">
      {/* Report Form */}
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8">
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
          Report an Issue 🚨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Issue Title"
            required
            className="w-full border border-sky-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-400"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue..."
            className="w-full border border-sky-300 rounded-lg px-3 py-2 h-28 focus:ring-2 focus:ring-sky-400"
          />

          {/* Toggle Upload vs Camera */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setUseCamera(false)}
              className={`px-4 py-2 rounded-lg ${
                !useCamera
                  ? "bg-sky-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Upload Image
            </button>
            <button
              type="button"
              onClick={() => setUseCamera(true)}
              className={`px-4 py-2 rounded-lg ${
                useCamera
                  ? "bg-sky-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Use Camera
            </button>
          </div>

          {/* Camera Mode */}
          {useCamera && (
            <div className="flex flex-col items-center gap-2">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode }}
                className="rounded-lg border"
              />
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={capture}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Capture
                </button>
                <button
                  type="button"
                  onClick={switchCamera}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                >
                  Switch Camera
                </button>
              </div>
            </div>
          )}

          {/* Upload Mode */}
          {!useCamera && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }}
              className="w-full border border-sky-300 rounded-lg px-3 py-2"
            />
          )}

          {/* Preview */}
          {preview && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Preview:</p>
              <img
                src={preview}
                alt="preview"
                className="mt-1 max-h-60 rounded-lg border"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-sky-700 hover:bg-sky-800 text-white py-2 rounded-lg font-medium"
          >
            Submit Report
          </button>
        </form>
      </div>

      {/* Hero Logo + Name */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-extrabold text-sky-800">Jan Samadhan</h1>
        <p className="text-lg text-gray-600 mt-2">
          Empowering citizens to raise their voice ✊
        </p>
      </section>

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto px-6 py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Easy Reporting", desc: "File complaints in just minutes." },
          {
            title: "Photo Evidence",
            desc: "Attach images or capture live proof.",
          },
          {
            title: "Track Progress",
            desc: "Stay updated on your report status.",
          },
          {
            title: "Location Tagging",
            desc: "Automatically pin complaint locations.",
          },
          {
            title: "Community Impact",
            desc: "Your report helps improve society.",
          },
          {
            title: "Government Connect",
            desc: "Bridge between citizens & authorities.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-sky-700">{f.title}</h3>
            <p className="text-gray-600 mt-2">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Motivation Section */}
      <section className="bg-sky-100 py-12 text-center px-6">
        <h2 className="text-3xl font-bold text-sky-800">
          Together, We Can Make a Difference 🌍
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          Your one report can spark a change in your community. Take the step
          today – let’s build a transparent and corruption-free system.
        </p>
      </section>
    </div>
  );
}

export default ReportPage;
