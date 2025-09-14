import React, { useEffect, useState } from "react";
import axios from "axios";
import MapView from "../components/MapView";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const backendURL = import.meta.env.VITE_BACKEND_PORT;

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  
  const categories = ["All", ...new Set(posts.map((post) => post.category))];

  
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  
  const handleStatusChange = async (id, newStatus) => {
  setPosts((prev) =>
    prev.map((post) =>
      post._id === id ? { ...post, status: newStatus } : post
    )
  );
  try {
    const res = await axios.put(`${backendURL}/api/admin/posts/${id}/status`, {
      status: newStatus,
    });
    if (res.data.status !== newStatus) {
      setPosts((prev) =>
        prev.map((post) =>
          post._id === id ? { ...post, status: res.data.status } : post
        )
      );
    }
  } catch (error) {
    console.error("Error updating status:", error);
    setPosts((prev) =>
      prev.map((post) =>
        post._id === id ? { ...post, status: post.status } : post
      )
    );
  }
};


  return (
    <div className="container mt-17 mx-auto px-4 py-6">
      <h1 className="text-2xl text-center font-bold mb-2">Admin Dashboard</h1>
        <MapView posts={posts}/>
  
      <div className="flex gap-2  my-4 overflow-x-auto">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg border flex-shrink-0 transition 
              ${
                selectedCategory === cat
                  ? "bg-slate-800 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

  
      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Image</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Location</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post._id} className="text-center">
                  <td className="border p-2">
                    <img
                      src={post.imageUrl}
                      alt="issue"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border p-2">{post.title}</td>
                  <td className="border p-2">{post.category}</td>
                  <td className="border p-2">
                    {post.latitude}, {post.longitude}
                  </td>
                  <td className="border p-2">{post.status || "Pending"}</td>
                  <td className="border p-2">
                    <select
                        value={post.status || "Pending"}
                        onChange={(e) => handleStatusChange(post._id, e.target.value)}
                        className="border p-1 rounded"
                        >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        </select>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
