module.exports = app => {
    const posts = require('../controllers/post.controller');
    var router = require('express').Router();

    router.post('/new', posts.create);
    router.get('/all', posts.displayAll);
    router.get('/:username', posts.displayUser);

    app.use('/post', router);
}