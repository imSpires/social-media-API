const { User, Thoughts } = require('../models');

const thoughtsController = {
    // Get all thoughts
    getAllThoughts( req, res) {
        Thoughts.find({})
        .populate({
            path: "reactions",
            select: "-__v",
          })
          .select("-__v")
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
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
        res.json(dbThoughtsData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
    },

    // Create a new thought
    createThought({body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
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
    updateThought( {params, body}, res) {
        Thoughts.findOneAndUpdate(
            {_id: params.id }, body, {new: true})
        .then(updatedThought => {
            if (!updatedThought) {
                res.status(404).json({message: "No thought with this id"});
                return;
            }
            res.json(updatedThought);
        })
        .catch((err) => res.status(400).json(err));
    },


    // Delete a thought
    removeThought({params}, res) {
        Thoughts.findOneAndDelete(
            {_id: params.id})
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({message: 'No thought found with this id'});
                }
                res.json(deletedThought);
            })
            .catch((err) => res.status(400).json(err));
    },

    // add reaction
    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought with this id"});
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    // delete reaction
    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
          )
            .then((dbThoughtData) => res.json(dbThoughtData))
            .catch((err) => res.json(err));
        },
}

module.exports = thoughtsController;