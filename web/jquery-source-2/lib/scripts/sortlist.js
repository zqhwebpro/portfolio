$(document).ready(function() { //document is ready
  $('#ascending').click(function() { //select ascending click function
    SORTER.sort('.sortable'); //sort initiates as class sortable
  }); //end function ascending click function
  $('#descending').click(function() { //selects descending click function 
    SORTER.sort('.sortable', 'desc'); //sort initiates as class sortable desc
  }); //end function descending click function
}); //end entire function

var SORTER = {}; //creating a sorter variable
SORTER.sort = function(which, dir) { //adding a method to the value 
  SORTER.dir = (dir == "desc") ? -1 : 1; //new property of SORTER.dir of if
  // simple terms will be an if/else statement
  //if statement then -1 else 1
  //if the direction equals des then place at -1 value
  //else then place at 1 value
  $(which).each(function() {
	// which = .sortable
    // Find the list items and sort them
    var sorted = $(this).find("> li").sort(function(a, b) {
			//create a new variable of sorted.
			//when (this) happens, it wil find all the first-level child elements,
			//then apply the sort function
      return $(a).text().toLowerCase() > $(b).text().toLowerCase() ? SORTER.dir : -SORTER.dir; 
	  //return, toLowerCase -
    });
    $(this).append(sorted);
	//append to the element that trigger the event to the sorted variable
  });
};
