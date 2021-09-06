// Set up express
const express = require('express')
const hbs = require('hbs')
const wax = require ('wax-on')

let app = express()
app.set('view engine','hbs')


// define static images in images folder
app.use(express.static('images'))
// set up wax on 
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')


// ROUTES
app.get('/', function(req,res){
    res.send("<h1>Homebakers Unite!</h1>");
})

app.get('/create',function(req,res){
    res.render('create.hbs')
})




app.get('/view/:item', function(req,res){
    let item = req.params.item;
    res.send("<h1>Hi, " + item+ "! </h1>");
})

// START SERVER
app.listen(3000, ()=>{
    console.log("Server started")
})





