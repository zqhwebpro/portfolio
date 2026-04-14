function template(row, cstable) { // load a function for templates, rows, and the class
  row.find('.cs_type').text(cstable.type); //find row cs_type with the text id of type
  row.find('.cs_occ').text(cstable.occ); //find row cs_occ with the text id of occ
  row.find('.cs_vibe').text(cstable.vibe); //find row cs_vibe with the text id of vibe
  return row; // returns a value of row
} // closes up function template

$(document).ready(function() { // loads doc ready function
  var newRow = $('#cstable .template').clone().removeClass('template'); // varilable of each new row creates a new jquery assigning a new selector of class cs table id template. clone copies the method, remove class of template finishes the string
  var cstableItem = { // variables of cstableItem called upon
    type: 'EFJT', // the type selector data
    occ: 'Web Design', // the occ selector data
    vibe: 'Relaxed' // the vibe selector data
  }; // close variable
  template(newRow, cstableItem) // template of newRow and csItem
    .appendTo('#cstable') // appends, produces to class of cstable
    .fadeIn();  // generate data with a fadeIn 
}); // close variable and entire function

