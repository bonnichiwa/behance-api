$(document).ready(function(){
  $('#search-area').submit(function(event){
    $('.results').html('');
    var area = $(this).find("input[name='area']").val();
    getUsers(area);
  });
});

var getUsers = function(area) {
  var request = {q: area,
    site: 'behance',
    sort: 'appreciations'
  };

  var result = $.ajax({
    url: "https://api.behance.net/v2/users?q=matias&client_id=1234567890"
  })
}


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