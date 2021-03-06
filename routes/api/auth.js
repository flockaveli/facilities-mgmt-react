const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/user-model');


//@route post api/auth
//@desc authenticate user
//@access Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User not found' })



            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

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
                                    type: user.type,
                                    enabled: user.enabled
                                }
                            })
                        }
                    )
                })


        })
})

//@route GET api/auth/user
//@desc get user data
//@access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user._id)
        .select('-password')
        .then(user => res.json(user))
})





module.exports = router;