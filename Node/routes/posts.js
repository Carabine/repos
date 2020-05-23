const express = require('express')
const router = express.Router()
const auth = require('./../middleware/auth')

const User = require('./../models/User')
const Post = require('./../models/Post')

router.post('/', auth, (req, res) => { // add post
    if (!req.body.postBody) {
        return res.status(200).json({
            status: 'err',
            message: 'post is empty'
        })
    }

    User.findById(req._id)
        .then((user) => {
            const post = new Post({
                author: req._id,
                postBody: req.body.postBody
            })

            user.posts.push(post)
            user.save(err => {
                if(!err) {
                    post.save(err => {
                        if (!err) {
                            res.status(200).json({
                                status: 'success',
                                data: {
                                    post
                                }
                            })
                        } else {
                            res.status(200).json({
                                status: 'err',
                                message: 'saving post error'
                            })
                        }
                    })
                } else {
                    res.status(200).json({
                        status: 'err',
                        message: 'saving user error'
                    })
                }
            })
        })
        .catch((err) => {
            res.status(200).json({
                status: 'err',
                message: "can't find this user"
            })
        })
})

router.delete('/', auth, (req, res) => { //delete post
    const postId = req.query.postId

    Post.findById(postId).populate('author')
        .then(post => {
            if(post.author._id == req._id) {
                Post.findOneAndRemove({_id: postId})
                    .then(() => {
                        User.findOneAndUpdate({_id: post.author._id}, {$pull: {posts:  postId}})
                            .then(user => {
                                res.json({
                                    status: 'success'
                                })
                            })
                            .catch(err => {
                                res.json({
                                    status: 'err',
                                    message: 'cant update user',
                                    err
                                })
                            })
                    })
                    .catch(err => {
                        res.json({
                            status: 'err',
                            message: 'cant delete post',
                            err
                        })
                    })
            } else {
                res.json({
                    status: 'err',
                    message: 'auth err'
                })
            }
        })
        .catch(err => {
            res.json({
                status: 'err',
                message: 'cant find post',
                err
            })
        })
})

module.exports = router