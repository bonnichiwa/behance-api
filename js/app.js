$(document).ready(function(){
  $('#search-area').submit(function(event){
    $('.results').html('');
    var area = $(this).find("input[name='area']").val();
    getUsers(area);
  });
});



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