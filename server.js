const express = require('express');
const cors = require('cors');

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

//use and import UI from /views

//GET html file from /views

//import all router and pass app as parameter

//listen to PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log('listening on PORT:'+PORT);
});