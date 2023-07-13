module.exports = app => {
    const comments = require('../controllers/comment.controller');
    var router = require('express').Router();

    router.post('/new', comments.create);
    router.get('/:postId/all-comments', comments.displayPostComments);
    router.get('/:id', comments.displayComment);
    router.delete('/:id', comments.deleteComment);

    app.use('/api/comment', router);
}