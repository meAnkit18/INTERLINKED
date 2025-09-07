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
  const [useCamera, setUseCamera] = useState(false); // 👈 toggle upload vs camera

  const webcamRef = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_PORT;
  const navigate = useNavigate();

  // 📸 Capture photo from webcam
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

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setProgress(0);

    // Get location
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mt-22 mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Report Issues That You Are Facing
      </h2>
      <form onSubmit={handlePostSubmit} className="space-y-4">
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border rounded px-2 py-1"
          />
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>

        {/* Toggle Upload vs Camera */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setUseCamera(false)}
            className={`px-4 py-2 rounded ${
              !useCamera ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            Upload Image
          </button>
          <button
            type="button"
            onClick={() => setUseCamera(true)}
            className={`px-4 py-2 rounded ${
              useCamera ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            Use Camera
          </button>
        </div>

        {/* Upload option */}
        {!useCamera && (
          <div>
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex justify-center items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-md hover:brightness-110 transition duration-150"
            >
              <img
                src="https://blogger.googleusercontent.com/img/a/AVvXsEi9UwU3oG7bGPK-_qdLHroYP9B2eKA6Ql5GVt1r4OZbZCbszaoJTDgdo4rvR19drU7H1uwIWf3uc1CgFmPZNoj2W3Bwkcbf_ErcNKbnm-aX6s1WzS4PUeZO5eW2FnfcScBm6BXiyd5Z0sa4d2HSIbIlAFs1AGi9SQJRTYTsefAStZyTR6RgTRl65ciOI3Q"
                className="w-6 h-6"
                alt=""
              />
              Upload Image
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!image}
              className="hidden"
            />
          </div>
        )}

        {/* Camera option */}
        {useCamera && (
          <div className="flex flex-col items-center">
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg border"
            />
            <button
              type="button"
              onClick={capture}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
            >
              Capture Photo
            </button>
          </div>
        )}

        {/* Preview */}
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
    </div>
  );
}

export default CreatePost;
