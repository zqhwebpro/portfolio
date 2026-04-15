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
    var progress61InView = false
    ,progress52InView =false;

    var iScrollPos = 0, dir = 'down'; 

    var progress61Triggered = false
    ,progress52Triggered = false;

    $(window).bind("scroll", function() {
        var iCurScrollPos = $(this).scrollTop();
    
        if (iCurScrollPos > iScrollPos) {
          dir = 'down';
        }
        else {
          dir = 'up';
        }
    
        iScrollPos = iCurScrollPos;
    
        if (isScrolledIntoView('.percent60')) {
          if ( dir === 'down')
          progress60();
        } else {
          progress60InView = false;  
        }

        if (isScrolledIntoView('.percent52')) {
            if ( dir === 'down')
            progress52();
          } else {
            progress52InView = false;  
          }

    });

    function progress60() {
        if ( progress61InView || progress61Triggered ) return;

        $('.percent60').addClass('animate61');
        $('.val61').addClass('progress-value61');
    }

    function progress52() {
        if ( progress52InView || progress52Triggered ) return;

        $('.percent52').addClass('animate52');
        $('.val52').addClass('progress-value52');
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