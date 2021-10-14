const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


// Reaction Schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: {
            type: String,
            required: 'Text is required!',
            maxlength: 280,
        },

        createdBy: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Thoughts Schema
const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Text is required!',
            minlength: 1,
            maxlength: 280,
        },

        createdBy: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },

        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Get total number of reactions to thought on retrieval
ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;