const Event = require('../../models/event')
const Bookings = require('../../models/booking')

const {dateToSrting} = require('../../helpers/date')
const {transformBooking,transformeEvent} = require('./merge')

    
module.exports = {
    bookings: async () => {
        try{
            const bookings = await Bookings.find().lean();
            return bookings.map(booking =>{
                return transformBooking(booking)
            })
        }catch(err){
            throw err
        }
    },
    bookEvent: async args => {
        try {
            const event = await Event.findOne({_id:args.eventId }).exec();
            const booking = new Bookings({
                user: "63cba25a8d05fc96c3a30819",
                event:event
            })
            const result = await booking.save();
            console.log(result.user);
            return {
                ...result._id,
                _id:result._id,
                user:user(result.user),
                createdAt:dateToSrting(booking.createdAt),
                updatedAt:dateToSrting(booking.updatedAt)
            }
        }catch(err){
            throw err;
        }
    },
    cancelBooking:async args =>{
        try{
            const booking = await Bookings.findById(args.bookingId).populate('event').lean();
            const event= transformeEvent(booking.event)
            await Bookings.deleteOne({_id:args.bookingId});
            return event;
        }catch(err){
            throw err;
        }
    }
    
}