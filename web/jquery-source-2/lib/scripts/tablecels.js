$(document).ready(function() {
  TABLE.formwork('#my_league');// creating form for the table var (below) and adding an id
});

var TABLE = {}; // the variable TABLE = the function contained in {}

TABLE.formwork = function(table) {
  var $tables = $(table); // creating a function for the table and taking table var
  
  $tables.each(function () {
    var _table = $(this);
    _table.find('thead tr').append($('<th class="edit">&nbsp;</th>'));
	// find table head and row and attach thme to a class
    _table.find('tbody tr').append($('<td class="edit"><input type="button" value="Edit"/></td>'))
	// find table body and row add/append to the table
  });
  
  $tables.find('.edit :button').on('click', function(e) {
		// find the edit button and add a click function after selecting tables
    TABLE.editable(this);
    e.preventDefault(); // prevents from executing
  });
}

TABLE.editable = function(button) {
  var $button = $(button);
  var $row = $button.parents('tbody tr');
  var $cells = $row.children('td').not('.edit');
  // making tables editable equal to a var button
  // tr or rows are going to be the parents elements
  // cells or td the children except things with the edit class
  
  if ($row.data('flag')) { // in edit mode, move back to table
    // cell methods
    $cells.each(function () {
      var _cell = $(this);
      _cell.html(_cell.find('input').val());
    });
    
    $row.data('flag',false);
	// false = not in edit mode
    $button.val('Edit');
	// apply 'Edit' value to the button
  } 
  else { // in table mode, move to edit mode 
    // cell methods
    $cells.each(function() {
		// add loop function to all the cells
      var _cell = $(this);
      _cell.data('text', _cell.html()).html('');
	 	// allow the user to enter any text in the edit table field
      
      var $input = $('<input type="text" />')
	  // creating the input field
        .val(_cell.data('text'))
		// set the value of the input field to allow text
        .width(_cell.width() - 16);
		// adding texting type to the input field
		// text can be less than 16 characters
			_cell.append($input);
			// attaches or append to the input field to the var _cell 
    });
    
    $row.data('flag', true);
    $button.val('Save');
	// the value on the button say save after it has been clicked 
  }
}