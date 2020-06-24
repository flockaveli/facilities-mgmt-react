const fs = require('fs')
const path = require('path')
const multer = require('multer')
const express = require('express');
const router = express.Router();

const Request = require('../../models/request-model');

const storage = multer.diskStorage({
    destination: "./public/",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
})



/// ** ADMIN API CALLS **



//@route GET api/requests/
//@desc GET details of all open requests for dashboard
//@access Admin
router.get('/admin', (req, res) => {
    Request.find({ status: { $ne: 'Closed' } },
        { name: 1, category: 1, description: 1, priority: 1, requester: 1, status: 1, updatedAt: 1 })
        .sort({ updatedAt: -1 })
        .then(requests => res.json(requests))
});

//@route GET api/requests/archive
//@desc GET details of all closed requests for admin archive dashboard
//@access Admin
router.get('/archive', (req, res) => {
    Request.find({ status: 'Closed' },
        { name: 1, category: 1, status: 1, requester: 1, updatedAt: 1 })
        .sort({ updatedAt: -1 })
        .then(requests => res.json(requests))
});

//@route GET api/requests/categories
//@desc GET sum of requests in each category for category bar
//@access Admin
router.get('/categories', (req, res) => {
    Request.aggregate([{
        $group: {
            _id: { category: '$category' },
            count: { $sum: 1 }
        }
    }])
        .then(categoryDetails => res.json(categoryDetails))
});

//@route GET api/requests/detail/:id
//@desc GET a single request details
//@access Admin
router.get('/detail/:_id', (req, res) => {
    Request.findById(req.params._id)
        .then(request => res.json(request))
});

//@route POST api/request/respond/_id
//@desc Respond to a requester
//@access admin
router.put('/respond/:_id', (req, res) => {
    const _id = req.params._id
    Request.findByIdAndUpdate(_id, { $push: { 'messages': { sender: 'Admin', message: req.body.message } }, status: 'Awaiting Info' }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Cannot Update'
                })
            } else res.send({ info: data, message: 'Request was updated' })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Request"
            })
        })
});

//@route POST api/request/closerequest/_id
//@desc close a request so it does not appear on dashboard
//@access admin
router.put('/closerequest/:_id', (req, res) => {
    const _id = req.params._id
    Request.findByIdAndUpdate(_id, { status: 'Closed' }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Cannot Update'
                })
            } else res.send({ info: data, message: 'Request was updated' })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Request"
            })
        })
});

//@route PUT api/request/priority/_id
//@desc change a requests priority from details screen
//@access admin
router.put('/priority/:_id', (req, res) => {
    const _id = req.params._id
    Request.findByIdAndUpdate(_id, { priority: req.body.priority }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Cannot Update'
                })
            } else res.send({ info: data, message: 'Request was updated' })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Request"
            })
        })
});


//@route POST api/request/assign/_id
//@desc Update a request with assignment details
//@access admin
router.put('/assign/:_id', (req, res) => {
    const _id = req.params._id
    Request.findByIdAndUpdate(_id, { assignment: req.body, status: 'Assigned' }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Cannot Update'
                })
            } else res.send({ info: data, message: 'Request was updated' })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Request"
            })
        })
});

//@route GET api/requests/workerjobcount
//@desc GET sum of requests each worker has
//@access Admin
router.get('/workerjobcount', (req, res) => {
    Request.aggregate([{
        $unwind:
            '$assignment.workers'
    },
    {
        $group: {
            _id: '$assignment.workers',
            count: { $sum: 1 }
        }
    }])
        .then(categoryDetails => res.json(categoryDetails))
});










/// ** WORKER API CALLS **




//@route GET api/requests/workersrequests
//@desc GET all open requests assigned to logged in worker
//@access Worker
router.get('/workersrequests', (req, res) => {
    Request.find({ 'assignment.workers': { $in: [req.body._id] }, status: { $ne: 'Closed' } },
        { name: 1, category: 1, status: 1, updatedAt: 1 })
        .sort({ updatedAt: -1 })
        .then(requests => res.json(requests))
});

//@route GET api/requests/workersarchive
//@desc GET all closed requests assigned to logged in worker
//@access Worker
router.get('/workerarchive', (req, res) => {
    Request.find(
        { 'assignment.workers': { $in: [req.body._id] }, status: 'Closed' },
        { name: 1, category: 1, status: 1, updatedAt: 1 }
    )
        .sort({ updatedAt: -1 })
        .then(requests => res.json(requests))
});


//@route PUT /logJob/:_id
//@desc Update a request
//@access requester
router.put('/logJob/:_id', upload.array('photos', 6), (req, res) => {
    const msgPhotos = []
    for (var i = 0; i < req.files.length; i++) {
        msgPhotos[i] = {
            data: fs.readFileSync(req.files[i].path),
            contentType: req.files[i].mimetype
        }
    }
    const _id = req.params._id
    Request.findByIdAndUpdate(_id, { $push: { 'workerLog': { sender: req.body.sender, message: req.body.message, messagePhotos: msgPhotos } }, status: req.body.status }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Cannot Update'
                })
            } else res.send({ message: 'Request was updated' })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Request"
            })
        })
});









/// ** REQUESTER API CALLS **

//@route GET api/requests/myrequests
//@desc GET all requests made by logged in requester
//@access Requester
router.get('/myrequests/:_id', (req, res) => {
    Request.find({ 'requester._id': req.params._id, status: { $ne: 'Closed' } },
        { name: 1, category: 1, status: 1, updatedAt: 1 })
        .sort({ updatedAt: -1 })
        .then(requests => res.json(requests))
});

//@route GET api/requests/requesterarchive
//@desc GET all closed requests assigned to logged in requester
//@access requester
router.get('/requesterarchive', (req, res) => {
    Request.find({ 'requester._id': req.params._id, status: 'Closed' },
        { name: 1, category: 1, status: 1, updatedAt: 1 })
        .sort({ updatedAt: -1 })
        .then(requests => res.json(requests))
});

//@route POST api/requests
//@desc Create a request
//@access Requester
router.post('/createrequest', upload.array('photos', 6), (req, res) => {
    const reqPhotos = []
    for (var i = 0; i < req.files.length; i++) {
        reqPhotos[i] = {
            data: fs.readFileSync(req.files[i].path),
            contentType: req.files[i].mimetype
        }
    }
    var newRequest = new Request({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        location: JSON.parse(req.body.location),
        photos: reqPhotos,
        requester: JSON.parse(req.body.requester)
    });
    newRequest.save().then(request => res.json(request))
});

//@route POST api/request
//@desc Update a request
//@access requester
router.put('/addmessage/:_id', upload.array('photos', 6), (req, res) => {
    const msgPhotos = []
    for (var i = 0; i < req.files.length; i++) {
        msgPhotos[i] = {
            data: fs.readFileSync(req.files[i].path),
            contentType: req.files[i].mimetype
        }
    }
    const _id = req.params._id
    Request.findByIdAndUpdate(_id, { $push: { 'messages': { sender: req.body.sender, message: req.body.message, messagePhotos: msgPhotos } }, status: 'New' }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Cannot Update'
                })
            } else res.send({ message: 'Request was updated' })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Request"
            })
        })
});




module.exports = router;