
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        name: {
            type: String,
            maxlength: 50,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        type: {
            type: String,
            default: 'Requester',
            enum: ['Requester', 'Worker', 'Admin']
        },
        enabled: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true },
)

module.exports = User = mongoose.model('user', UserSchema)