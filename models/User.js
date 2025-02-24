const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },

    emial: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true,
    },

    bio: {
        type: String,
    },

}, {timestamps: true})


module.exports = mongoose.model("User", UserSchema)