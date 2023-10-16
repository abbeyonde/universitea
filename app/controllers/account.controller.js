const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const prisma = require('../prisma');
// const {PrismaClient} = require('@prisma/client');
// const prisma = new PrismaClient();

const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

var transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'universitea.cc@gmail.com',
            pass: 'bwox ruud gfcs zbsi'
        }
    }
)

const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./app/views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./app/views/'),
};

transporter.use('compile', hbs(handlebarOptions));


const checkAccount = async (username) => {
    const user = prisma.account.findUnique({ where: { username: username } });
    if (typeof user != 'undefined') {
        return false;
    }
    return true;
}

const account = {};

//create new account
account.create = async (req, res) => {
    // const community = db.Community.findOne({ where: { name: req.body.community } });
    const hashed_password = await bcrypt.hash(req.body.password, saltRounds);

    const userExist = await checkAccount(req.body.username);

    if (userExist) {
        res.status(400).send('Username already exist');
    }
    else {
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashed_password,
            // community: community.id
            communityId: 1
        }
        const verifyToken = generateVerifyToken(user.username);
        const link = `https://universitea.onrender.com/verify/${user.username}/${verifyToken}`
        const mailOptions = {
            from: '"UniversiTea" <universitea.cc@gmail.com',
            template: "email.handlebars",
            to: user.email,
            subject: `Welcome to UniversiTea, ${user.username}`,
            context: {
                username: user.username,
                link: link,
            },
        };

        prisma.account.create({ data: user })
            .then(async (data) => {
                try {
                    await transporter.sendMail(mailOptions);
                    res.send(true);
                } catch (err) {
                    console.log('error sending email', err);
                }
            })
            .catch(err => {
                res.status(500).send('Username already exist');
            });
    }
}

account.resendVerify = async (req,res) => {
    const user = await prisma.account.findUnique({where: { username: req.params.username}});
    if(user){
        const verifyToken = generateVerifyToken(user.username);
        const link = `https://universitea.onrender.com/verify/${user.username}/${verifyToken}`
        const mailOptions = {
            from: '"UniversiTea" <universitea.cc@gmail.com',
            template: "email.handlebars",
            to: user.email,
            subject: `Welcome to UniversiTea, ${user.username}`,
            context: {
                username: user.username,
                link: link,
            },
        };
        try {
            await transporter.sendMail(mailOptions);
            res.send(true);
        } catch (err) {
            console.log('error sending email', err);
            res.status(500).send('Error sending email');
        }
    }
    else{
        res.status(400).send('Cannot find any associated account to your username');
    }
}

account.verify = async (req, res) => {
    const user = await prisma.account.findUnique({ where: { username: req.params.username } })
    prisma.account.update({
        where: {
            id: Number(user.id)
        },
        data: {
            verified: true
        }
    })
        .then((data) => {
            res.send(data);
        })
        .catch(err => {
            console.log(err.message);
        })
}

//login to an account
account.login = async (req, res) => {
    const user = await prisma.account.findUnique({ where: { username: req.body.username } });

    if (user) {
        bcrypt.compare(req.body.password, user.password)
            .then(match => {
                if (match && user.verified) {
                    const token = generateAccessToken(user.username);
                    const userDB = {
                        id: user.id,
                        username: user.username,
                        communityId: user.communityId
                    }
                    const data = {
                        user: userDB,
                        accessToken: token
                    };
                    res.send(data);
                }
                else if (!match) {
                    res.status(400).send('Your password is wrong');
                }
                else {
                    res.status(400).send('You haven\'t verified your email');
                }
            })
            .catch(err => {
                res.status(500).send(err.message);
            })
    }
    else {
        res.status(404).send('We cannot find any account with that username');
    }

}

//get account profile
account.getProfile = async (req, res) => {
    const username = req.params.username;

    await prisma.account.findUnique({ where: { username: username } })
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(404).send(err.message);
        });

}

//update account
account.update = async (req, res) => {
    await prisma.account.findUnique({ where: { id: Number(req.params.id) } })
        .then(user => {
            const token = generateAccessToken(user.username);
            const userDB = {
                id: user.id,
                username: user.username,
                communityId: user.communityId
            }
            const data = {
                user: userDB,
                accessToken: token
            };
            res.send(data);
        })
}
//change username
account.changeUsername = async (req, res) => {
    const username = req.body.username
    const id = req.params.id
    await prisma.account.update({
        where: {
            id: Number(id)
        },
        data: {
            username: username
        }
    }
    )
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(err.message);
        })
}
//change password

account.changePassword = async (req, res) => {
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    const id = req.body.id;

    const user = await prisma.account.findUnique({ where: { id: Number(id) } })
    if (user) {
        bcrypt.compare(password, user.password)
            .then(async match => {
                if (match) {
                    console.log('password match');
                    const hashed_password = await bcrypt.hash(newPassword, saltRounds);
                    prisma.account.update({
                        where: {
                            id: Number(id)
                        }
                        ,
                        data: {
                            password: hashed_password
                        }

                    })
                        .then(data => {
                            console.log(data);
                            res.send(true);
                        })
                }
                else {
                    console.log('password not match');
                    res.status(400).send(false);
                }
            })
    }
    else {
        res.status(500).send(err.message);
    };
}

//delete account

//generate access token
function generateAccessToken(username) {
    return jwt.sign({ username: username }, process.env.TOKEN_SECRET, { algorithm: 'HS256' });
}
function generateVerifyToken(username) {
    return jwt.sign({ username: username }, process.env.TOKEN_SECRET_VERIFY, { expiresIn: '2m', algorithm: 'HS256' });
}

module.exports = account;