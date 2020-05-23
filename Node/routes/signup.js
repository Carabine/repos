const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('./../models/User')

const seq = require('./../utils/seq')

router.post('/', (req, res) => {
    if(!req.body.username && req.body.username !== '') {
        return res.status(200).json({
            status: 'err',
            field: 'username',
            message: 'username is empty'
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

    if(!req.body.password && req.body.username !== '') {
        return res.status(200).json({
            status: 'err',
            field: 'password',
            message: 'password is empty'
        })
    }

    if(!req.body.email) {
        return res.status(200).json({
            status: 'err',
            field: 'email',
            message: 'email is empty'
        })
    }

    if(!req.body.email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i)) {
        return res.status(200).json({
            status: 'err',
            field: 'email',
            message: 'email is incorrect'
        })
    }

    bcrypt.hash(req.body.password, Number(process.env.SALT_ROUNDS), (err, hash) => {
        if(!err) {
            seq.getNextSequence("userid")
                .then(counter => {
                    console.log(counter.seq)
                    if(counter) {
                        let user = new User({
                            username: req.body.username,
                            password: hash,
                            email: req.body.email,
                            id: counter.seq + 1
                        })
                        console.log(user)
                        user.save((err) => {
                            if(!err) {
                                seq.updateNextSequence('userid')
                                    .then((counter) => {
                                        console.log('s: ' + counter)
                                    })
                                    .catch((err) => {
                                        console.log('e: ' + err.message)
                                    })

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
                                    field: 'username',
                                    message: 'Username is already exist'
                                })
                            }
                        })
                    } else {
                        res.status(200).json({
                            status: 'err',
                            message: 'db err'
                        })
                        return
                    }

                })
                .catch(err => {
                    res.status(200).json({
                        status: 'err',
                        message: 'db err'
                    })
                })
        } else {
            res.status(200).json({
                status: 'err',
                field: 'password',
                message: 'Incorrect password'
            })
        }
    })
})

module.exports = router