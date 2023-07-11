const db= require('../models');

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
        res.send(data);
    })
    .catch(err=>{
        res.status(400).send(err.message);
    });
}

//display all posts by specific user
post.displayUser = async (req,res) => {
    const user = await db.Account.findOne({where: {username: req.params.username}});
    db.Post.findAll({where:{accountId: user.id}})
    .then((data)=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(400).send(err.message);
    });
}

//edit created post
post.edit = (req,res) => {

}

//delete a post
post.delete = (req,res) => {

}

module.exports = post;