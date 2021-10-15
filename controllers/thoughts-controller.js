const { User, Thoughts } = require('../models');

const thoughtsController = {
    // Get all thoughts
    getAllThoughts( req, res) {
        Thoughts.find()
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.sendStatus(404);
        });
    },

    // Get a single thought by _id
    getThoughtById({ params }, res) {
        Thoughts.findOne({_id: params.id})
        .then(dbThoughtsData => {
            if (!dbThoughtsData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
        res.json(dbThoughtData);
        })
        .catch(err => res.sendStatus(404).json(err));
    },

    // Create a new thought
    createThought({params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id} },
                {new: true}
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status.json(404).json( {message: 'No user found'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },


    // Update a thought by ID
    // updateThought( {params, body}, res) {
    //     Thoughts.findOneAndUpdate(
    //         {_id: params.thoughtsId })
    //     .then(updatedThought =>
    // },


    // Delete a thought
    removeThought({params}, res) {
        Thoughts.findOneAndDelete(
            {_id: params.thoughtsId})
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({message: 'No thought found with this id'});
                }
                return Thoughts.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtsId} },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({message: 'No User found'});
                    return;
                }
                res.json(dbUserData);
            })
        .catch(err => res.json(err));
    },
}

module.exports = thoughtsController;