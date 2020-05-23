const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const header = req.headers['authorization'];
    console.log(header)
    if(header) {
        const bearer = header.split(' ');
        const token = bearer[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(!err) {
                req._id = decoded._id
                req.token = token
                req.id = decoded.id
                next()
            } else {
                res.json({
                    status: 'err',
                    message: 'token is invalid'
                })
            }
        })

    } else {
        res.json({
            status: 'err',
            message: 'token is empty'
        })
    }
}

module.exports = auth