const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');


const bookingSchema = mongoose.Schema({
    event:{
        type:mongoose.Types.ObjectId,
        ref:'Event'
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},
{
    timestamps: true,
    collection:"booking"
})

module.exports = mongoose.model('Booking', bookingSchema);