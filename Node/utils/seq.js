const Counter = require('./../models/Counter')

const getNextSequence = (name) => {
    return Counter.findOne({id: name}, (err, counter) => {
        console.log(counter)
        if(err) {
            res.status(200).json({
                status: 'err',
                message: 'db err'
            })
            return undefined
        }
        return counter
    })
}

const updateNextSequence = name => {
    return Counter.findOneAndUpdate(
        {id: name},
        {$inc: {seq: 1}},
        {new: true, upsert: true, useFindAndModify: false},
    )
}

module.exports.getNextSequence = getNextSequence
module.exports.updateNextSequence = updateNextSequence