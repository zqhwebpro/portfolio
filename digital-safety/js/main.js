$(document).ready(function() {
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

  let scroll_link = $(".scroll");

  // smooth scrolling -----------------------
  scroll_link.click(function(e) {
    e.preventDefault();
    let url = $("body")
      .find($(this).attr("href"))
      .offset().top;
    $("html, body").animate(
      {
        scrollTop: url
      },
      700
    );
    $(this)
      .parent()
      .addClass("active");
    $(this)
      .parent()
      .siblings()
      .removeClass("active");
    return false;
  });

  var computerInView = false,
    gamingInView = false,
    phoneInView = false,
    progress68InView = false,
    progress4InView = false,
    progress24InView = false,
    progress11InView = false,
    progress95InView = false;
  var iScrollPos = 0,
    dir = "down";

  var computerTriggered = false,
    gamingTriggered = false,
    phoneTriggered = false,
    progress68Triggered = false,
    progress4Triggered = false,
    progress24Triggered = false,
    progress11Triggered = false,
    progress95Triggered = false;
  $(window).bind("scroll", function() {
    var iCurScrollPos = $(this).scrollTop();

    if (iCurScrollPos > iScrollPos) {
      dir = "down";
    } else {
      dir = "up";
    }

    iScrollPos = iCurScrollPos;

    if (isScrolledIntoView("#computer-pie")) {
      if (dir === "down") computerPie();
    } else {
      computerInView = false;
    } // end computer

    if (isScrolledIntoView("#gaming-pie")) {
      if (dir === "down") gamingPie();
    } else {
      gamingInView = false;
    } // end gaming

    if (isScrolledIntoView("#phone-pie")) {
      if (dir === "down") phonePie();
    } else {
      phoneInView = false;
    } // end phone

    if (isScrolledIntoView(".progress-bar68")) {
      if (dir === "down") progress68();
    } else {
      progress68InView = false;
    }

    if (isScrolledIntoView(".progress-bar4")) {
      if (dir === "down") progress4();
    } else {
      progress4InView = false;
    }

    if (isScrolledIntoView(".progress-bar24")) {
      if (dir === "down") progress24();
    } else {
      progress24InView = false;
    }

    if (isScrolledIntoView(".progress-bar11")) {
      if (dir === "down") progress11();
    } else {
      progress11InView = false;
    }

    if (isScrolledIntoView(".progress-bar95")) {
      if (dir === "down") progress95();
    } else {
      progress95InView = false;
    }
  });

  function progress68() {
    if (progress68InView || progress68Triggered) return;

    $(".progress-bar68").addClass("animate68");
    $(".val68").addClass("progress-value68");
  }

  function progress4() {
    if (progress4InView || progress4Triggered) return;

    $(".progress-bar4").addClass("animate4");
    $(".val4").addClass("progress-value4");
  }

  function progress24() {
    if (progress24InView || progress24Triggered) return;

    $(".progress-bar24").addClass("animate24");
    $(".val24").addClass("progress-value24");
  }

  function progress11() {
    if (progress11InView || progress11Triggered) return;

    $(".progress-bar11").addClass("animate11");
    $(".val11").addClass("progress-value11");
  }

  function progress95() {
    if (progress95InView || progress95Triggered) return;

    $(".progress-bar95").addClass("animate95");
    $(".val95").addClass("progress-value95");
  }

  function computerPie() {
    if (computerInView || computerTriggered) return;

    computerInView = true;
    computerTriggered = true;
    var ctx = document.getElementById("computer-pie");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Users", "Non-users"],
        datasets: [
          {
            backgroundColor: ["#C00010", "#7d0201"],
            data: [72, 28]
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
        tooltips: {
          enabled: false
        }
      }
    });
  } // END computerPie

  function gamingPie() {
    if (gamingInView || gamingTriggered) return;

    gamingInView = true;
    gamingTriggered = true;
    var ctx = document.getElementById("gaming-pie");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Users", "Non-users"],
        datasets: [
          {
            backgroundColor: ["#C00010", "#7d0201"],
            data: [67, 33]
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
        tooltips: {
          enabled: false
        }
      }
    });
  } // END gamingPie

  function phonePie() {
    if (phoneInView || phoneTriggered) return;

    phoneInView = true;
    phoneTriggered = true;
    var ctx = document.getElementById("phone-pie");
    var myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Users", "Non-users"],
        datasets: [
          {
            backgroundColor: ["#C00010", "#7d0201"],
            data: [40, 60]
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
        tooltips: {
          enabled: false
        }
      }
    });
  } // END phonePie

  Chart.defaults.global.legend.display = false;
  var ctx = document.getElementById("pie-chart1");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Users", "Non-users"],
      datasets: [
        {
          backgroundColor: ["#C00010", "#7d0201"],
          data: [98, 2]
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
      tooltips: {
        enabled: false
      }
    }
  });
  var ctx = document.getElementById("pie-chart2");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Users", "Non-users"],
      datasets: [
        {
          backgroundColor: ["#C00010", "#7d0201"],
          data: [10, 90]
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
      tooltips: {
        enabled: false
      }
    }
  });
  var ctx = document.getElementById("pie-chart3");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Users", "Non-users"],
      datasets: [
        {
          backgroundColor: ["#C00010", "#7d0201"],
          data: [42, 58]
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

      tooltips: {
        enabled: false
      }
    }
  });
  var ctx = document.getElementById("pie-chart4");
  var myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Users", "Non-users"],
      datasets: [
        {
          backgroundColor: ["#C00010", "#7d0201"],
          data: [29, 71]
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
      tooltips: {
        enabled: false
      }
    }
  });

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return elemTop <= docViewBottom && elemBottom >= docViewTop;
  }

  // if ( window.matchMedia("(min-width: 768px) and (max-width: 799px").matches) {
  //   $('.tex10').css("padding-bottom", "33px");
  // }
});
