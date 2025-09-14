import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, Users } from 'lucide-react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBackground = (rank) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200";
      case 3:
        return "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200";
      default:
        return "bg-white border-gray-100";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-12 bg-gray-200 rounded-lg w-64"></div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
              <Trophy className="w-8 h-8 text-teal-600" />
            </div>
            <h1 className="text-4xl font-bold text-teal-900 mb-2">Community Leaderboard</h1>
            <p className="text-gray-600 text-lg">Top contributors making a difference in our community</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{leaderboard.length}</div>
                  <div className="text-gray-600 text-sm">Active Contributors</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {leaderboard.reduce((sum, user) => sum + (user?.postCount ?? 0), 0)}
                  </div>
                  <div className="text-gray-600 text-sm">Total Reports</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {Math.round((leaderboard.reduce((sum, user) => sum + (user?.postCount ?? 0), 0) / leaderboard.length) || 0)}
                  </div>
                  <div className="text-gray-600 text-sm">Avg Reports</div>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">Rankings</h2>
            </div>
            
            <div className="divide-y divide-gray-100">
              {leaderboard.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No contributors yet</h3>
                  <p className="text-gray-500">Be the first to make a difference in your community!</p>
                </div>
              ) : (
                leaderboard.map((user, index) => {
                  const rank = index + 1;
                  const profile = user?.user || user;
                  const username = profile?.username || "Unknown User";
                  const profilePicture = profile?.profilePicture || "https://via.placeholder.com/50";
                  const postCount = user?.postCount ?? 0;

                  return (
                    <div
                      key={user._id || index}
                      className={`p-6 transition-all duration-200 hover:bg-gray-50 ${getRankBackground(rank)} border-l-4`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Rank */}
                          <div className="flex items-center justify-center w-12 h-12">
                            {getRankIcon(rank)}
                          </div>

                          {/* User Info */}
                          <div className="flex items-center space-x-3">
                            <img
                              src={profilePicture}
                              alt={username}
                              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/50";
                              }}
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900">{username}</h3>
                              <p className="text-sm text-gray-600">Community Contributor</p>
                            </div>
                          </div>
                        </div>

                        {/* Post Count */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-teal-600">{postCount}</div>
                          <div className="text-sm text-gray-600">
                            {postCount === 1 ? 'Report' : 'Reports'}
                          </div>
                        </div>
                      </div>

                      {/* Achievement Badge for Top 3 */}
                      {rank <= 3 && (
                        <div className="mt-3 flex items-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                            rank === 2 ? 'bg-gray-100 text-gray-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {rank === 1 ? '🏆 Champion' : rank === 2 ? '🥈 Runner-up' : '🥉 Third Place'}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Motivational Footer */}
          <div className="text-center mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20">
            <p className="text-gray-600">
              Want to see your name here? Start reporting issues and help improve your community! 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;