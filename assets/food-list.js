$(document).ready(function(){

  var food_name_list = [];
  var food_price_list = [];
  var food_image_list = [];

  var name = $('#name');
  var image = $('#image');
  var locatio = $('#location');
  var mobile = $('#mobile');


    
$("#hotel button").click(function (ev) {
      ev.preventDefault()

      if ($(this).attr("value") == "button1") {   

    var hotel =  {name: name.val(), image: image.val(), location: locatio.val(), mobile: mobile.val(), menu: []};
    var item = []
    

      for(var i=0;i<food_name_list.length;i++){
        hotel.menu.push({ food_name: food_name_list[i],food_price: food_price_list[i],food_image: food_image_list[i]});

          if (i==food_name_list.length-1){
            // alert(hotel.menu.length) ;
            // hotel.menu = item;

            $.ajax({
              type: 'POST',
              url: '/hotel',
              contentType: 'application/json',
              data: JSON.stringify(hotel),
              success: function(data){
                location.reload();
              }
            });
          }
        }
      }


      if ($(this).attr("value") == "button2") {

        food_name_list.push($('#food_name').val());
        food_price_list.push($('#food_price').val());
        food_image_list.push($('#food_image').val());
    
        alert(food_name_list.length);
      }
    });



});
