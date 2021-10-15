const router = require('express').Router();

const {
    getAllThoughts, 
    getThoughtById, 
    updateThought,
    createThought,
    removeThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/:thoughtId/:reactionId')
    .delete(deleteReaction);

module.exports = router;