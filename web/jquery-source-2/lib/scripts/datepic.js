$(document).ready(function(){ // document is ready
	$('#date').datepicker({ // adding datepicker to the element #date or select #date and add datepicker to it
		showOn: 'both', // show on both
		buttonText: 'Choose a date', // button text
		buttonImage: 'lib/img/calendar.png', //add calendar image to button
		buttonImageOnly: true, //button is image only
		numberOfMonths: 2, //two months set
		maxDate: '0d', //max date 0 days
		minDate: '-1m', //min date -1 days
		showButtonPanel: true //shows true
	}); //end function datepicker
}); //end entire function