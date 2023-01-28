const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Users = require('../../models/users')

module.exports = {
    users: () => {
        try {
        const user = Users.find();
        if (user) {
            return user;
        }else{
            return []
        }
        }catch (err){
            throw err
        }
    },
    createUser : async (args) => {
        try {
        const arguser = args.userInput;
        const checkEmail = await Users.findOne({email: arguser.email}).lean();
        if (checkEmail){
            throw new Error('utilisateur déja existent')
        }
        const hashPaswword = await  bcrypt.hash(args.userInput.password,12)
            const user = await new Users({
                email:arguser.email,
                password:hashPaswword,
                code:(Math.random() + 1).toString(36).substring(8),
                firstName:arguser.firstName,
                lastName:arguser.lastName,
                role:arguser.role
            })

            const result = await user.save();  

            return {...result.doc,
                _id: result.id,
                 email:result.email,
                 password:null,
                 firstName:result.firstName,
                 code:result.code,
                 lastName:result.lastName,
                 role:result.role };
       
            }catch (err){
                throw err
        } 
    },
    login:async({email, password})=>{
        const user = await Users.findOne({ email: email});
        
        const validPassword = await bcrypt.compare(password,user.password);

        if (!user||!validPassword) {
            throw new Error('email ou mot de passe incorrecte veuillez réessayer') 
         }
        const token = jwt.sign({userId:user._id, email:user.email},'somesuperscretkey',{
            expiresIn:'5h'
        });
        return {userId:user._id,token:token, tokenExpiration:5}
    }
    
};