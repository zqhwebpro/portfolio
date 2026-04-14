$(document).ready(function(){ // doc ready
  $('#your-picks, #other-picks').sortable({ // action of sortable on these two id's
    connectWith: '.connected', // connects the data that has a class of connted
    placeholder: 'ui-state-highlight', // a placeholder ui-state is shown
    receive: function(event,ui) { adopt(this); }, // receive the function on an adopt(this) element
    remove: function(event,ui) { orphan(this); } // remove the function on an orphan(this) element
  }).disableSelection(); // disable the ability for it to be a selection
}); // close sortable selector

function adopt(which) { // create a function of adopot(which)
  if ($(which).hasClass('empty')) { // if it has a class
    $(which).removeClass('empty').find('.empty').remove(); // remove the class
  } // closes has class selector
} // close adpot function

function orphan(which) { // create a function of ophan(which)
  if ($(which).children().length == 0) { // the parent item searchs through children elements
    $(which).append($('<li class="empty">empty</li>')).addClass('empty'); // it does this to append a li class of empty, adds the class
  } // closes ophan function
} // close doc