// const bcrypt = require('bcryptjs')

// const Event = require('../../models/event')
// const Users = require('../../models/users')
// const Bookings = require('../../models/booking')

// const {dateToSrting} = require('../../helpers/date')

// const transformeEvent = event => {
//     return{
//         ...event._doc,
//         _id: event._id,
//         date: event.date,
//         score: event.score,
//         creator: user.bind(this,event.creator)
//     };
// } 
// const transformBooking = booking => {
// return {...booking._id,
//     _id:booking._id,
//     user:user.bind(this,booking.user),
//     event:singleEvent.bind(this,booking.event),
//     createdAt:dateToSrting(booking.createdAt),
//     updatedAt:dateToSrting(booking.updatedAt)
// }
// }

// module.exports = {
//     events:async  () => {
//         try{
//         const event = await Event.find().populate('creator').lean();
//         if (event) {
//             return event.map(event => {
//                 return transformeEvent(event);
//             });
//         }else{
//             return []
//         }
//     }catch (err){
//         throw err
//     }
//     },
//     bookings: async () => {
//         try{
//             const bookings = await Bookings.find().lean();
//             return bookings.map(booking =>{
//                 return transformBooking(booking)
//             })
//         }catch(err){
//             throw err
//         }
//     },
//     users: () => {
//         try {
//         const user = Users.find();
//         if (user) {
//             return user;
//         }else{
//             return []
//         }
//         }catch (err){
//             throw err
//         }
//     },
//     createEvent: async (args) => {
//         try {
//         const event = await new Event({
//             score: args.eventIput.score,
//             date: new Date().toISOString(),
//             creator:'63cba25a8d05fc96c3a30819'
//         })

//         await event.save()
//         .catch((err) => { console.log(err);});

//         const user = await Users.findById({_id:'63cba25a8d05fc96c3a30819'}).lean();
//         if (!user) {
//             throw new Error('utilisateur inexistant')
//         }else{
//             await Users.updateOne({_id:'63cba25a8d05fc96c3a30819'},{
//                 $addToSet:{creatEvents:event._id}
//             })
           
//         }
//          event.date = dateToSrting(event.date);
//         return event;
//         }catch (err){
//             throw err
//         }
//     }, 
//     createUser : async (args) => {
//         try {
//         const arguser = args.userInput;
//         const checkEmail = await Users.findOne({email: arguser.email}).lean();
//         if (checkEmail){
//             throw new Error('utilisateur déja existent')
//         }
//         const hashPaswword = await  bcrypt.hash(args.userInput.password,12)
//             const user = await new Users({
//                 email:arguser.email,
//                 password:hashPaswword,
//                 code:(Math.random() + 1).toString(36).substring(8),
//                 firstName:arguser.firstName,
//                 lastName:arguser.lastName,
//                 role:arguser.role
//             })

//             const result = await user.save();  

//             return {...result.doc,
//                 _id: result.id,
//                  email:result.email,
//                  password:null,
//                  firstName:result.firstName,
//                  code:result.code,
//                  lastName:result.lastName,
//                  role:result.role };
       
//             }catch (err){
//                 throw err
//         } 
//     },
//     bookEvent: async args => {
//         try {
//             const event = await Event.findOne({_id:args.eventId }).exec();
//             const booking = new Bookings({
//                 user: "63cba25a8d05fc96c3a30819",
//                 event:event
//             })
//             const result = await booking.save();
//             console.log(result.user);
//             return {
//                 ...result._id,
//                 _id:result._id,
//                 user:user(result.user),
//                 createdAt:dateToSrting(booking.createdAt),
//                 updatedAt:dateToSrting(booking.updatedAt)
//             }
//         }catch(err){
//             throw err;
//         }
//     },
//     cancelBooking:async args =>{
//         try{
//             const booking = await Bookings.findById(args.bookingId).populate('event').lean();
//             const event= transformeEvent(booking.event)
//             await Bookings.deleteOne({_id:args.bookingId});
//             return event;
//         }catch(err){
//             throw err;
//         }
//     }
    
// }
const authResolver = require('./auth');
const eventsResolver = require('./event');
const bookingResolver = require('./booking');

const rootResolver = {
    ...authResolver,
    ...bookingResolver,
    ...eventsResolver
};

module.exports = rootResolver;