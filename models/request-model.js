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
            maxlength: 500,
            required: true
        },
        requester: {
            _id: { type: String },
            name: { type: String },
            email: { type: String },
            type: { type: String }
        },
        assignment: {
            type: new Schema({
                workers: [{ type: String }],
                assignmentMessage: { type: String, default: " " }
            }, { timestamps: true })
        },
        category: {
            type: String,
            required: true,
            enum: ['Security', 'Cleaning & Waste', 'Signage', 'Building Maintenance', 'Exterior'],
        },
        priority: {
            type: String,
            enum: ['High', 'Medium', 'Low', "-"]
        },
        status: {
            type: String,
            required: true,
            default: 'New',
            enum: ['New', 'Awaiting Info', 'Pending Review', 'Unresolved', 'Assigned', 'Closed']
        },
        location: {
            building: { type: String },
            lat: {
                type: Number,
            },
            lng: {
                type: Number
            },
        },
        photos: [
            {
                data: Buffer,
                contentType: String
            }
        ],
        messages: [{
            type: new Schema({
                sender: { type: String },
                message: { type: String },
                messagePhotos: [
                    {
                        data: Buffer,
                        contentType: String
                    }
                ]
            },
                { timestamps: true })

        }],
        workerLog: [{
            type: new Schema({
                sender: { type: String },
                message: { type: String },
                resolution: { type: String, enum: ['resolved', 'unresolved'] },
                messagePhotos: [
                    {
                        data: Buffer,
                        contentType: String
                    }
                ]
            }, { timestamps: true })
        }]
    },
    { timestamps: true },
)

module.exports = ServiceRequest = mongoose.model('allRequests', RequestSchema)