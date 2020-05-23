const express = require('express')
const router = express.Router()
const auth = require('./../middleware/auth')

const User = require('./../models/User')

router.get('/', auth, (req, res) => { // get owner data

    User.findOne({ id: req.id }).populate('posts')
        .then(user => {
            user.posts.reverse()
            const currentPosts = user.posts.map(({_id, postBody}) => ({_id, postBody}))

            res.json({
                status: 'success',
                data: {
                    username: user.username,
                    role: 'Owner',
                    posts: currentPosts,
                    status: user.status
                }
            })
        })
        .catch(err => {
            res.json({
                status: 'err',
                message: 'cant find user',
                err
            })
        })
})

router.get('/:id', auth, (req, res) => { // get user data
    console.log('id')
    console.log(req.params.id)
    User.findOne({ id: req.params.id }).populate('posts')
        .then(user => {
            user.posts.reverse()

            const role = req.id === user.id ? 'Owner' : 'User'
            const currentPosts = user.posts.map(({_id, postBody}) => ({_id, postBody}))

            res.json({
                status: 'success',
                data: {
                    username: user.username,
                    posts: currentPosts,
                    role: role,
                    status: user.status
                }

            })
        })
        .catch(err => {
            res.json({
                status: 'err',
                message: 'cant find user??',
                err
            })
        })
})

router.put('/status', auth, (req, res) => { //change own status
    if(req.body.status === '') {
        req.body.status = undefined
    }
    console.log(req.query.status)
    User.findOneAndUpdate({id: req.id}, {status: req.body.status})
        .then(() => {
            res.json({
                status: 'success'
            })
        })
        .catch((err) => {
            res.json({
                status: 'err',
                err
            })
        })
})

module.exports = router