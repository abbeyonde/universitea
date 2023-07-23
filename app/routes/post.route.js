const auth = require('../controllers/auth');

module.exports = app => {
    const posts = require('../controllers/post.controller');
    var router = require('express').Router();

    //to import required header from client side
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );
        next();
    });

    router.post('/new',[auth.authenticateToken], posts.create);
    router.get('/all', [auth.authenticateToken], posts.displayAll);
    router.get('/user/:username', [auth.authenticateToken], posts.displayUser);
    router.get('/:id', [auth.authenticateToken], posts.displayPost);
    router.delete('/:id', [auth.authenticateToken], posts.deletePost);

    app.use('/api/post', router);
}