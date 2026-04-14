$(document).ready(function(){

	$(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
        } else { 
            $('#scroll').fadeOut(); 
        } 
    }); 
    $(window).scroll(function(){ 
        if ($(this).scrollTop() > 100) { 
            $('#scroll').fadeIn(); 
            $('.sticky-test-btn a').fadeIn();
            $('.sticky-test-btn a').css('display', 'flex');
        } else { 
            $('#scroll').fadeOut();
            $('.sticky-test-btn a').fadeOut(); 
        } 
    }); 
    $('#scroll').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    });
	var proInView
	, bestGraphInView = false;
	var proTriggered
	, bestGraphTriggered = false;
	var iScrollPos = 0, dir = 'down'; 

	$(window).bind("scroll", function() {
        var iCurScrollPos = $(this).scrollTop();
    
        if (iCurScrollPos > iScrollPos) {
          dir = 'down';
        }
        else {
          dir = 'up';
        }
    
        iScrollPos = iCurScrollPos;
    
        if (isScrolledIntoView('.pro-45')) {
          if ( dir === 'down')
          progress45();
        } else {
          proInView = false;  
        }

        if (isScrolledIntoView('.pro-44')) {
            if ( dir === 'down')
            progress44();
          } else {
            proInView = false;  
		  }

		  if (isScrolledIntoView('.pro-11')) {
            if ( dir === 'down')
            progress11();
          } else {
            proInView = false;  
		  }
		  
		  if (isScrolledIntoView('.pro-24')) {
            if ( dir === 'down')
            progress24();
          } else {
            proInView = false;  
		  }
		  
		  if (isScrolledIntoView('.pro-56')) {
            if ( dir === 'down')
            progress56();
          } else {
            proInView = false;  
		  }
		  
		  if (isScrolledIntoView('.pro-20')) {
            if ( dir === 'down')
            progress20();
          } else {
            proInView = false;  
		  }
		  
		  if (isScrolledIntoView('.social-media-graph-wrapp')) {
            if ( dir === 'down')
            soci();
          } else {
            bestGraphInView = false;  
		  }
	});
	
	function progress45() {
		if ( proInView || proTriggered ) return;

        $('.pro-45').addClass('animateText45');
	}
	function progress44() {
        if ( proInView || proTriggered ) return;

        $('.pro-44').addClass('animateText44');
	}
	function progress11() {
        if ( proInView || proTriggered ) return;

        $('.pro-11').addClass('animateText11');
	}
	function progress24() {
        if ( proInView || proTriggered ) return;

        $('.pro-24').addClass('animateText24');
	}
	function progress56() {
        if ( proInView || proTriggered ) return;

        $('.pro-56').addClass('animateText56');
	}
	function progress20() {
        if ( proInView || proTriggered ) return;

        $('.pro-20').addClass('animateText20');
    }

	function soci() {
		if ( bestGraphInView || bestGraphTriggered ) return;

		bestGraphInView = true;
		bestGraphTriggered = true;

		if ( window.matchMedia("(max-width: 823px)").matches ) { 
			Chart.defaults.global.defaultFontSize = 12;
			Chart.defaults.scale.gridLines.display = false;
		 }
		 if ( window.matchMedia("(max-width: 600px)").matches ) { 
			Chart.defaults.global.defaultFontSize = 11;
			Chart.defaults.scale.gridLines.display = false;
		 }
		  else {
			Chart.defaults.global.defaultFontSize = 18;
			Chart.defaults.scale.gridLines.display = false;
			Chart.defaults.global.tooltips.titleFontSize = 16;
			Chart.defaults.global.tooltips.bodyFontSize = 13;
		  }

		  var ctx = $("#bar-chartcanvas");
	
		  var data = {
			labels : ["Instagram", "Snapchat", "Facebook", "Twitter"],
			datasets : [
			  {
				label : "13-17 years of age",
				data : [534, 512, 653, 237],
				backgroundColor : [
				  "#4e5b22", "#4e5b22", "#4e5b22", "#4e5b22"
				],
				strokeColor: "#f26b5f"
			  },
			  {
				label : "18-29 years of age",
				data : [475, 505, 624, 297],
				backgroundColor : [
				  "#9ed03c", "#9ed03c", "#9ed03c", "#9ed03c"
				]
			  }
			]
		  };
	
		  var options = {
			title : {
			  display : true,
			  position : "top",
			  fontSize : 30,
			  fontColor : "#111"
			},
			legend : {
			  display : false
			},
			scales : {
			  yAxes : [{
				gridLines: {
					drawBorder: false
				},
				ticks : {
				  min : 0,
				  max: 800,
				  display: false
				}
			  }],
			  xAxes : [{
				  ticks: {
					fontFamily: "'Montserrat', sans-serif",
					fontColor: '#000'
				  }
			  }]
			}
		  };
	
		  var chart = new Chart( ctx, {
			type : "bar",
			data : data,
			options : options
		  });
	
	}
	
	function isScrolledIntoView(elem)
  {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();

      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();

      return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
  }
});