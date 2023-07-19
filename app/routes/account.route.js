module.exports = app => {
    const accounts = require('../controllers/account.controller');
    var router = require('express').Router();

    router.post('/sign-up', accounts.create);
    router.post('/sign-in', accounts.login);

    app.use('/account', router);
}