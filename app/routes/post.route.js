const post = require('../controllers/post.controller');

module.exports = app => {
    const posts = require('../controllers/post.controller');
    var router = require('express').Router();

    router.post('/new', posts.create);
    router.get('/all', posts.displayAll);
    router.get('/:username', posts.displayUser);
    router.get('/:id', posts.displayPost);
    router.delete('/:id', posts.deletePost);

    app.use('/post', router);
}