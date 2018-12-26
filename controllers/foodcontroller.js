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


// 	[
// 	{
// 		"address": "address1",
// 		"name": "name1",
// 		"mobile":"mobile1",
// 		"hotel_id":"5c23bc74394a05067a43302b",
// 		"items":[
// 				{
// 					"name":"item name 1",
// 					"quantity":"2",
// 					"extra":"none"
// 				},
// 				{
// 					"name":"item name 2",
// 					"quantity":"2",
// 					"extra":"none"
// 				},
// 				{
// 					"name":"item name 3",
// 					"quantity":"2",
// 					"extra":"none"
// 				}
// 			]
// 	},
// 	{
// 		"address": "address1",
// 		"name": "name1",
// 		"mobile":"mobile1",
// 		"hotel_id":"5c23bc7f394a05067a43302f",
// 		"items":[
// 				{
// 					"name":"item name 7",
// 					"quantity":"2",
// 					"extra":"none"
// 				},
// 				{
// 					"name":"item name 8",
// 					"quantity":"2",
// 					"extra":"none"
// 				},
// 				{
// 					"name":"item name 9",
// 					"quantity":"2",
// 					"extra":"none"
// 				}
// 			]
// 	}
// ]

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


		// for(var i = 0; i < request.length; i++) {
  //  		    var obj = MidOrder(request[i]);
		// 	Hotel.findOne({_id: obj.hotel_id}).then(function(result){
		// 		var arr = result.order;
		// 		arr.push(MidOrder(obj));
		// 		Hotel.findOneAndUpdate({_id: obj.hotel_id},{$set:{order:arr}}, {new: true}).then(function(data){
		// 			da.push(data);
		// 		});
		// 	});
		// 	if (i==request.length-1)
		// 		res.json(da);
		// }
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

	app.post('/hotel',bodyParser,function(req,res){
		console.log(Hotel(req.body));
		var newHotel = Hotel(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);
		});
	});

};