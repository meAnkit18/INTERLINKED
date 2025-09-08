import Post from '../models/Post.js';
import User from '../models/User.js';

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Post.aggregate([
      {
        $group: {
          _id: '$user',
          postCount: { $sum: 1 },
        },
      },
      {
        $sort: { postCount: -1 },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          _id: 1,
          postCount: 1,
          'user.username': 1,
          'user.profilePicture': 1,
        },
      },
    ]);
    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getTrendingCategories = async (req, res) => {
  try {
    const trendingCategories = await Post.aggregate([
      {
        $group: {
          _id: '$category',
          postCount: { $sum: 1 },
        },
      },
      {
        $sort: { postCount: -1 },
      },
    ]);
    res.json(trendingCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
