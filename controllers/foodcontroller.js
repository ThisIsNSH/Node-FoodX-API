var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var foodSchema = new mongoose.Schema({
	food_name: String,
	food_price: String,
	food_image: String
});

var hotelSchema = new mongoose.Schema({
	name: String,
	image: String,
	location: String,
	mobile: String,
	menu: [foodSchema]
});

var Food = mongoose.model('Food',foodSchema);
var Hotel = mongoose.model('Hotel',hotelSchema);

module.exports = function(app){

	app.get('/hotel',function(req,res){
		Hotel.find({}, function(err,data){
			if (err) throw err;
			res.json(data);
		});
	});

	app.get('/',function(req,res){
		res.render('item');
	});

	app.get('/hotel/menu/:id',function(req,res){
		console.log(req.params.id);
		Hotel.findOne({_id: req.params.id}).then(function(data){
			res.json(data.menu);
		});
	});

	app.post('/hotel',function(req,res){
		console.log(Hotel(req.body));
		var newHotel = Hotel(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);
		});
	});

};