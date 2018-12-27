$(document).ready(function(){

  
  $('#cancel-button').click(function(e) {
    alert($('#cancel-button').attr('order-id'));
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/status",
        data: { 
            hotel_id : $('#heading').attr('hotel-id'),
            order_id : $('#cancel-button').attr('order-id'),
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


  $('#accept-button').click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/status",
        data: { 
            hotel_id : $('#heading').attr('hotel-id'),
            order_id : $('#accept-button').attr('order-id'),
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

  $('#pickup-button').click(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/status",
        data: { 
            hotel_id : $('#heading').attr('hotel-id'),
            order_id : $('#pickup-button').attr('order-id'),
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
