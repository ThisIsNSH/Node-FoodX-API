$(document).ready(function(){

  var food_name_list = [];
  var food_price_list = [];
  var food_image_list = [];

  var name = $('#name');
  var image = $('#image');
  var locatio = $('#location');
  var mobile = $('#mobile');
    
  // var food_name = $('#food_name');
  // var food_price = $('#food_price');
  // var food_image = $('#food_image');

$("#hotel button").click(function (ev) {
      ev.preventDefault()
      if ($(this).attr("value") == "button1") {   

        var menuVal = []

    for(var i=0;i<food_name_list.length();i++){
      menuVal.push({ food_name:food_name_list[i],food_price:food_price_list[i],food_image:food_image_list[i]});
    }
    
    var hotel =  {name: name.val(), image: image.val(), location: locatio.val(), mobile: mobile.val(), menu: menuVal };

      $.ajax({
        type: 'POST',
        url: '/hotel',
        data: hotel,
        success: function(data){
          location.reload();
        }
      });

        alert("First Button is pressed - Form will submit") 
        $("#hotel").submit();
      }
      if ($(this).attr("value") == "button2") {
        food_name_list.push($('#food_name'));
    food_price_list.push($('#food_price'));
    food_image_list.push($('#food_image'));
    
        alert("Second button is pressed - Form did not submit")
      }
    });



// $("#hotel").on('click', '#add-hotel', function () {
//   // add hotel

    

//       return true;

//   }); 

// $("#hotel").on('click', '#add-item', function () {
//   // add item
    
    

//   }); 


  // $('#hotel').on('submit', function(){

  //     var hotel =  {name: name.val(), image: image.val(), location: locatio.val(), mobile: mobile.val(), menu: [{food_name: food_name.val(), food_price: food_price.val(),food_image: food_image.val()}] };

  //     $.ajax({
  //       type: 'POST',
  //       url: '/hotel',
  //       data: hotel,
  //       success: function(data){
  //         location.reload();
  //       }
  //     });

  //     return false;

  // });


});
