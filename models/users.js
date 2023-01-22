const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const usersSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    code: {
        type: Array,
        required: true
    },
    role: {
        type: Array,
        required: true
    },
    "role.$": {
        type: String,
    },
    creatEvents:[ 
    {
        type: mongoose.Types.ObjectId,
        ref:'Event'
    }
],
},
{
    timestamp:true,
    collection:"users"
});

module.exports = mongoose.model('Users', usersSchema)
