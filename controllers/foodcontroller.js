var bodyParser = require('body-parser').json();
var mongoose = require('mongoose');
var each = require('async-each-series');


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
	status: {
	    type: String,
	    default: "TBD"
	},
	items: [itemSchema]
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
var Food = mongoose.model('Food',foodSchema);
var Hotel = mongoose.model('Hotel',hotelSchema);

module.exports = function(app){

	//post order status
	app.post('/status',bodyParser,function(req,res){
		Hotel.update({'order._id': req.body.order_id},{$set: {'order.$.status': req.body.status}},function(err, count) { 
			Hotel.findOne({_id: req.body.hotel_id}).then(function(data){
				console.log(data.order);
				res.render('order',{orders: data.order, name: data.name,hotel_id: data._id});
			});
		});
	});

	//get order status
	app.get('/status/',bodyParser,function(req,res){
		Hotel.findOne({_id: req.body.hotel_id}).then(function(data){
			each(data.order, function(el, next) {
			  	var obj = MidOrder(el);
				if (obj._id == req.body.order_id){
					res.json(obj.status);
				}	
			}, function (err) {
				  console.log('finished');
			});
		});
	});

	//post order
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

	//get hotel list
	app.get('/hotel',function(req,res){
		Hotel.find({}, function(err,data){
			if (err) throw err;
			res.json(data);
		});
	});

	//get menu
	app.get('/hotel/menu',bodyParser,function(req,res){
		Hotel.findOne({_id: req.body.hotel_id}).then(function(data){
			res.json(data.menu);
		});
	});

	//get hotel order 
	app.get('/hotel/order/:id',function(req,res){
        Hotel.findOne({_id: req.params.id}).then(function(data){
			res.render('order',{orders: data.order, name: data.name, hotel_id: data._id});
		});
	});

	//post new hotel
	app.post('/hotel',bodyParser,function(req,res){
		console.log(Hotel(req.body));
		var newHotel = Hotel(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);
		});
	});

};