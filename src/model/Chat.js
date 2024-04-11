const mongoose = require('mongoose');
const User = require('./User');

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'ai'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const conversationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    messages: [messageSchema]
});

const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    conversations: [conversationSchema]
});

module.exports = mongoose.model('Chat', chatSchema);
