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

mongoose.connect('mongodb://localhost/projects');

var ProductSchema = new mongoose.Schema({
 title: {type: String, required:[true, "Title is required"], validate: nameValidator},
 price: {type:String, required:[true, "Price is required"]},
 url: {type:String, required:[true, "Image URL is required"]}
})
mongoose.model('Product', ProductSchema); // We are setting this Schema in our Models as 'User'

mongoose.Promise = global.Promise;

var Product = mongoose.model('Product') // We are retrieving this Schema from our Models, named 'User'
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



// ************************Create new Product in server*****************************//
app.post('/products', function(req, res) {
  console.log("POST DATA", req.body);
  var product = new Product({ title: req.body.title, price:req.body.price, url:req.body.url });
  product.save(function(err, product) {
      res.json({err:err, product:product});
  })
})
// ************************Get Products From Server*****************************//
app.get('/products', function(req,res){
  console.log("retrieving products from server");
  Product.find({}, function(err,products){
    res.json({err: err, products: products});
  });
});
// ************************Get Product From Server*****************************//
app.get('/products/:id', function(req,res){
  console.log("retrieving products from server");
  Product.findOne({_id:req.params.id}, function(err,product){
    res.json({err: err, product: product});
  });
});
// ************************Edit Author*****************************//
app.put('/products/:id', function(req,res){
  console.log("editing product in server");
  Product.findOneAndUpdate({_id:req.params.id}, req.body,{runValidators: true}, function(err,product){
    res.json({err: err, product: product});
  });
});
// ************************Delete Author*****************************//
app.delete('/products/:id', function(req,res){
  console.log("deleting product in server");
  Product.findByIdAndRemove(req.params.id, function(err, product){
    res.json({err: err, product: product});
  });
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