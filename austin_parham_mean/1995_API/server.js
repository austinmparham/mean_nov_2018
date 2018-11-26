var mongoose =require('mongoose');
// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/mongoose_dashboard');
var MongooseSchema = new mongoose.Schema({
 name: {type: String, required: true},
 favorite_food: String,
 age: Number,
 gender: String
})
mongoose.model('Mongoose', MongooseSchema); // We are setting this Schema in our Models as 'User'

mongoose.Promise = global.Promise;

var Mongoose = mongoose.model('Mongoose') // We are retrieving this Schema from our Models, named 'User'
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(__dirname + '/public/dist/public'));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
// *************************List of Mongeese****************************//
app.get('/mongeese', function(req, res) {
  Mongoose.find({}, function(err, mongeese){
    console.log("***********",mongeese);
    res.json();
  });
})
// **************************Form for new Mongoose***************************//
app.get('/new/:name', function(req,res){
  var mongoose = new Mongoose({name:req.params.name});
  mongoose.save(function(err){
    if(err) {
      console.log('something went wrong');
    } 
    else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      Mongoose.find({}, function(err,mongeese){
        res.json(mongeese);
      })
    }
  })
})
// ************************Create new Mongoose in server*****************************//
app.post('/new_mongoose', function(req, res) {
  console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body
  var mongoose = new Mongoose({name: req.body.name, favorite_food: req.body.favorite_food, age: req.body.age, gender: req.body.gender});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  mongoose.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a user!');
      res.json({data: mongoose,error: err});
    }
  })
})
// ***********************Mongoose Info******************************//
app.get('/:name', function(req, res) {
  console.log("*****ID Procured for Info******",req.params.id);
  Mongoose.findOne({name:req.params.name}, function(err, mongoose){
    res.json(mongoose);
  });
});

// ***********************Mongoose Edit******************************//
app.get('/mongeese/edit/:id', function(req,res){
  console.log("*****ID Procured for Edit******",req.params.id);
  Mongoose.findOne({_id:req.params.id}, function(err, mongoose){
    res.render('edit',{mongoose: mongoose});
  });
});

// ***********************Submit Edit Form******************************//
app.post('/mongeese/:id',function(req,res){
  console.log("*****ID Procured for Edit******",req.params.id);
  var mongoose = Mongoose.update({_id:req.params.id}, {name:req.body.name,age:req.body.age,gender:req.body.gender,favorite_food:req.body.favorite_food}, function(err){  
  });
    res.json({data: mongoose});

});

// ***********************Kill a Mongoose******************************//
app.get('/destroy/:name',function(req,res){
  console.log("*****ID Procured for Delete******",req.params.id);
  Mongoose.remove({name:req.params.name}, function(err){
    Mongoose.find({}, function(err, mongeese){
    console.log("***********",mongeese);
    res.json();
    });
  });
    res.json();
});
// ***********************Server Setting******************************//
// Setting our Server to Listen on Port: 8000
app.listen(8010, function() {
    console.log("listening on port 8010");
})