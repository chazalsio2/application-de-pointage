const bcrypt = require('bcryptjs')

const Event = require('../../models/event')
const Users = require('../../models/users')

const {dateToSrting} = require('../../helpers/date')
const {transformeEvent} = require('./merge')


module.exports = {
    events:async (args,req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated')
        }
        try{
        const event = await Event.find().populate('creator').lean();
        if (event) {
            return event.map(event => {
                return transformeEvent(event);
            });
        }else{
            return []
        }
    }catch (err){
        throw err
    }
    },
    createEvent: async (args,req) => {
        // if (!req.isAuth) {
        //     throw new Error('Unauthenticated')
        // }
        
        try {
            console.log(args.eventIput.title);
        const event = await new Event({
            title:args.eventIput.title,
            score: args.eventIput.score,
            date: new Date().toISOString(),
            creator:req.userId
        })

        await event.save()
        .catch((err) => { console.log(err);});

        const user = await Users.findById({_id:req.userId}).lean();
        if (!user) {
            throw new Error('utilisateur inexistant')
        }else{
            await Users.updateOne({_id:req.userId},{
                $addToSet:{creatEvents:event._id}
            })
           
        }
         event.date = dateToSrting(event.date);
        return event;
        }catch (err){
            throw err
        }
    }
    
}