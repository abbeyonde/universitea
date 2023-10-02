const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
// import { express } from 'express';
require('dotenv').config();

const path = __dirname + '/app/views/';
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//connect database


//use and import UI from /views
app.use(express.static(path));

//import all router and pass app as parameter
require('./app/routes/account.route')(app);
require('./app/routes/post.route')(app);
require('./app/routes/comment.route')(app);
require('./app/routes/vote.route')(app);

//GET html file from /views
app.get('/*', (req, res) => {
    res.sendFile(path + 'index.html');
});


//create http server using app(express)
const server = http.createServer(app);

//create io socket from http server
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
})

io.on('connection', (socket) => {
    // console.log(`user id is ${socket.id}`);

    socket.on('new_post', () => {
        console.log('new_post');
        socket.broadcast.emit('new_post_uploaded');
    });
    socket.on('new_comment', () => {
        socket.broadcast.emit('new_comment_add')
    });

    // setInterval(() => {
    //     socket.emit('new_post_uploaded')
    // }, 60000);
    // setInterval(() => {
    //     socket.emit('new_comment_add')
    // }, 60000);
    setInterval(() => {
        socket.emit('update_vote_count',)
    }, 30000);
})



//listen to PORT
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log('listening on PORT:' + PORT);
});