const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('./../models/User')

router.post('/', (req, res) => {
    if (!req.body.username && req.body.username !== '') {
        return res.status(200).json({
            status: 'err',
            field: 'username',
            message: 'Username is empty'
        })
    }

    if (!req.body.password && req.body.password !== '') {
        return res.status(200).json({
            status: 'err',
            field: 'password',
            message: 'Password is empty'
        })
    }

    if(req.body.username.length > 10) {
        return res.status(200).json({
            status: 'err',
            field: 'username',
            message: 'username is too long'
        })
    }

    if(req.body.username.length < 4) {
        return res.status(200).json({
            status: 'err',
            field: 'username',
            message: 'username is too short'
        })
    }

    User.findOne({ username: req.body.username })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password, (err, hashRes) => {
                if (err) {
                    return res.status(500).json({
                        message: 'bcrypt err'
                    })
                }

                if(hashRes) {
                    jwt.sign({_id: user._id, id: user.id}, process.env.SECRET_KEY, (err, token) => {
                        if(!err) {
                            return res.json({
                                status: 'success',
                                data: {
                                    token
                                }
                            })
                        } else {
                            return res.json({
                                status: 'err',
                                field: 'password',
                                message: 'Wrong password'
                            })
                        }

                    })
                } else {
                    res.status(200).json({
                        status: 'err',
                        field: 'password',
                        message: 'Wrong password'
                    })
                }

            })
        }).catch((err) => {
            res.status(200).json({
                status: 'err',
                field: 'username',
                message: 'User does not exist'
            })
        })
})

module.exports = router