const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
        .select('-__v')
        .populate('thoughts')
        .populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a user
  async getUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .select('-__v')
        .populate('thoughts')
        .populate('friends');
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      //// Might not be necessary, since friends are associated by ID
/*       const friendUser = await User.updateMany(
        { friends: { username: user.username } },
        { $set: { _id: req.params.id } },
        { runValidators: true, new: true }
      ); */

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove all user's friend associations and thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await User.updateMany(
        { friends: { _id: req.params.id } },
        { $pull: { friends: { _id: req.params.id } } },
        { runValidators: true, new: true }
      );

      await Thought.deleteMany({ username: { $in: user.username } });

      res.json({ message: 'User and all associated thoughts removed' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Add a friend to a user
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: { _id: req.params.friendId } } },
        { runValidators: true, new: true },
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove a friend from a user
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: { _id: req.params.friendId } } },
        { runValidators: true, new: true },
      );

      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }

      const friendUser = await User.findOne({ _id: req.params.friendId });
      
      if (!friendUser) {
        res.status(404).json({ message: 'Friend not found' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};