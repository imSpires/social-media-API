const { Schema, model } = require('mongoose');

// User Schema
const UserSchema = new Schema({
        username: {
            type: String,
            unique: true,
            required: 'A username is required!',
            trim: true
        },

        email: {
            type: String,
            unique: true,
            required: 'An email is required!',
            match: [/.+\@.+\..+/]
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// Get total number of user friends on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;