$(document).ready(function(){

  $('#hotel').on('submit', function(){

      var name = $('#name');
      var image = $('#image');
      var locatio = $('#location');
      var mobile = $('#mobile');
      
      var food_name = $('#food_name');
      var food_price = $('#food_price');
      var food_image = $('#food_image');

      var hotel =  {name: name.val(), image: image.val(), location: locatio.val(), mobile: mobile.val(), menu: [{food_name: food_name.val(), food_price: food_price.val(),food_image: food_image.val()}] };

      $.ajax({
        type: 'POST',
        url: '/hotel',
        data: hotel,
        success: function(data){
          location.reload();
        }
      });

      return false;

  });


  $("#cancel-button").click(function(e) {
    e.preventDefault();
    
    $.ajax({
        type: "POST",
        url: "/status",
        data: { 
            hotel_id : hotel_id,
            order_id : "5c24c98d2847260461d01ab0",
            status : "Cancelled"
        },
        success: function(result) {
            location.reload();
        },
        error: function(result) {
            alert('error');
        }
    });

  }); 

});
