const auth = require('../controllers/auth');

module.exports = app => {
    const vote = require('../controllers/vote.controller');
    var router = require('express').Router();

    //to import required header from client side
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );
        next();
    });

    router.post('/log', [auth.authenticateToken], vote.create);
    router.get('/check/:postId/:accountId', [auth.authenticateToken], vote.checkLog);
    router.delete('/delete/:postId/:accountId', [auth.authenticateToken], vote.delLog);
    app.use('/api/vote', router);
}