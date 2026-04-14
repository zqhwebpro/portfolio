$(document).ready(function(){ // doc ready
	$('#date').datepicker({ // find the class of date
		showOn: 'both', // show both methods is on
		buttonText: 'Choose a date', // the button text should say Choose a date
		buttonimage:'calendar.png', // load the calendar.png
		buttonImageOnly: true, // button image is set to image only
		numberOfMonths: 2, // show 2 months
		maxDate: '0d', // max date of 0 days
		minDate: '-1m', // min date of -1m
		showButtonPanel: true // the button panel show is true
	}); // close up datepicker action
}); // close up doc