setInterval(function(){
location.reload();
},3000);
$(document).ready(function(){


  $('.cancel-button').click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/status",
        data: {
            hotel_id : $('#heading').attr('hotel-id'),
            order_id : $(this).data("fpid"),
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


  $('.accept-button').click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/status",
        data: {
            hotel_id : $('#heading').attr('hotel-id'),
            order_id : $(this).data("fpid"),
            status : "Confirmed"
        },
        success: function(result) {
            location.reload();
        },
        error: function(result) {
            alert('error');
        }
    });

  });

  $('.pickup-button').click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/status",
        data: {
            hotel_id : $('#heading').attr('hotel-id'),
            order_id : $(this).data("fpid"),
            status : "Out for Delivery"
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
