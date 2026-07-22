const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    venue: {
        type: String,
        required: true
    },

    // Registration fee
    registrationFee: {
        type: Number,
        required: true,
        default: 0
    },

    // Maximum participants allowed
    maxParticipants: {
        type: Number,
        required: true
    },

    // Event banner
    image: {
        type: String
    },

    // Coordinator details
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    coordinatorName: {
        type: String,
        required: true
    },

    coordinatorEmail: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Event", eventSchema);