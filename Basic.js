

const express= require('express');
const app=express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());


// app.get('/',function(req,res){
//     res.send("Hello hi how are you?");
// });



// app.get('/menu',function(req,res){
//     res.send('hello welcome to our cafe');
// })
const menuItemsRoutes = require('./routes/menuItemsRoutes');
app.use('/menu',menuItemsRoutes);
const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

app.listen(3000);