const prisma = require('../prisma');
// const prisma = import('../prisma.js');

const vote = {};

vote.create = (req, res) => {
    const user = req.body.accountId;
    const post = req.body.postId;

    const vote = {
        accountId: user,
        postId: post
    }
    prisma.postVotes.create({ data: vote })
        .then(() => {
            res.send('voted');
        })
        .catch(err => {
            res.send(err.message);
        })
}
vote.checkLog = async (req, res) => {
    const accountId = Number(req.params.accountId);
    const postId = Number(req.params.postId);

    const voteExist = await prisma.postVotes.findFirst({
        where: {
            AND: [
                { accountId: accountId },
                { postId: postId }
            ]
        }
    })
    // .then(() => {
    //     res.send(true)
    // })
    // .catch(() => {
    //     res.send(false)
    // })
    if (voteExist) {
        res.send(true);
    }
    else {
        res.send(false);
    }
}

vote.delLog = async (req, res) => {
    const vote = await prisma.postVotes.findFirst({
        where: {
            AND: [
                { accountId: Number(req.params.accountId) },
                { postId: Number(req.params.postId) }
            ]
        }
    }
    )
    prisma.postVotes.delete({
        where: { id: vote.id}
    })
        .then(() => {
            res.send('log deleted');
        })
        .catch(err => {
            res.status(500).send(err.message);
        })
}

module.exports = vote;

