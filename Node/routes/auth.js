const express = require('express')
const router = express.Router()
const auth = require('./../middleware/auth')

const User = require('./../models/User')

router.get('/', auth, (req, res) => {
    User.findById(req._id)
        .then((user) => {
            res.json({
                status: 'success'
            })
        })
        .catch((err) => {
            res.status(200).json({
                status: 'err',
                message: "can't find this user"
            })
        })
})

module.exports = router