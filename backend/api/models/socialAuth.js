const mongoose = require('mongoose');

const socialAuthSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    provider: {
        type: String,
        required: true
    },

    access_token: {
        type: String,
        required: true
    }

}, {timestamps: true});

module.exports = mongoose.model('SocialAuth', socialAuthSchema);