const router = require('express').Router();

const {
    getAllUsers, 
    getUserById, 
    updateUser,
    createUser,
    deleteUser
} = require('../../controllers/user-controller');

// Get/POST routes at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)


// Get One, Put, and Delete routes at /api/users/:id
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// Post, delete routes at /api/users/userid/friends/friendid
router 
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;