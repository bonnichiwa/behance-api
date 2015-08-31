$(document).ready(function(){
  $('.search-area').submit(function(event){
    $('.results').html('');
    var area = $(this).find("input[name='area']").val();
    getUsers(area);
    console.log("search button pressed");
  })

  $.get("http://ipinfo.io", function (response) {
    $("#address").html("Location: " + response.city + ", " + response.region);
    console.log("Current location: " + response.city);
}, "jsonp");
    

});


// --- Error Message --- //
var showError = function(error){
  var errorElem = $('.templates .error').clone();
  var errorText = '<p>' + error + '</p>';
  errorElem.append(errorText);
};

// --- Getting Users --- //
var showUsers = function(user) {
  console.log("Reached showUsers function");

  var result = $('.templates .search').clone();

  var displayUser = result.find('.username a');
  displayUser.attr('href', user.url);
  displayUser.text(user.display_name);
}

var getUsers = function(area) {
  console.log("reached getUsers");
  var request = {
    city: area,
    sort: 'appreciations',
    client_id: 'g9hggzThToiGPThHB94XNUhzwkALb8N5'
  };

  var result = $.ajax({
    url: "http://www.behance.net/v2/users?client_id=" + request.client_id + "&sort=" + request.sort + "&city=" + request.city,
    data: request,
    dataType: "jsonp"
  })
  .done(function(result) {
    console.log("Found results");

    $.each(result.users, function(i, item){
      console.log(result.users);
      var user = showUsers(item);
      $('.results').append(user);
    });

    console.log("Appended results");
  })
  .fail(function(jqXHR, error, errorThrown) {
    var errorElem = showError(error);
    $('.search-results').append(errorElem);
  });
};
