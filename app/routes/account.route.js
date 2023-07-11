module.exports = app => {
    const accounts = require('../controllers/account.controller');
    var router = require('express').Router();

    router.post('/signup', accounts.create);
    router.post('/login', accounts.login);

    app.use('/account', router);
}