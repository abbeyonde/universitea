const db= require('../models');
const auth = require('./auth');
const jwt = require('jsonwebtoken');

const post = {};

//create a new post
post.create = (req,res) => {

    const post = {
        content: req.body.content,
        accountId: req.body.accountId,
        communityId: req.body.communityId
    }

    db.Post.create(post)
    .then(()=>{
        res.send('Post uploaded');
    })
    .catch(err => {
        res.send(err.message);
    })

}

//display all posts
post.displayAll = (req,res) => {

    db.Post.findAll()
    .then((data)=>{
        // console.log(data.length);
        res.send(data);
    })
    .catch(err=>{
        res.status(400).send(err.message);
    });
}

//display all posts by specific user
post.displayUser = async (req,res) => {
    const user = await db.Account.findOne({where: {username: req.params.username}});
    await db.Post.findAll({where:{accountId: user.id}})
    .then((data)=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(400).send(err.message);
    });
}

//display a post
post.displayPost = async (req,res) => {
    await db.Post.findByPk(req.params.id)
    .then((data)=>{
        res.send(JSON.stringify(data));
    })
    .catch(err=>{
        res.status(400).send(err.message);
    });
}

//edit created post
post.edit = (req,res) => {

}

post.upVote = async (req,res) => {
    const id = req.params.id;
    const value = req.body.value;
    const post = await db.Post.findByPk(id)
    console.log(post.upvote);
    const upvote = post.upvote;

    const newUpvote = upvote+value;
    db.Post.update({upvote: newUpvote}, {where: {id: id}})
    .then((data)=>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.send(err.message);
    })
}

post.downVote = async (req,res) => {
    const id = req.params.id;
    const post = await db.Post.findByPk(id)
    console.log(post.downvote);
    const downvote = post.downvote;

    const newDownvote = downvote+1;
    db.Post.update({downvote: newDownvote}, {where: {id: id}})
    .then((data)=>{
        console.log(data);
        res.send(data);
    })
    .catch(err => {
        console.log(err.message);
        res.send(err.message);
    })

}

//delete a post
post.deletePost = async (req,res) => {
    const post = await db.Post.findOne({where:{id: req.params.id}});
    await post.destroy()
    .then(()=> {
        res.send(`post has been deleted`);
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
    
}

module.exports = post;