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
  const [isImageReal, setIsImageReal] = useState(null);

  const [mode, setMode] = useState("form"); // form | camera | preview
  const [facingMode, setFacingMode] = useState("user"); // user | environment

  const webcamRef = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_PORT; // ✅ Correct URL
  const navigate = useNavigate();

  const handleImageUpload = async (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const uploadRes = await axios.post(`${backendURL}/api/upload/uploadimg`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      // TODO: Re-enable AI model validation later
      setIsImageReal(true);
    } catch (error) {
      console.error("Error during image upload:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
          handleImageUpload(file);
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
    if (!image || !isImageReal) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to submit a post!");
      return;
    }

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
      setIsImageReal(null);

      alert("Post submitted successfully!");
      navigate("/account");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Unauthorized! Please login again.");

        navigate("/login");

        navigate("/home");

      } else {
        console.error("Error creating post:", err);
        alert("Failed to create post. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 pt-24 pb-12">

        {/* ===== FORM MODE ===== */}

        {mode === "form" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-teal-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  Report Issues Now
                </h2>

                <p className="text-gray-600">Help improve your community by reporting issues</p>

              </div>

              <form onSubmit={handlePostSubmit} className="space-y-6">
                <div>

                  <label className="block text-sm font-semibold text-gray-700">Issue Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a clear, descriptive title"
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>

                  <label className="block text-sm font-semibold text-gray-700">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide detailed information about the issue"
                    rows="4"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none"
                  />
                </div>

                <div>

                  <label className="block text-sm font-semibold text-gray-700">Add Photo Evidence</label>
                  <div className="flex flex-col sm:flex-row gap-3 mt-2">
                    <label className="flex-1 px-6 py-3 rounded-xl bg-teal-50 border-2 border-teal-200 cursor-pointer text-center font-medium text-teal-700">
                      Upload from Gallery
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {

                            setImage(file);
                            setPreview(URL.createObjectURL(file));

                            handleImageUpload(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setMode("camera")}
                      className="flex-1 px-6 py-3 rounded-xl bg-teal-600 text-white font-medium"
                    >
                      Take Photo
                    </button>
                  </div>
                </div>

                {preview && (
                  <div className="mt-4">

                    <label className="block text-sm font-semibold text-gray-700">Photo Preview</label>
                    <img src={preview} alt="preview" className="w-full h-64 object-cover rounded-xl mt-2" />

                  </div>
                )}

                <button
                  type="submit"
                  disabled={!image || loading || !isImageReal}
                  className={`w-full py-4 rounded-xl font-semibold text-lg mt-4 ${
                    !image || loading || !isImageReal
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700 text-white"
                  }`}
                >
                  {loading ? `Uploading... ${progress}%` : "Submit Report"}
                </button>
              </form>
            </div>

          </div>
        )}

        {/* ===== CAMERA MODE ===== */}
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

        {/* ===== PREVIEW MODE ===== */}
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
    </div>
  );
}

export default CreatePost;
