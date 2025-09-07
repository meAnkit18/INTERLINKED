import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Webcam from "react-webcam";

function CreatePost({ fetchUserPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [useCamera, setUseCamera] = useState(false);
  const [facingMode, setFacingMode] = useState("user"); // 👈 Default front camera

  const webcamRef = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_PORT;
  const navigate = useNavigate();

  // 📸 Capture image from webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
          setImage(file);
          setPreview(imageSrc);
        });
    }
  };

  // 🔄 Switch between front and back cameras
  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? { exact: "environment" } : "user"));
  };

  // 📝 Submit report
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setProgress(0);

    // Get current location
    const getLocation = () =>
      new Promise((resolve) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) =>
              resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
            () => resolve({ lat: null, lon: null }),
            { enableHighAccuracy: true, timeout: 10000 }
          );
        } else {
          resolve({ lat: null, lon: null });
        }
      });

    const { lat, lon } = await getLocation();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("latitude", lat);
    formData.append("longitude", lon);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${backendURL}/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      if (fetchUserPosts) fetchUserPosts();

      // Reset form
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
      setProgress(0);

      navigate("/account");
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-sky-700 mb-6">
          Report an Issue
        </h2>

        <form onSubmit={handlePostSubmit} className="space-y-5">
          {/* Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter issue title"
            required
            className="w-full border border-sky-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue in detail"
            rows="4"
            required
            className="w-full border border-sky-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          {/* Toggle between Upload and Camera */}
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={() => setUseCamera(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                !useCamera ? "bg-sky-600 text-white" : "bg-gray-200"
              }`}
            >
              Upload Image
            </button>
            <button
              type="button"
              onClick={() => setUseCamera(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                useCamera ? "bg-sky-600 text-white" : "bg-gray-200"
              }`}
            >
              Use Camera
            </button>
          </div>

          {/* Camera Mode */}
          {useCamera && (
            <div className="flex flex-col items-center gap-3">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode }}
                className="rounded-lg border w-full max-w-sm"
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={capture}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Capture
                </button>
                <button
                  type="button"
                  onClick={switchCamera}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
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
              required={!image}
              className="w-full border border-sky-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          )}

          {/* Preview */}
          {preview && (
            <div className="mt-3">
              <p className="text-sm text-gray-600">Preview:</p>
              <img
                src={preview}
                alt="preview"
                className="mt-2 max-h-60 w-full object-contain rounded-lg border"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!image || loading}
            className={`w-full py-2 rounded-lg font-medium text-white ${
              !image || loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-700 hover:bg-sky-800"
            }`}
          >
            {loading ? `Uploading... ${progress}%` : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
