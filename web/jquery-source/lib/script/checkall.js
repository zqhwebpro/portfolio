$(document).ready(function(){ // doc ready 
  $('.check-all:checkbox').change(function() { // check-all is selected for a state of change to occur in a function
    var group = ':checkbox[name=' + $(this).attr('name') + ']'; // a variables group is created for checkbox 
    $(group).attr('checked', $(this).attr('checked')); // the value for the variables of group now, are changed to all be checked
  }); // close check-all function
}); // close doc ready