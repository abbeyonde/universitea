const db = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const checkAccount = async (username) => {
    const user = db.User.findOne({ where: { username: username } });
    if (typeof user != 'undefined') {
        return false;
    }
    return true;
}

const account = {};

//create new account
account.create = async (req, res) => {
    const community = db.Community.findOne({ where: { name: req.body.community } });
    const hashed_password = await bcrypt.hash(req.body.password, saltRounds);

    const userExist = await checkAccount(req.body.username);

    if (userExist) {
        res.send(false);
    }
    else {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashed_password,
            // community: community.id
            communityId: 1
        }
        db.Account.create(user)
            .then((data) => {
                res.send(true);
            })
            .catch(err => {
                res.status(500).send(err.message);
            });
    }
}

//login to an account
account.login = async (req,res) => {
    const user = await db.Account.findOne({where: {username: req.body.username}});

    if(user){
        bcrypt.compare(req.body.password, user.password)
        .then( match => {
            if(match){
                const token = generateAccessToken(user.username);
                const data = {
                    username: user.username,
                    accessToken: token
                };
                res.send(data);
            }
            else{
                res.status(400).send('Password doesn\'t match');
            }
        })
        .catch(err => {
            res.status(500).send(err.message);
        })
    }
    else{
        res.status(404).send('User doesn\'t exist');   
    }
    
}

//get account profile

//update account
    //change username
    //change password

//delete account

//generate access token
function generateAccessToken(username){
    return jwt.sign({username: username}, process.env.TOKEN_SECRET,{expiresIn: '30m', algorithm: 'HS256'});
}

module.exports = account;