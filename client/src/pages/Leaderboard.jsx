import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        setLeaderboard(data);
      } catch (error) {
        console.error(error);
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
            {leaderboard.map((user, index) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center">
                    <img
                      src={user.user.profilePicture || 'https://via.placeholder.com/40'}
                      alt={user.user.username}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <span>{user.user.username}</span>
                  </div>
                </td>
                <td className="px-4 py-2">{user.postCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
