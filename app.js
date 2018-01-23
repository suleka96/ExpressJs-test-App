var express = require('express');
var bodyParser = require('body-parser');
var path = require ('path');

var app = express();

//middleware should always come before the route handlers
//middleware
// var logger = function (req, res, next){
//     console.log("logging");
//     next();
// }
// app.use(logger);

//view Engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));


//Body Parser Middleware
app.use(bodyParser.json());//to handel parsing jason
app.use(bodyParser.urlencoded({extended:false}))

//set static path
app.use(express.static(path.join(__dirname,'public')))

//json string
var person ={
    name: 'sul',
    age: 30
}

//route handler
// app.get('/',function(req,res){
//     res.json(person);
// });

//route handler - rendering view engine views
app.get('/',function(req,res){
    res.render('index',{
        
    });
});

//route handler
// app.get('/',function(req,res){
//     res.json('hello');
// });

app.listen(3000, function(){
    console.log('Server started on port 3000...');
})

//template engines ejs (embedded javascript)