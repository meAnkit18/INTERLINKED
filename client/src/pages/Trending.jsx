import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, Tag, ArrowUp, ArrowDown, Activity } from 'lucide-react';

const Trending = () => {
  const [trendingCategories, setTrendingCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_PORT; // make sure this is full URL e.g. http://localhost:5000

  useEffect(() => {
    const fetchTrendingCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${backendURL}/api/trending-categories`);

        // Check if server responded with JSON
        const contentType = res.headers.get("content-type");
        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        if (!contentType || !contentType.includes("application/json")) {
          const text = await res.text();
          throw new Error(`Unexpected response: ${text}`);
        }

        const data = await res.json();
        setTrendingCategories(data);
      } catch (err) {
        console.error("Error fetching trending categories:", err);
        setError(err.message || "Failed to fetch trending categories");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCategories();
  }, [backendURL]);

  const getTrendIcon = (change) => {
    if (change?.startsWith('+')) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (change?.startsWith('-')) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return null;
  };

  const getTrendColor = (change) => {
    if (change?.startsWith('+')) return 'text-green-600 bg-green-50';
    if (change?.startsWith('-')) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading trending categories...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  const totalPosts = trendingCategories.reduce((sum, cat) => sum + cat.postCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-4xl font-bold text-teal-900 mb-2">Trending Categories</h1>
            <p className="text-gray-600 text-lg">Most reported civic issues in your community</p>
          </div>

          {/* Trending Categories List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-teal-50">
              <h2 className="text-xl font-semibold text-gray-800">Category Rankings</h2>
            </div>

            <div className="divide-y divide-gray-100">
              {trendingCategories.length === 0 ? (
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No trending data</h3>
                  <p className="text-gray-500">Check back later for trending categories.</p>
                </div>
              ) : (
                trendingCategories.map((category, index) => {
                  const rank = index + 1;
                  const percentage = totalPosts > 0 ? ((category.postCount / totalPosts) * 100).toFixed(1) : 0;

                  return (
                    <div key={category._id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                            rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                            rank === 2 ? 'bg-gray-100 text-gray-800' :
                            rank === 3 ? 'bg-amber-100 text-amber-800' :
                            'bg-teal-100 text-teal-800'
                          }`}>
                            #{rank}
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{category._id}</h3>
                            <p className="text-sm text-gray-600">{percentage}% of total reports</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-teal-600 mb-1">{category.postCount}</div>
                          <div className="flex items-center justify-end space-x-1">
                            {getTrendIcon(category.change)}
                            <span className={`text-sm font-medium px-2 py-1 rounded-full ${getTrendColor(category.change)}`}>
                              {category.change}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
