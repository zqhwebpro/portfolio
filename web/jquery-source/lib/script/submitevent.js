$(document).ready(function(){ // doc ready
  $("form").submit(function(event){ // start a selector of form to submite a request to the function of event
  	var error = false; // the variable error check set tp false
  	$(this).find("[type=text]").each(function(){ // of this find the [type=text] and on each run the following function
  		if (!$(this).val().length) { // run an if statement that checks for an error
  			alert("Each text box must be filled out."); // initiate alert
  			$(this).focus(); // this alert will always run if triggered
  			error = true; // error equates to true for the alert to populated
  			return false; // Only exits the “each” loop
  		} // close alert
  	}); // close if ofr !$(this)
  	if (error) { // if of error event
  		event.preventDefault(); // the default action of the event is to be prevented 
  	} // close the if error event
  }); // close the submit event request
}); // close doc

