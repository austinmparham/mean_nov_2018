var mongoose =require('mongoose');

var validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3,50],
    message: 'Name should be at least 3 characters long.'
  })
];
var typeValidator = [
  validate({
    validator: 'isLength',
    arguments: [3,50],
    message: 'Type should be at least 3 characters long.'
  })
];

var descValidator = [
  validate({
    validator: 'isLength',
    arguments: [3,50],
    message: 'Description should be at least 3 characters long.'
  })
];
var cookieParser = require('cookie-parser')
var session = require('express-session')
// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

const flash = require('express-flash');
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

mongoose.connect('mongodb://localhost/pets');
var PetSchema = new mongoose.Schema({
 name: {type: String, required: true, validate: nameValidator},
 type: {type: String, required: true, validate: typeValidator},
 description: {type: String, required: true, validate: descValidator},
 skills: Array,
 likes: Number
})
mongoose.model('Pet', PetSchema); // We are setting this Schema in our Models as 'User'

mongoose.Promise = global.Promise;

var Pet = mongoose.model('Pet') // We are retrieving this Schema from our Models, named 'User'
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
// *************************List of Pets****************************//
app.get('/', function(req, res) {
  Pet.find({}).sort({type: 'asc'}).exec(function(err, pets){
    res.render('index', {pets: pets,} );
  });
});

// **************************Form for new Pets***************************//
app.get('/new', function(req,res){
  res.render('new_pet');
})

// ************************Create new Pet in server*****************************//
app.post('/new_pet', function(req, res) {
  var match = false;
  console.log("POST DATA", req.body);
  Pet.find({}, function(err,pets){
    console.log(pets);
    if(err){
      console.log('!!!!!!error in query!!!!!!!', err);
      res.redirect('/');
    } else{
        console.log(typeof pets);
        for(var pet of pets){
          console.log(pet.name);
          if(pet.name == req.body.name){
            match = true;
          }
        }
      }
  });
  
  // create a new User with the name and age corresponding to those from req.body
  if(match != true){
    var pet = new Pet({name: req.body.name, type: req.body.type, description: req.body.description, likes: 0});
    // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    pet.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('!!!!!!!something went wrong!!!!!!!', err);
        for(var key in err.errors){
          req.flash('length', err.errors[key].message);
        }
        res.redirect('/');
      } else {
        pet.skills = [req.body.skill_1,req.body.skill_2,req.body.skill_3]
        pet.save(function(err){
          if(err){
            console.log('error saving skills')
          } else {
            console.log('successfully added a pet!');
            res.redirect('/');
          }
        })
        
      }
    })
  } else{
    console.log("!!!!!Name already in database!!!!!");
    res.redirect('/')
  }
})

// ***********************Pet Info******************************//
app.get('/pets/:id', function(req, res) {
  console.log("*****ID Procured******",req.params.id);
  Pet.findOne({_id:req.params.id}, function(err, pet){
    res.render('pets',{pet: pet});
  });
});

// ***********************Adopt a Pet******************************//
app.get('/pets/destroy/:id',function(req,res){
  console.log("*****ID Procured******",req.params.id);
  Pet.remove({_id:req.params.id}, function(err){  
  });
    res.redirect('/');
});

// ***********************Pet Edit******************************//
app.get('/pets/:id/edit', function(req,res){
  console.log("*****ID Procured******",req.params.id);
  Pet.findOne({_id:req.params.id}, function(err, pet){
    res.render('edit',{pet: pet});
  });
});

// ***********************Submit Edit Form******************************//
app.post('/pets/:id',function(req,res){
  console.log("*****ID Procured******",req.params.id);
  Pet.findOne({_id:req.params.id}, function(err,pet){
    pet.name = req.body.name;
    pet.type = req.body.type;
    pet.description = req.body.description;
    pet.skills = [req.body.skill_1,req.body.skill_2,req.body.skill_3];
    pet.save(function(err){
      if(err){
        console.log('something went wrong with Edit');
        for(var key in err.errors){
        req.flash('length', err.errors[key].message);
        }
        res.redirect('/');
      } else{
        console.log('successfully made edit');
        res.redirect('/');
      } 
    })

  });

});

// ***********************Like a Pet******************************//
app.get('/pets/:id/like',function(req,res){
  console.log("*****ID Procured******",req.params.id);
  Pet.update({_id:req.params.id}, {$inc: {likes: 1}}, function(err){
    if(err){
      console.log('something went wrong with Edit');
    } else{
      console.log('successfully added a like')
      // res.redirect('/pets/'+req.params.id)
    } 
  });
})

// ***********************Server Setting******************************//
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})