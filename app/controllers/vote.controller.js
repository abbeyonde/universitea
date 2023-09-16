const db = require('../models');

const vote = {};

vote.create = (req,res) => {
    const user = req.body.userId;
    const post = req.body.postId;

    vote = {
        accountId: user,
        postId: post
    }
    db.Post_Vote.create(vote)
    .then(()=>{
        res.send('voted');
    })
    .catch(err => {
        res.send(err.message);
    })
}

module.exports = vote;

