$(document).ready(function(){

  $.get("http://ipinfo.io", function (response) {
    area = response.city;
    $("#address").html( response.city + ", " + response.region);
    console.log(area);
    console.log("Current location: " + response.city);
}, "jsonp");

  $('.run-search').submit(function(event){
    var selection = document.getElementById("drop-down");
    field = selection.options[selection.selectedIndex].text;
    console.log(selection);
    $('.results').html('');
    getUsers(area, field);
    console.log("search button pressed");
  })
    
});


// --- Number of Results --- //

var showSearchResults = function(length) {
  $('.search-results').text("Number of results for " + field + " Creatives: " + numResults);
};

// --- Error Message --- //
var showError = function(error){
  var errorElem = $('.templates .error').clone();
  var errorText = '<p>' + error + '</p>';
  errorElem.append(errorText);
};

// --- Showing Users --- //
var showUsers = function(user) {
  console.log("Reached showUsers function");

  var result = $('.templates .search').clone();

  var profilePic = result.find('.profile-pic img');
  profilePic.attr('src', user.images[115]);

  var displayUser = result.find('.username a');
  displayUser.attr('href', user.url);
  console.log(user.url);
  displayUser.text(user.display_name);
  console.log(user.display_name);

  var currentLocation = result.find('.area');
  currentLocation.text(user.location);

  var specialty_1 = result.find('#field-1');
  specialty_1.text(user.fields[0]);
  var specialty_2 = result.find('#field-2');
  specialty_2.text(user.fields[1]);
  var specialty_3 = result.find('#field-3');
  specialty_3.text(user.fields[2]);
  console.log(user.fields[0] + ", " + user.fields[1] + ", " + user.fields[2]);  


  return result;
};

// --- Getting Users --- //

var getUsers = function(area, field) {
  console.log("reached getUsers");
  var request = {
    city: area,
    field: field,
    sort: 'views',
    client_id: 'g9hggzThToiGPThHB94XNUhzwkALb8N5'
  };

  var result = $.ajax({
    url: "http://www.behance.net/v2/users?client_id=" + request.client_id + "&sort=" + request.sort + "&city=" + request.city + "&field=" + field,
    data: request,
    dataType: "jsonp"
  })
  .done(function(result) {
    console.log(result);
    console.log("Found results");

    // $('.search-results').html(searchResults);
    numResults = result.users.length;
    console.log("Numb of results" + numResults);
    showSearchResults(numResults);

    $.each(result.users, function(i, item){
      console.log("Found result users");  
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
