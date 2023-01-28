const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth =  false;
        return next();
    }
    const token = authHeader.split(' ')[1];
    if (!token|| token==='') {
        req.isAuth = false;
        return next();
    }
    let tokenDecoded
    try{
        tokenDecoded = jwt.verify(token,'somesuperscretkey');
    }catch (err){
        req.isAuth = false;
        return next();
    }
    if (!tokenDecoded) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = tokenDecoded.userId;
    return next();
}