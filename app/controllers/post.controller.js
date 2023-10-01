const prisma = require('../prisma');
const auth = require('./auth');
const jwt = require('jsonwebtoken');

const post = {};

//create a new post
post.create = (req, res) => {

    const post = {
        content: req.body.content,
        accountId: req.body.accountId,
        communityId: req.body.communityId
    }

    prisma.post.create({ data: post })
        .then(() => {
            res.send('Post uploaded');
        })
        .catch(err => {
            // res.send(err.message);
            console.log(err.message);
        })

}

//display all posts
post.displayAll = (req, res) => {

    prisma.post.findMany()
        .then((data) => {
            // console.log(data.length);
            res.send(data);
        })
        .catch(err => {
            res.status(400).send(err.message);
        });
}

//display all posts by specific user
post.displayUser = async (req, res) => {
    const username = req.params.username;
    const user = await prisma.account.findFirst({ where: { username: username } });
    await prisma.post.findMany({ where: { accountId: Number(user.id) } })
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send(err.message);
        });
}

//display a post
post.displayPost = async (req, res) => {
    await prisma.post.findUnique({ where: { id: Number(req.params.id) } })
        .then((data) => {
            res.send(JSON.stringify(data));
        })
        .catch(err => {
            res.status(400).send(err.message);
        });
}

//edit created post
post.edit = (req, res) => {

}

post.upVote = async (req, res) => {
    const id = Number(req.params.id);
    const value = req.body.value;
    const post = await prisma.post.findUnique({ where: { id: id } })
    const upvote = post.upvote;

    const newUpvote = upvote + value;
    prisma.post.update({ where: { id: id }, data: { upvote: newUpvote } })
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.send(err.message);
        })
}

post.downVote = async (req, res) => {
    const id = Number(req.params.id);
    const post = await prisma.post.findUnique({ where: { id: id } })
    console.log(post.downvote);
    const downvote = post.downvote;

    const newDownvote = downvote + 1;
    prisma.post.update({ data: { downvote: newDownvote } }, { where: { id: id } })
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
            res.send(err.message);
        })

}

//delete a post
post.deletePost = async (req, res) => {
    const post = await prisma.post.delete({ where: { id: Number(req.params.id) } })
        .then(() => {
            res.send(`post has been deleted`);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });

}

module.exports = post;