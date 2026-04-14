$(document).ready(function(){ //document ready to function

$('#hide-button').click(function(){	//add click function to div #hide-button
		$('#slidetext').slideUp();	//slideUp to hide all div's with id #slidetext
}); //end hide-button function
	
$('#show-button').click(function(){	//add click function to div #show-button
	$('#slidetext').slideDown();	//slideDown to hide all div's with id #slidetext
}); //end show-button function
	
}); //document end