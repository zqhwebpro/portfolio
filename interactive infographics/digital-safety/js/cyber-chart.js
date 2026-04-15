$(document).ready(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $("#scroll").fadeIn();
    } else {
      $("#scroll").fadeOut();
    }
  });
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $("#scroll").fadeIn();
      $(".sticky-test-btn a").fadeIn();
      $(".sticky-test-btn a").css("display", "flex");
    } else {
      $("#scroll").fadeOut();
      $(".sticky-test-btn a").fadeOut();
    }
  });
  $("#scroll").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
  $(".btn-test").on("click", function(e) {
    e.preventDefault();
    window.location.href =
      "https://parent.guide/to-the-internet/digital-safety-quiz/";
    return false;
  });

  var identityInView = false,
    svgInView = false,
    p61 = false,
    p14 = false,
    p60 = false,
    p55 = false;

  var iScrollPos = 0,
    dir = "down";

  var identityIsTriggered = false,
    svgTriggered = false,
    pt61 = false,
    pt14 = false,
    pt60 = false,
    pt55 = false;

  $(window).bind("scroll", function() {
    var iCurScrollPos = $(this).scrollTop();

    if (iCurScrollPos > iScrollPos) {
      dir = "down";
    } else {
      dir = "up";
    }

    iScrollPos = iCurScrollPos;

    if (isScrolledIntoView("#identity-chart")) {
      if (dir === "down") identityChart();
    } else {
      identityInView = false;
    }

    if (isScrolledIntoView(".svg-breaches")) {
      if (dir === "down") breaches_svgs();
    } else {
      svgInView = false;
    }

    if (isScrolledIntoView(".svg-phishing")) {
      if (dir === "down") phishing_svgs();
    } else {
      svgInView = false;
    }

    if (isScrolledIntoView(".svg-unsafe")) {
      if (dir === "down") unsafe_svgs();
    } else {
      svgInView = false;
    }

    if (isScrolledIntoView(".pb61")) {
      if (dir === "down") pb61();
    } else {
      p61 = false;
    }

    if (isScrolledIntoView(".pb14")) {
      if (dir === "down") pb14();
    } else {
      p14 = false;
    }

    if (isScrolledIntoView(".pb60")) {
      if (dir === "down") pb60();
    } else {
      p60 = false;
    }

    if (isScrolledIntoView(".pb55")) {
      if (dir === "down") pb55();
    } else {
      p55 = false;
    }
  });

  function pb61() {
    if (p61 || pt61) return;

    p61 = true;
    pt61 = true;

    $(".pb61").addClass("p61");
    $(".pv61").addClass("proval-61");
  }

  function pb14() {
    if (p14 || pt14) return;

    p14 = true;
    pt14 = true;

    $(".pb14").addClass("p14");
    $(".pv14").addClass("proval-14");
  }

  function pb60() {
    if (p60 || pt60) return;

    p60 = true;
    pt60 = true;

    $(".pb60").addClass("p60");
    $(".pv60").addClass("proval-60");
  }

  function pb55() {
    if (p55 || pt55) return;

    p55 = true;
    pt55 = true;

    $(".pb55").addClass("p55");
    $(".pv55").addClass("proval-55");
  }

  function breaches_svgs() {
    if (svgInView || svgTriggered) return;

    // svgInView = true;
    // svgTriggered = true;
    $(".breaches-01").addClass("cybersec-breaches-1");
    $(".breaches-02").addClass("cybersec-breaches-2");
    $(".breaches-03").addClass("cybersec-breaches-3");
    $(".breaches-04").addClass("cybersec-breaches-4");
    $(".breaches-05").addClass("cybersec-breaches-5");
    $(".breaches-06").addClass("cybersec-breaches-6");
    $(".breaches-07").addClass("cybersec-breaches-7");
    $(".breaches-08").addClass("cybersec-breaches-8");
    $(".breaches-09").addClass("cybersec-breaches-9");
    $(".breaches-10").addClass("cybersec-breaches-10");
    $(".breaches-11").addClass("cybersec-breaches-11");
    $(".breaches-12").addClass("cybersec-breaches-12");
    $(".breaches-13").addClass("cybersec-breaches-13");
    $(".breaches-14").addClass("cybersec-breaches-14");
    $(".breaches-15").addClass("cybersec-breaches-15");
    $(".breaches-16").addClass("cybersec-breaches-16");
    $(".breaches-17").addClass("cybersec-breaches-17");
    $(".breaches-18").addClass("cybersec-breaches-18");
    $(".breaches-19").addClass("cybersec-breaches-19");
    $(".breaches-20").addClass("cybersec-breaches-20");
    $(".breaches-21").addClass("cybersec-breaches-21");
    $(".breaches-22").addClass("cybersec-breaches-22");
    $(".breaches-23").addClass("cybersec-breaches-23");
    $(".breaches-24").addClass("cybersec-breaches-24");
    $(".breaches-25").addClass("cybersec-breaches-25");
    $(".breaches-26").addClass("cybersec-breaches-26");
    $(".breaches-27").addClass("cybersec-breaches-27");
    $(".breaches-28").addClass("cybersec-breaches-28");
    $(".breaches-29").addClass("cybersec-breaches-29");
    $(".breaches-30").addClass("cybersec-breaches-30");
    $(".breaches-31").addClass("cybersec-breaches-31");
    $(".breaches-32").addClass("cybersec-breaches-32");
    $(".breaches-33").addClass("cybersec-breaches-33");
    $(".breaches-34").addClass("cybersec-breaches-34");
    $(".breaches-35").addClass("cybersec-breaches-35");
  }

  function phishing_svgs() {
    if (svgInView || svgTriggered) return;
    $(".phishing-01").addClass("cybersec-phishing-1");
    $(".phishing-02").addClass("cybersec-phishing-2");
    $(".phishing-03").addClass("cybersec-phishing-3");
    $(".phishing-04").addClass("cybersec-phishing-4");
    $(".phishing-05").addClass("cybersec-phishing-5");
    $(".phishing-06").addClass("cybersec-phishing-6");
    $(".phishing-07").addClass("cybersec-phishing-7");
    $(".phishing-08").addClass("cybersec-phishing-8");
    $(".phishing-09").addClass("cybersec-phishing-9");
    $(".phishing-10").addClass("cybersec-phishing-10");
    $(".phishing-11").addClass("cybersec-phishing-11");
    $(".phishing-12").addClass("cybersec-phishing-12");
    $(".phishing-13").addClass("cybersec-phishing-13");
    $(".phishing-14").addClass("cybersec-phishing-14");
    $(".phishing-15").addClass("cybersec-phishing-15");
  }

  function unsafe_svgs() {
    if (svgInView || svgTriggered) return;
    $(".unsafe-01").addClass("cybersec-unsafe-1");
    $(".unsafe-02").addClass("cybersec-unsafe-2");
    $(".unsafe-03").addClass("cybersec-unsafe-3");
    $(".unsafe-04").addClass("cybersec-unsafe-4");
    $(".unsafe-05").addClass("cybersec-unsafe-5");
    $(".unsafe-06").addClass("cybersec-unsafe-6");
    $(".unsafe-07").addClass("cybersec-unsafe-7");
    $(".unsafe-08").addClass("cybersec-unsafe-8");
    $(".unsafe-09").addClass("cybersec-unsafe-9");
    $(".unsafe-10").addClass("cybersec-unsafe-10");
    $(".unsafe-11").addClass("cybersec-unsafe-11");
    $(".unsafe-12").addClass("cybersec-unsafe-12");
    $(".unsafe-13").addClass("cybersec-unsafe-13");
  }

  function identityChart() {
    if (identityInView || identityIsTriggered) return;

    identityInView = true;
    identityIsTriggered = true;

    Chart.defaults.global.legend.display = false;
    // Chart.canvas.style.height = '128px';
    // Chart.canvas.parentNode.style.width = '128px';
    var ctx = document.getElementById("identity-chart");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Users", "Non-users"],
        datasets: [
          {
            backgroundColor: ["#0093B5", "#003444"],
            data: [83, 17]
          }
        ]
      },
      options: {
        cutoutPercentage: 80,
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }); // END identity chart
  }

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return elemTop <= docViewBottom && elemBottom >= docViewTop;
  }

  $(".col-md-3").css({ display: "grid", "justify-content": "center" });

  if (window.matchMedia("(max-width: 1024px)").matches) {
    $(".pv14").css("bottom", "4%");
    $(".pv55").css("bottom", "-10%");
  }
  if (window.matchMedia("(max-width: 991px)").matches) {
    $(".pv61").css("bottom", "7%");
    $(".pv14").css("bottom", "10%");
    $(".pv60").css("bottom", "3%");
    $(".pv55").css("bottom", "-11%");
  }
  if (window.matchMedia("(max-width: 767px)").matches) {
    $(".pv61").css("bottom", "0%");
    $(".pv14").css("bottom", "0%");
  }
  if (window.matchMedia("(max-width: 368px)").matches) {
    $(".pv14").css("bottom", "7%");
  }
  if (window.matchMedia("(max-width: 361px)").matches) {
    $(".pv60").css("bottom", "9%");
  }
});
