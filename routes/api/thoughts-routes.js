const router = require('express').Router();

const {
    getAllThoughts, 
    getThoughtById, 
    // updateThought,
    createThought,
    removeThought
} = require('../../controllers/thoughts-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

router
    .route('/:thoughtId')
    .get(getThoughtById)
    // .put(updateThought)
    .delete(removeThought)

// router
//     .route('/:thoughtId/reactions')
//     .post('addReaction')
//     .delete('deleteReaction')

module.exports = router;