const db= require('../models');

const comment = {};

//create a new comment
comment.create = (req,res) => {

    const comment = {
        content: req.body.content,
        accountId: req.body.accountId,
        communityId: req.body.communityId
    }

    db.Comment.create(comment)
    .then(()=>{
        res.send('Comment uploaded');
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
comment.displayPostComments = async (req,res) => {
    await db.Comment.findAll({where:{postId: req.params.postId}})
    .then((data)=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(400).send(err.message);
    });
}

//display a comment
comment.displayComment = async (req,res) => {
    await db.Comment.findByPk(req.params.id)
    .then((data)=>{
        res.send(JSON.stringify(data));
    })
    .catch(err=>{
        res.status(400).send(err.message);
    });
}

//edit created comment
comment.edit = (req,res) => {

}

//delete a comment
comment.deleteComment = async (req,res) => {
    const comment = await db.Comment.findOne({where:{id: req.params.id}});
    await comment.destroy()
    .then(()=> {
        res.send(`comment has been deleted`);
    })
    .catch(err => {
        res.status(500).send(err.message);
    });
    
}

module.exports = comment;