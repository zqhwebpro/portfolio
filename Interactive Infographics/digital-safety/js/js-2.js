$(document).ready(function() {

  $(window).resize(function(){
    if (window.matchMedia("(min-width: 1261px)").matches) {
      document.getElementById('svg-watch').setAttribute("height" , "50");
      document.getElementById('svg-recommended').setAttribute("height" , "120");
      document.getElementById('NewGroupe0_1_').setAttribute("height" , "100");
    }
    if (window.matchMedia("(max-width: 1260px)").matches) {
      document.getElementById('svg-watch').setAttribute("height" , "45");
      document.getElementById('svg-recommended').setAttribute("height" , "70");
      document.getElementById('NewGroupe0_1_').setAttribute("height" , "90");
    }
    if (window.matchMedia("(max-width: 1075px)").matches) {
      document.getElementById('NewGroupe0_1_').setAttribute("height" , "80");
    }
    if (window.matchMedia("(max-width: 1000px)").matches) {
      document.getElementById('svg-watch').setAttribute("height" , "40");
    }
    if (window.matchMedia("(max-width: 950px)").matches) {
      document.getElementById('NewGroupe0_1_').setAttribute("height" , "70");
    }
    if (window.matchMedia("(max-width: 940px)").matches) {
      document.getElementById('svg-watch').setAttribute("height" , "30");
      document.getElementById('svg-recommended').setAttribute("height" , "50");
    }
    if (window.matchMedia("(max-width: 900px)").matches) {
      document.getElementById('NewGroupe0_1_').setAttribute("height" , "50");
    }
    if (window.matchMedia("(max-width: 767px)").matches) {
      document.getElementById('svg-watch').setAttribute("height" , "100");
      document.getElementById('svg-watch').setAttribute("width" , "150");
      document.getElementById('svg-recommended').setAttribute("height" , "120");
      document.getElementById('NewGroupe0_1_').setAttribute("height" , "100");
    }
    if (window.matchMedia("(max-width: 620px)").matches) {
      document.getElementById('svg-watch').setAttribute("height" , "90");
      document.getElementById('svg-watch').setAttribute("width" , "100");
      document.getElementById('NewGroupe0_1_').setAttribute("height" , "90");
    }
    if (window.matchMedia("(max-width: 500px)").matches) {
      document.getElementById('svg-watch').setAttribute("height" , "70");
      document.getElementById('svg-watch').setAttribute("width" , "90");
      document.getElementById('svg-recommended').setAttribute("height" , "70");
      document.getElementById('NewGroupe0_1_').setAttribute("height" , "70");
    }
    if (window.matchMedia("(max-width: 445px)").matches) {
      document.getElementById('svg-watch').setAttribute("height" , "50");
      document.getElementById('svg-watch').setAttribute("width" , "80");
      document.getElementById('svg-recommended').setAttribute("height" , "60");
    }
  });

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

      // var risksInView = false;

      var iScrollPos = 0, dir = 'down';

      // var risksTriggered = false

      $(window).bind("scroll", function() {
        var iCurScrollPos = $(this).scrollTop();
    
        if (iCurScrollPos > iScrollPos) {
          dir = 'down';
        }
        else {
          dir = 'up';
        }
    
        iScrollPos = iCurScrollPos;
    
        
        // if (isScrolledIntoView('#risks-chart')) {
        //   if ( dir === 'down')
        //   risksPie();
        // } else {
        //   risksInView = false;  
        // }
    
    
      });
      Chart.defaults.global.legend.display = false;
      var ctx = document.getElementById("gaming-watch-graph");
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["Users", "Non-users"],
          datasets: [{
            backgroundColor: [
              "#0A495F",
              "#F3F1F2"
            ],
            data: [57, 43]
          }]
        },
        options: {
          cutoutPercentage: 80,
          elements: {
              arc: {
                  borderWidth: 0
              }
          }
        }
      });
      var ctx = document.getElementById("gaming-recommended-graph");
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["Users", "Non-users"],
          datasets: [{
            backgroundColor: [
              "#0A495F",
              "#F3F1F2"
            ],
            data: [34, 76]
          }]
        },
        options: {
          cutoutPercentage: 80,
          elements: {
              arc: {
                  borderWidth: 0
              }
          }
        }
      });
      var ctx = document.getElementById("gaming-reputation-graph");
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ["Users", "Non-users"],
          datasets: [{
            backgroundColor: [
              "#0A495F",
              "#F3F1F2"
            ],
            data: [31, 71]
          }]
        },
        options: {
          cutoutPercentage: 80,
          elements: {
              arc: {
                  borderWidth: 0
              }
          }
        }
      });

    function isScrolledIntoView(elem)
  {
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();

      var elemTop = $(elem).offset().top;
      var elemBottom = elemTop + $(elem).height();

      return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
  }

  // function svgResponsive(){
    // if (window.matchMedia("(max-width: 1260px)").matches) {
    //   document.getElementById('svg-watch').setAttribute("height" , "30");
    // }
  // }

  if (window.matchMedia("(min-width: 1261px)").matches) {
    document.getElementById('svg-watch').setAttribute("height" , "50");
    document.getElementById('svg-recommended').setAttribute("height" , "120");
    document.getElementById('NewGroupe0_1_').setAttribute("height" , "100");
    // document.getElementById('NewGroupe0_1_').setAttribute("width" , "100");
  }
  if (window.matchMedia("(max-width: 1260px)").matches) {
    document.getElementById('svg-watch').setAttribute("height" , "45");
    document.getElementById('svg-recommended').setAttribute("height" , "70");
    document.getElementById('NewGroupe0_1_').setAttribute("height" , "90");
    // document.getElementById('NewGroupe0_1_').setAttribute("width" , "90");
  }
  if (window.matchMedia("(max-width: 1075px)").matches) {
    document.getElementById('NewGroupe0_1_').setAttribute("height" , "80");
  }
  if (window.matchMedia("(max-width: 1000px)").matches) {
    document.getElementById('svg-watch').setAttribute("height" , "40");
    // document.getElementById('svg-reputation').setAttribute("height" , "100");
  }
  if (window.matchMedia("(max-width: 950px)").matches) {
    document.getElementById('NewGroupe0_1_').setAttribute("height" , "70");
  }
  if (window.matchMedia("(max-width: 940px)").matches) {
    document.getElementById('svg-watch').setAttribute("height" , "30");
    document.getElementById('svg-recommended').setAttribute("height" , "50");
  }
  if (window.matchMedia("(max-width: 900px)").matches) {
    document.getElementById('NewGroupe0_1_').setAttribute("height" , "50");
  }
  if (window.matchMedia("(max-width: 767px)").matches) {
    document.getElementById('svg-watch').setAttribute("height" , "100");
    document.getElementById('svg-watch').setAttribute("width" , "150");
    document.getElementById('svg-recommended').setAttribute("height" , "120");
    document.getElementById('NewGroupe0_1_').setAttribute("height" , "100");
  }
  if (window.matchMedia("(max-width: 620px)").matches) {
    document.getElementById('svg-watch').setAttribute("height" , "90");
    document.getElementById('svg-watch').setAttribute("width" , "100");
    document.getElementById('NewGroupe0_1_').setAttribute("height" , "90");
  }
  if (window.matchMedia("(max-width: 500px)").matches) {
    document.getElementById('svg-watch').setAttribute("height" , "70");
    document.getElementById('svg-watch').setAttribute("width" , "90");
    document.getElementById('svg-recommended').setAttribute("height" , "70");
    document.getElementById('NewGroupe0_1_').setAttribute("height" , "70");
  }
  if (window.matchMedia("(max-width: 445px)").matches) {
    document.getElementById('svg-watch').setAttribute("height" , "50");
    document.getElementById('svg-watch').setAttribute("width" , "80");
    document.getElementById('svg-recommended').setAttribute("height" , "60");
  }

});