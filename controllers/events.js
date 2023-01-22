import Event from '../models/event';

export async function createEvent(req, res, next) {
    try{
    const {code} = req.body;
    const event = await new Event({
        code,
        dateStart: new Date().toISOString(),
    }).save();
    return res.json({ success: true, data: event });
} catch (err) {
    new Error(err.message)
}}

export async function UdateEvent(req, res, next) {
try{
    const {eventId} = req.params;

    const event = await  Event.updateOne({_id:eventId},{
        dateEnd: new Date().toISOString(),
    }).save();
    return res.json({ success: true, data: event });
} catch (err) {
    new Error(err.message)
}}


export async function DeleteEvent(req, res, next) {
try{
    const {eventId} = req.params;
    const event = await Event.findById(eventId).lean();
    
    if (!event) {
        throw new Error("utilisateur introuvable", 404)
    }
    
     await  Event.deleteOne({_id:eventId}).exec();
    return res.json({ success: true });
} catch (err) {
    new Error(err.message)
}}

export async function getEvent(req, res, next) {
    try{
        const event = await  Event.find().lean();
        return res.json({ success: true,data: event});
    } catch (err) {
        new Error(err.message)
    }}
