const express = require("express");
const fs = require("fs");
const path= require("path");
const bodyparser= require("body-parser");
const app = express();
const port= 8000;

//MONGOOSE CONNECTION SETUP
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name:  String, 
    phone: String,
    email: String,
    address: String,
    desc: String
});
const Contact = mongoose.model('Contact', contactSchema);


app.use('/static', express.static('static'))


app.use(express.urlencoded())


app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res)=>{
    const params ={}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req,res)=>{
    const params ={}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})
   // res.status(200).render('contact.pug');




app.listen(port,()=>{
    console.log(`The application successfully started on ${port}`);
});