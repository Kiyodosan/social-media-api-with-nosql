//// might need Thought.deleteMany like example shown in courseController.js line 48 of mini project

const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

//// write functions here

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a user
  async getUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        //// Check .populate syntax to make sure multiple parameters can be passed in like this
        .populate('thoughts', 'friends');
        //// Do I need .select and .lean?
/*         .select('-__v')
        .lean(); */
      
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
        //// Do I need validators?
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove all user's thoughts
  async deleteUser(req, res) {
    try {
      //// Is it supposed to be findOneAndRemove?
      const user = findOneAndDelete({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      //// Is it user.username that we're searching for?
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
        { $addToSet: { friends: req.body } },
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

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};