
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
            //required: true,
            default: 'Student',
            enum: ['Staff', 'Student', 'Worker', 'Admin']
        },
        status: {
             type: String, 
             //required: true, 
             default: 'Enabled',
             enum: ['Enabled', 'Disabled'] 
            },
        
        
    },
    { timestamps: true },
)

module.exports = User = mongoose.model('user', UserSchema)