const Event = require('../../models/event')
const Users = require('../../models/users')
const Bookings = require('../../models/booking')
const {dateToSrting} = require('../../helpers/date')

const transformeEvent = event => {
    return{
        ...event._doc,
        _id: event._id,
        date: event.date,
        score: event.score,
        creator: user.bind(this,event.creator)
    };
} 
const transformBooking = booking => {
    return {...booking._id,
        _id:booking._id,
        user:user.bind(this,booking.user),
        event:singleEvent.bind(this,booking.event),
        createdAt:dateToSrting(booking.createdAt),
        updatedAt:dateToSrting(booking.updatedAt)
    }
    }
const events = async eventIds => {
    try{
    const event = await Event.find({_id:{$in: eventIds}}).lean();
    if (event) {
        return event.map(event => {
            return transformeEvent(event);
        });
         
    }else{
        return []
    }
} catch(err){
    throw err
}
}
const singleEvent= async eventId => {
    try{
        const event = await Event.findById(eventId).lean();
        return transformeEvent(event);
    }catch(err){
        throw err;
    }
}
const user = async userId => {
    try{
    const users = await Users.findById(userId).lean();
            if (users) {
                    return {
                        ...users._doc,
                        _id: users._id,
                        email: users.email,
                        creatEvents: events.bind(this,users.creatEvents)
                    };
            }else{
                return []
            }
        } catch(err){
            throw err
        }
    }
    
exports.transformBooking = transformBooking;
exports.transformeEvent = transformeEvent;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;

