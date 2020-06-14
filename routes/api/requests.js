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

//@route GET api/requests/categories
//@desc GET all requests
//@access Admin
router.get('/categories', (req,res) => {
    Request.aggregate([
        {
          $group: {
            _id: {
              category: '$category'
            },
            count: {
              $sum: 1
            }
          }
        }
     ])
    .then(categoryDetails => res.json(categoryDetails))
});

//@route GET api/requests/:id
//@desc GET a single request details
//@access Admin
router.get('/:_id', (req,res) => {
    Request.findById(req.params._id)
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

//@route POST api/requests
//@desc Create a requests
//@access Requester
router.put('/:_id', (req,res) => {
    const _id = req.params._id
    Request.findByIdAndUpdate(_id, req.body, {useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: 'Cannot Update'
            })
        } else res.send({message: 'Request was updated'})
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Request"
        })
    })
});


module.exports = router;