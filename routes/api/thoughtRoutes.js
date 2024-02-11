const router = require('express').Router();
const {
  getThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/thoughts/:id
router.route('/:id')
  .get(getThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:id/reactions
router.route('/:id/reactions')
  .post(addReaction);

// /api/thoughts/:id/reactions/:reactId
router.route('/:id/reactions/:reactId')
  .delete(removeReaction);

module.exports = router;