$(document).ready(function(){ // doc ready
  $('#i_service ul a').click(function(e) { // load class i_service ul a and add click function generate an (e) event
    var url = $(this).attr('href') + ' #ans_service'; // load variable url this then runs .attr, get value of href, and + class ans_service
    $('#service').html('loading...').load(url); // selector open class service, in html script - state test loading in place holder spot, then immedeiately load the url and html content in it's place
    e.preventDefault(); // the event may not ever Default
  }); // close up click function actions
}); // doc close
