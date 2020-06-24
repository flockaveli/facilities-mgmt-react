const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/user-model');


//@route PUT api/users/disable
//@desc Update a user to enable/disable their account
//@access admin
router.put('/disable/:_id', (req, res) => {
    const _id = req.params._id
    Request.findByIdAndUpdate(_id, { status: req.body.status }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: 'Cannot Update'
                })
            } else res.send({ info: data, message: 'User was updated' })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Request"
            })
        })
});

//@route get api/users/workers
//@desc retrieve worker details
//@access admin
router.get('/workers', (req, res) => {
    User.find(
        { 'type': 'Worker' })
        .then(workers => {
            res.json(workers)
        })
})

//@route get api/users/requesters
//@desc retrieve worker details
//@access admin
router.get('/Requesters', (req, res) => {
    User.find(
        { 'type': 'Requester' })
        .then(requesters => {
            res.json(requesters)
        })
})

//@route GET api/users/single
//@desc get user 
//@access admin
router.get('/single/:_id', (req, res) => {
    User.findById(req.params._id)
        .then(user => res.json(user))
})


//@route PUT api/users/toggle
//@desc update single user enabled 
//@access admin
router.put('/toggle/:_id', (req, res) => {
    const _id = req.params._id
    User.findByIdAndUpdate(_id, { enabled: req.body.enabled }, { useFindAndModify: false })
        .then(user => res.json(user))
})
//@route PUT api/users/type
//@desc update single user enabled 
//@access admin
router.put('/type/:_id', (req, res) => {
    const _id = req.params._id
    User.findByIdAndUpdate(_id, { type: req.body.type }, { useFindAndModify: false })
        .then(user => res.json(user))
})


//@route post api/user
//@desc register new user
//@access Public
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'Account already exists' })
            const newUser = new User({
                name,
                email,
                password
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { _id: user._id },
                                config.get('jwtSecret'),
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            _id: user._id,
                                            name: user.name,
                                            email: user.email,
                                            type: user.type
                                        }
                                    })

                                }
                            )

                        })
                })
            })
        })

});


module.exports = router;