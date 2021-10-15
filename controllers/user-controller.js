const { User } = require('../models');

const userController = {
    // Get All Users
    getAllUsers(req, res) {
        User.find()
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
    },

    // Get one user by its _id
    getUserById({ params }, res) {
        User.findOne(
            {_id: params.id}
        )
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "No user found with this ID"});
            }
            res.json(dbUserData)})
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
    },

    // Create a user
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
    },

    // Update user by ID
    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
        res.json(dbUserData);
        })
        .catch(err => res.sendStatus(404).json(err));
    },

    // Delete a user by its ID
    deleteUser({ params }, res) {
        User.findOneAndDelete( {_id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.sendStatus(404).json(err));
    },

    // Add a friend to the Users friendlist
    addFriend( { params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: {friends: params.friendsId } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
    },

    // Remove a friend from the Users friendlist
    removeFriend( { params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: {friends: params.friendsId } },
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "no user found with this ID" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
    }

}

module.exports = userController;