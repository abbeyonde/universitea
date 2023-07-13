module.exports = app => {
    const comments = require('../controllers/comment.controller');
    var router = require('express').Router();

    app.use((req,res,next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'Authorization, Origin, Content-Type, Accept'
        );
        next();
    });

    router.post('/new',[auth.authenticateToken], comments.create);
    router.get('/:postId/all-comments',[auth.authenticateToken], comments.displayPostComments);
    router.get('/:id',[auth.authenticateToken], comments.displayComment);
    router.delete('/:id',[auth.authenticateToken], comments.deleteComment);

    app.use('/api/comment', router);
}