// const prisma = import('../prisma.js');
const prisma = require('../prisma');

const comment = {};

//create a new comment
comment.create = (req, res) => {

    const comment = {
        content: req.body.content,
        accountId: req.body.accountId,
        postId: req.body.postId,
        communityId: req.body.communityId
    }

    prisma.comment.create({ data: comment })
        .then(() => {
            res.send(true);
        })
        .catch(err => {
            res.send(err.message);
        })
}

// //display all posts
// comment.displayAll = (req,res) => {

//     db.Comment.findAll()
//     .then((data)=>{
//         res.send(data);
//     })
//     .catch(err=>{
//         res.status(400).send(err.message);
//     });
// }

//display all posts by specific user
comment.displayPostComments = (req, res) => {
    prisma.comment.findMany({ where: { postId: Number(req.params.postId) } })
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send(err.message);
        });
}

//count comment
comment.Count = async (req, res) => {
    const id = Number(req.params.id);

    const count = await prisma.comment.count({
        where: {
            postId: id,
        }
    })
    console.log(count);
    if(count){
        res.sendStatus(count);
    }
    else{
        res.sendStatus(0);
    }

}

    //display a comment
    comment.displayComment = async (req, res) => {
        await prisma.comment.findUnique({ where: { id: Number(req.params.id) } })
            .then((data) => {
                res.send(JSON.stringify(data));
            })
            .catch(err => {
                res.status(400).send(err.message);
            });
    }

    //edit created comment
    comment.edit = (req, res) => {

    }

    //delete a comment
    comment.deleteComment = async (req, res) => {
        const comment = await prisma.comment.findUnique({ where: { id: req.params.id } });
        await comment.destroy()
            .then(() => {
                res.send(`comment has been deleted`);
            })
            .catch(err => {
                res.status(500).send(err.message);
            });

    }

    module.exports = comment;