
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RequestSchema = new Schema(
    {
        name: { 
            type: String, 
            maxlength: 70, 
            required: true 
        },
        description: { 
            type: String,
            maxlength: 400,
            required: true 
            },
        requester: {
            type: String,
            required: true,
            default: 'Requester'
            },
        worker: {
            type: String
            },
        category: { 
            type: String,
            //required: true,
            enum: ['Security', 'Cleaning & Waste', 'Signage', 'Building Maintenance', 'Exterior'],
            },
        priority: {
            type: String,
            required: true,
            default: 'Low',
            enum: ['High', 'Medium', 'Low']
        },
        status: {
             type: String, 
             required: true, 
             default: 'New',
             enum: ['New', 'Awaiting Requester', 'Delayed', 'Assigned', 'Closed'] 
            },
        location: {
                type: String,
                default: 'Mt Albert',
                required: true
                },
        messages: {
            type: [String],
        }
        
    },
    { timestamps: true },
)

module.exports = ServiceRequest = mongoose.model('allRequests', RequestSchema)