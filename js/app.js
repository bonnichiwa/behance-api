$(document).ready(function(){

  getLocation();

  $('.run-alternate').submit(function(event){
    custom = document.getElementById("custom-location").value;
    selection = document.getElementById("drop-down");
    field = selection.options[selection.selectedIndex].text;
    console.log(custom); 
    $('.results').html('');
    getUsers(custom);
  })

  $('.run-search').submit(function(event){
    selection = document.getElementById("drop-down");
    field = selection.options[selection.selectedIndex].text;
    
    console.log(selection);
    $('.results').html('');
    getUsers(address);
    console.log("search button pressed");
  })

  // --- Geolocation --- //

  function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log("Latitude : " + latitude + " Longitude: " + longitude);
    var request = new XMLHttpRequest();

    var method = 'GET';
    var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        address = data.results[0].address_components[2].long_name;
        state = data.results[0].address_components[5].long_name;
        $("#address").html(address + ", " + state);
      }
    };
    request.send();
  };

 function errorHandler(err) {
    if(err.code == 1) {
       alert("Error: Access is denied!");
    }
    
    else if( err.code == 2) {
       alert("Error: Position is unavailable!");
    }
  }

 function getLocation(){

    if(navigator.geolocation){
       // timeout at 60000 milliseconds (60 seconds)
       var options = {timeout:60000};
       navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    }
    
    else{
       alert("Sorry, browser does not support geolocation!");
    }
  }
    
});


// --- Number of Results --- //

var showSearchResults = function(length, city) {
  $('.search-results').text("Number of results for " + field + " Creatives" + " in " + city + ": " + numResults);
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

var getUsers = function(address) {
  console.log("reached getUsers");
  var request = {
    city: address,
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

    place = request.city;
    showSearchResults(numResults, place);

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
