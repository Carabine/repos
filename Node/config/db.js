const mongoose = require('mongoose')

const Connect_DB = () => {
    mongoose.connect('mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@cluster0-1u0ax.mongodb.net/test?retryWrites=true&w=majority',  {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, (err, client) => {
        if(!err) {
            console.log('Connecting to db is finished')
        } else {
            console.log('Connecting to db error')
            console.log(err)

        }
    })
}

module.exports = Connect_DB