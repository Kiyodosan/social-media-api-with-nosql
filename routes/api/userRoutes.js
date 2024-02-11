const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api/users/:id
router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:id/friends
router.route('/:id/friends')
  .post(addFriend);

//// Find out where to add this /friends/:friendId route
// /api/users/:id/friends/:friendId
router.route('/:id/friends/:friendId')
  .delete(removeFriend);

module.exports = router;