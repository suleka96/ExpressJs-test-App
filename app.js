var express = require('express');
var bodyParser = require('body-parser');
var path = require ('path');
var expressValidator =require('express-validator');
var mongojs = require('mongojs')
var db = mongojs('customerApp', ['users'])
var ObjectId = mongojs.ObjectId;
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

//global Variables
app.use(function(req,res,next){
    res.locals.errors =null;
    next();
});

//Express Validator Middleware (to be put)





//json string
var people =[
    {
    name: 'sul',
    age: 30
    },
    {
        name: 'jil',
        age: 40
    },
    {
        name: 'max',
        age: 39
    }

]

//route handler
// app.get('/',function(req,res){
//     res.json(person);
// });

//route handler - rendering view engine views
app.get('/',function(req,res){

    db.users.find(function (err, docs) {
        // docs is an array of all the documents in mycollection
       // console.log(users);
        res.render('index',{
            title:'customer',
            users : docs
        });
    })

    var title ='customer';
    
});

app.post('/users/add',function(req,res){
    console.log("form submitted");

    // setting express validation rules of epress-validator
    // request.checkBody('name','Name is Required').notEmpty;
    // request.checkBody('age','Age is Required').notEmpty;

    // var errors = req.validationErrors();

    // if(errors){
    //     res.render('index',{
    //         title:'customer',
    //         users : people,
    //         error: errors
    //     });
    // }
    // else{
        var newUser= {
            name: req.body.name,
            age: req.body.age
        }
        console.log("Done");
        db.users.insert(newUser, function(err,req){
            if(err){
                console.log("error");
            }
            else{
                res.redirect('/');
            }
        })

    // }

    
});

app.delete('/users/delete/:id', function(req,res){
    db.users.remove({_id: ObjectId(req.params.id)},function(error){
        if(error){
            console.log(error);
        }
        else{
            res.redirect('/');
        }
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