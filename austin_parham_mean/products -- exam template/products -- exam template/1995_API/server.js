var mongoose =require('mongoose');
// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

var validate = require('mongoose-validator');

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3,50],
    message: 'Name should be at least 3 characters long.'
  })
];

mongoose.connect('mongodb://localhost/restaurants');
//*****************Establish Review Schema******************//
var ReviewSchema = new mongoose.Schema({
 customer_name: {type: String, required:[true, "Name is required"], validate: nameValidator},
 stars: {type:Number, required:[true, "Must choose a star rating"]},
 description: {type: String, required:[true, "A description is required"]},
})
mongoose.model('Review', ReviewSchema); // We are setting this Schema in our Models as 'User'


var Review = mongoose.model('Review')
//*****************Establish Restaurant Schema******************//
var RestaurantSchema = new mongoose.Schema({
 name: {type: String, required:[true, "Name is required"], validate: nameValidator},
 cuisine: {type:String, required:[true, "Cuisine field must be populated"]},
 reviews: [ReviewSchema]
})
mongoose.model('Restaurant', RestaurantSchema); // We are setting this Schema in our Models as 'User'

mongoose.Promise = global.Promise;

var Restaurant = mongoose.model('Restaurant') // We are retrieving this Schema from our Models, named 'User'
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(__dirname + '/sample-app/dist/sample-app'));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request



// ************************Create new Restaurant in server*****************************//
app.post('/restaurants', function(req, res) {
  console.log("POST DATA", req.body);
  var restaurant = new Restaurant({ name: req.body.name, cuisine:req.body.cuisine, reviews:[]});
  restaurant.save(function(err, restaurant) {
      res.json({err:err, restaurant:restaurant});
  })
})
// ************************Get Restaurants From Server*****************************//
app.get('/restaurants', function(req,res){
  console.log("retrieving restaurants from server");
  Restaurant.find({}, function(err,restaurants){
    res.json({err: err, restaurants: restaurants});
  });
});
// ************************Get Restaurant From Server*****************************//
app.get('/restaurants/:id', function(req,res){
  console.log("retrieving restaurant from server");
  Restaurant.findOne({_id:req.params.id}, function(err,restaurant){
    res.json({err: err, restaurant: restaurant});
  });
});
// ************************Edit Restaurant*****************************//
app.put('/restaurants/:id', function(req,res){
  console.log("editing restaurants in server");
  Restaurant.findOneAndUpdate({_id:req.params.id}, {name: req.body.name, cuisine: req.body.cuisine },{runValidators: true}, function(err,restaurant){
    res.json({err: err, restaurant: restaurant});
  });
});
// ************************Delete Restaurant*****************************//
app.delete('/restaurants/:id', function(req,res){
  console.log("deleting restaurant in server");
  Restaurant.findByIdAndRemove(req.params.id, function(err, restaurant){
    res.json({err: err, restaurant: restaurant});
  });
})

// ************************Create new Review in server*****************************//
app.post('/restaurants/review/:id', function(req, res) {
  console.log("POST DATA", req.body);
  var review = new Review({ customer_name: req.body.customer_name, stars:req.body.stars, description:req.body.description});
  review.save(function(err, review) {
      Restaurant.findOneAndUpdate({_id:req.params.id}, {$push: {reviews: review}}, function(err, restaurant){
        res.json({err:err, restaurant:restaurant});
      })
      
  })
})

// ************************Last Line of Defense*****************************//
app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./sample-app/dist/sample-app/index.html"))
});
// ***********************Server Setting******************************//
// Setting our Server to Listen on Port: 8000
app.listen(8010, function() {
    console.log("listening on port 8010");
})