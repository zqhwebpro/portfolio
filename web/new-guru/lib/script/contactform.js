$(document).ready(function(){ // document ready
$('#myform').bind('submit', function(event) { // function start myform to bind a submit to event
$('[type=text]').each(function() { // start type=text for each property
if(!$(this).val().length) 
	{
		event.preventDefault(); 
		$(this).css('border', '2px solid red'); 
	}  
});
});
});