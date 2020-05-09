const express = require('express');
const router = express.Router();

const Request = require('../../models/request-model');


//@route GET api/requests
//@desc GET all requests
//@access Admin
router.get('/', (req,res) => {
    Request.find()
    .sort({ updated: -1 })
    .then(requests => res.json(requests))
});

//@route GET api/requests/:id
//@desc GET a single request details
//@access Admin
router.get('/:id', (req,res) => {
    Request.findById(req.params.id)
    .then(request => res.json(request))
});

//@route POST api/requests
//@desc Create a requests
//@access Requester
router.post('/', (req,res) => {
    const newRequest = new Request({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        priority: req.body.priority,

    });
    newRequest.save().then(request => res.json(request))
});

module.exports = router;