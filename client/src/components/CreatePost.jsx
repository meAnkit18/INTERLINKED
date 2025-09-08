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

  const [mode, setMode] = useState("form"); 
  const [facingMode, setFacingMode] = useState("user"); 

  const webcamRef = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_PORT;
  const navigate = useNavigate();

  
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
          setImage(file);
          setPreview(imageSrc);
          setMode("preview");
        });
    }
  };

  
  const switchCamera = () => {
    setFacingMode((prev) =>
      prev === "user" ? { exact: "environment" } : "user"
    );
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setProgress(0);

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

      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
      setProgress(0);
      setMode("form");

      navigate("/account");
    } catch (err) {
      console.error("Error creating post:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-22 mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
      
      {mode === "form" && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Report Issues Now 
          </h2>

          <form onSubmit={handlePostSubmit} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className="w-full border rounded px-2 py-1"
            />

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full border rounded px-2 py-1"
            />

            
            <div className="flex gap-3">
              <label className="px-4 py-2 rounded bg-gray-200 cursor-pointer">
                Upload Image
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
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={() => setMode("camera")}
                className="px-4 py-2 rounded bg-indigo-600 text-white"
              >
                Use Camera
              </button>
            </div>

            
            {preview && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Preview:</p>
                <img
                  src={preview}
                  alt="preview"
                  className="mt-1 max-h-60 rounded border"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={!image || loading}
              className={`px-4 py-2 rounded ${
                !image || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-slate-700 hover:bg-slate-800 text-white"
              }`}
            >
              {loading ? `Uploading... ${progress}%` : "Post"}
            </button>
          </form>
        </>
      )}

      
      {mode === "camera" && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode }}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-6 flex gap-4">
            <button
              type="button"
              onClick={capture}
              className="px-6 py-3 bg-green-600 text-white rounded-lg"
            >
              Capture
            </button>
            <button
              type="button"
              onClick={switchCamera}
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg"
            >
              Switch
            </button>
            <button
              type="button"
              onClick={() => setMode("form")}
              className="px-6 py-3 bg-gray-700 text-white rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      
      {mode === "preview" && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
          <img
            src={preview}
            alt="Captured"
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-6 flex gap-4">
            <button
              type="button"
              onClick={() => setMode("form")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg"
            >
              Confirm
            </button>
            <button
              type="button"
              onClick={() => setMode("camera")}
              className="px-6 py-3 bg-red-600 text-white rounded-lg"
            >
              Retake
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
