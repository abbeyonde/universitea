module.exports = app => {
    const accounts = require('../controllers/account.controller');
    var router = require('express').Router();

    app.use((req,res,next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );
        next();
    });

    router.post('/sign-up', accounts.create);
    router.post('/sign-in', accounts.login);

    app.use('/account', router);
}