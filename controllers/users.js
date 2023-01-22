import Users from '../models/users';

export async function createUser(req, res, next) {
    try{
    const {email,role,lastName,firstName,password} = req.body;
    const hash = await bcrypt.hash(password,12);
    const user = await new Users({
        email,
        password:hash,
        code:strRandom({length:5}),
        firstName,
        lastName,
        role
    }).save();
    return res.json({ success: true, data: user });
} catch (err) {
    new Error(err.message)
}}

export async function UdateUser(req, res, next) {
try{
    const {userId} = req.params;
    const {email,role,lastName,firstName} = req.body;
    const user = await  Users.updateOne({_id:userId},{
        email,
        firstName,
        lastName,
        role
    }).save();
    return res.json({ success: true, data: user });
} catch (err) {
    new Error(err.message)
}}


export async function DeleteUser(req, res, next) {
try{
    const {userId} = req.params;
    const users = await Users.findById(userId).lean();
    
    if (!users) {
        throw new Error("utilisateur introuvable", 404)
    }
    
    await  Users.deleteOne({_id:userId}).exec();
    return res.json({ success: true });
} catch (err) {
    new Error(err.message)
}}

export async function getUser(req, res, next) {
    try{
        const user = await  Users.find().lean();
        return res.json({ success: true,data: user});
    } catch (err) {
        new Error(err.message)
    }}
