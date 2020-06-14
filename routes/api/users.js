const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/user-model');


//@route get api/workers
//@desc retrieve worker details
//@access admin
router.get('/workers', (req,res) => {
    User.find(
             {'type': 'Worker'})
            .then(workers => {
                res.json(workers)
            })
            })


//@route get api/workers
//@desc retrieve worker details
//@access admin
router.get('/Requesters', (req,res) => {
    User.find(
             {'type': 'Requester'})
            .then(requesters => {
                res.json(requesters)
            })
            })
  

//@route post api/user
//@desc register new user
//@access Public
router.post('/', (req,res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    User.findOne({ email })
    .then(user => {
        if(user) return res.status(400).json({msg: 'Account already exists'})

        const newUser = new User({
            name,
            email,
            password
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {
                    jwt.sign(
                        { _id: user._id },
                        config.get('jwtSecret'),
                        (err, token) => {
                            if(err) throw err;
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