$(document).ready(function() { // doc ready
  $.getJSON('http://feeds.delicious.com/v2/json/tag/celebs?callback=?',  // open a getJSON requirest
    function(data) { // function of data
      alert('Loaded ' + data.length + ' item.'); // responds with data.length from .getJSON request
    }); // close data function
}); // close doc