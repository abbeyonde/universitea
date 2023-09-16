const express = require('express');
const cors = require('cors');

require('dotenv').config();

const path = __dirname+'/app/views/';
const app = express();

var corsOptions ={
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//connect database
const db = require('./app/models');

//sync database
db.sequelize.sync().then(()=>{
    console.log('All models are sync-ed');
});

//use and import UI from /views
app.use(express.static(path));

//import all router and pass app as parameter
require('./app/routes/account.route')(app);
require('./app/routes/post.route')(app);
require('./app/routes/comment.route')(app);

//GET html file from /views
app.get('/*', (req,res)=>{
    res.sendFile(path+'index.html');
});

//listen to PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log('listening on PORT:'+PORT);
});