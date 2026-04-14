var $j = jQuery.noConflict();

$j(function(){

    $j("#sidebar li a").hover(function(){
    	$j(this).stop().animate({
    		paddingLeft: "20px&"
    	}, 400);
    }, function() {
    	$j(this).stop().animate({
    		paddingLeft: 0
    	}, 400);
    });

});