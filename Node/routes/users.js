const express = require('express')
const router = express.Router()
const auth = require('./../middleware/auth')

const User = require('./../models/User')


router.get('/', auth, (req, res) => { // get all users
    const page = Number(req.query.page) === 0 ? 1 : Number(req.query.page)
    const count = Number(req.query.count)

    User.find().limit(count).skip(((page - 1) * count ))
        .then((users) => {
            User.count()
                .then(count => {
                    const currentUsers = users.map(({id, username}) => ({id, username}))
                    console.log(currentUsers)
                    res.json({
                        status: 'success',
                        data: {users: currentUsers, count}
                    })
                })
                .catch(err => {
                    res.json({
                        status: 'err',
                        err
                    })
                })
        })
        .catch(err => {
            res.json({
                status: 'err',
                err
            })
        })
})


module.exports = router