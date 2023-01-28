const bcrypt = require('bcryptjs')

const Event = require('../../models/event')

const {dateToSrting} = require('../../helpers/date')
const {transformeEvent} = require('./merge')


module.exports = {
    events:async  () => {
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
    createEvent: async (args) => {
        try {
        const event = await new Event({
            score: args.eventIput.score,
            date: new Date().toISOString(),
            creator:'63cba25a8d05fc96c3a30819'
        })

        await event.save()
        .catch((err) => { console.log(err);});

        const user = await Users.findById({_id:'63cba25a8d05fc96c3a30819'}).lean();
        if (!user) {
            throw new Error('utilisateur inexistant')
        }else{
            await Users.updateOne({_id:'63cba25a8d05fc96c3a30819'},{
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