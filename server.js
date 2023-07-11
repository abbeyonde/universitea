const express = require('express');
const cors = require('cors');

require('dotenv').config();

const path = __dirname+'/views/';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//connect database
const db = require('./app/models');

//sync database
db.sequelize.sync({force:true}).then(()=>{
    console.log('All models are sync-ed');
});

app.get('/',(req,res)=>{res.send('Hello World!')})
//use and import UI from /views

//GET html file from /views

//import all router and pass app as parameter
require('./app/routes/account.route')(app);
require('./app/routes/post.route')(app);

//listen to PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log('listening on PORT:'+PORT);
});