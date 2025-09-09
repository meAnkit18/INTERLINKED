import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_PORT}/api/leaderboard`);
        if (!res.ok) throw new Error("Failed to fetch leaderboard");
        const data = await res.json();
        setLeaderboard(data || []);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLeaderboard([]); // fallback to empty
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Posts</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user, index) => {
              // normalize data (handles both nested "user" and flat)
              const profile = user?.user || user;
              const username = profile?.username || "Unknown";
              const profilePicture = profile?.profilePicture || "https://via.placeholder.com/40";
              const postCount = user?.postCount ?? 0;

              return (
                <tr key={user._id || index} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <img
                        src={profilePicture}
                        alt={username}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <span>{username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2">{postCount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
