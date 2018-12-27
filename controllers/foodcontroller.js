var bodyParser = require('body-parser').json();
var mongoose = require('mongoose');
var each = require('async-each-series');

mongoose.connect('mongodb://test:test123!@ds115753.mlab.com:15753/foodxdb',{useNewUrlParser: true})

var foodSchema = new mongoose.Schema({
	food_name: String,
	food_price: String,
	food_image: String
});

var itemSchema = new mongoose.Schema({
	name: String,
	quantity: String,
	extra: String
});

var midOrderSchema = new mongoose.Schema({
	address: String,
	name: String,
	mobile: String,
	hotel_id: String,
	items: [itemSchema]
});

var orderSchema = new mongoose.Schema({
	order: [itemSchema],
	address: String,
	name: String,
	mobile: String
});

var hotelSchema = new mongoose.Schema({
	name: String,
	image: String,
	location: String,
	mobile: String,
	menu: [foodSchema],
	order: [midOrderSchema]
});

var Item = mongoose.model('Item',itemSchema);
var MidOrder = mongoose.model('MidOrder',midOrderSchema);
var Order = mongoose.model('Order',orderSchema);
var Food = mongoose.model('Food',foodSchema);
var Hotel = mongoose.model('Hotel',hotelSchema);

module.exports = function(app){

	app.post('/order',bodyParser,function(req,res){
		var request = req.body;
		var da = [];
		each(request, function(el, next) {
			
		  var obj = MidOrder(el);
			Hotel.findOne({_id: obj.hotel_id}).then(function(result){
				var arr = result.order;
				arr.push(MidOrder(obj));
				Hotel.findOneAndUpdate({_id: obj.hotel_id},{$set:{order:arr}}, {new: true}).then(function(data){
					da.push(data);
					next();
				});
			});
		}, function (err) {
				res.json(da);
		  console.log('finished');
		});
	});

	app.get('/',function(req,res){
		res.render('hotel');
	});

	app.get('/user',function(req,res){
		res.render('user');
	});

	app.get('/hotel',function(req,res){
		Hotel.find({}, function(err,data){
			if (err) throw err;
			res.json(data);
		});
	});

	app.get('/hotel/menu/:id',function(req,res){
		console.log(req.params.id);
		Hotel.findOne({_id: req.params.id}).then(function(data){
			res.json(data.menu);
		});
	});

	app.get('/hotel/order/:id',function(req,res){
		console.log(req.params.id);
		Hotel.findOne({_id: req.params.id}).then(function(data){
			res.json(data.order);
		});
	});

	app.post('/hotel',bodyParser,function(req,res){
		console.log(Hotel(req.body));
		var newHotel = Hotel(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);
		});
	});

};