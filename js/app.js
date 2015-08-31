$(document).ready(function(){
  $('#search-area').submit(function(event){
    $('.results').html('');
    var area = $(this).find("input[name='area']").val();
    getUsers(area);
  })

  $.get("http://ipinfo.io", function (response) {
    $("#address").html("Location: " + response.city + ", " + response.region);
}, "jsonp");

});


// --- Error Message --- //
var showError = function(error){
  var errorElem = $('.templates .error').clone();
  var errorText = '<p>' + error + '</p>';
  errorElem.append(errorText);
};

// --- Getting Users --- //

var getUsers = function(area) {
  var request = {city: area,
    site: 'behance',
    sort: 'appreciations',
    client_id: 'g9hggzThToiGPThHB94XNUhzwkALb8N5'
  };

  var result = $.ajax({
    url: "http://www.behance.net/v2/users?" + request.client_id + "&sort=" + request.sort + "&city=" request.city,
    data: request,
    dataType: "jsonp"
    type: "GET",
  })
  .done(function(result) {
    var searchResults = showSearchResults(request.city, result.users.length);

    $('.search-results').html(searchResults);

    $.each(result.users, function(i, item){
      var user = showUser(item);
      $('.results').append(user);
    });
  })
  .fail(function(jqXHR, error, errorThrown) {
    var errorElem = showError(error);
    $('.search-results').append(errorElem);
  });
};


// require(['be'], function(be) {
// be('g9hggzThToiGPThHB94XNUhzwkALb8N5');
// });

// require(['be'], function(be) {
//  // Using promises
//  be('BehanceApiKey')
//  .project.search('cats')
//  .then(function success(results) {
//    console.log(results);
//  }, function failure(error) {
//    console.error(error);
//  });

//  // Using callbacks
//  be.project.search('dogs', function success(results) {
//    console.log(results);
//  });
// });