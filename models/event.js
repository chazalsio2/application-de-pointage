const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');


const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator:[ 
        {
            type: mongoose.Types.ObjectId,
            ref:'Users'
        }
    ]

},
{
    timestamp:true,
    collection:"events"
});

module.exports = mongoose.model('Event', eventSchema)