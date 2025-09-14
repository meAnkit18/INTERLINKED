import React, { useState, useEffect } from 'react';

const Trending = () => {
  const [trendingCategories, setTrendingCategories] = useState([]);

  useEffect(() => {
    const fetchTrendingCategories = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_PORT}/api/trending-categories`);
        const data = await res.json();
        setTrendingCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrendingCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Trending Categories</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Posts</th>
            </tr>
          </thead>
          <tbody>
            {trendingCategories.map((category, index) => (
              <tr key={category._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{category._id}</td>
                <td className="px-4 py-2">{category.postCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trending;
