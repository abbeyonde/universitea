const jwt = require('jsonwebtoken');

const auth = {};

auth.authenticateToken = (req,res,next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err,user) => {
        if(err) res.sendStatus(403);

        req.user = user;
        next();
    });
    
}

auth.authenticateExternalToken = (req,res,next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET_VERIFY, (err,user) => {
        if(err) res.sendStatus(403);

        req.user = user;
        next();
    });
}

module.exports = auth;