$(document).ready(function(){ // doc ready
 starRating.create('.stars'); // calling upon the function to create target the div stars
}); // close doc

// Run the widget
var starRating = { // create variable
  create: function(selector) { // create a function of selector
    // loop over every element matching the selector
    $(selector).each(function() { // run selecter on each
      var $list = $('<div></div>'); // create a variable list of the HTML open then close div
      // loop over every radio button in each container
      $(this) // this now runs
        .find('input:radio') // find the radio input from what's inside the div
        .each(function(i) { // find the (i) index of each element in the function
          var rating = $(this).parent().text(); // on a variable of rating run this on the parent text
          var $item = $('<a href="#"></a>') // on the variable of $item equate an a tag
            .attr('title', rating) // find the attribute 'title, rating
            .addClass(i % 2 == 1 ? 'rating-right' : '') // add class with a ration of i % 2==1 if unknown rating-right
            .text(rating); // changing the text of rating
          
          starRating.addHandlers($item); // add a handlers (controller) of $item starRating
          $list.append($item); // ready a list with append of $item then
          
          if($(this).is(':checked')) { // if not this than this if
            $item.prevAll().andSelf().addClass('rating'); // prevent everything on $item with andSelf() we'll target the selector if it was already running, then add the class of 'rating'
          } // close if
        }); // close this
        // Hide the original radio buttons
        $(this).append($list).find('label').hide(); // this appends a list, finds the label, then hides it
    }); // close this
  }, // close selector each function
  addHandlers: function(item) { // add handlers of a function on item
    $(item).click(function(e) { // ready up item with a click function
      // Handle Star click
      var $star = $(this); // variable of stars will do this
      var $allLinks = $(this).parent(); // variable of allLinks will do this to the parent
      
      // Set the radio button value
      $allLinks // on all links
        .parent() // parent
        .find('input:radio[value=' + $star.text() + ']') // find this input
        .attr('checked', true); // market it as checked true
        
      // Set the ratings
      $allLinks.children().removeClass('rating'); // removes the class of rating to links
      $star.prevAll().andSelf().addClass('rating'); // adds the class of rating to stars
      
      // prevent default link click
      e.preventDefault();
          
    }).hover(function() {
      // Handle star mouse over
      $(this).prevAll().andSelf().addClass('rating-over');
    }, function() {
      // Handle star mouse out
      $(this).siblings().andSelf().removeClass('rating-over')
    }); // closes the function of star mouse out
  } // closes hover
  
} // closes variable/the starRating widget