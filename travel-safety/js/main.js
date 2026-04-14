$(document).ready(function($) {
  $(window).resize(function() {
    if ($("#homeSubmenu")) {
      sidebarResponsiveness();
    }
    if ($(window)) {
      // innerResponsiveness();
    }
  });

  $(window).ready(function() {
    if ($(window)) {
      // winReady();
    }
  });
  var controller = new ScrollMagic.Controller();

  var scene = new ScrollMagic.Scene({
    triggerElement: "#icon-01",
    duration: 200
  })
    .setClassToggle("#icon-01", "design")
    .addTo(controller);

  var scene = new ScrollMagic.Scene({
    triggerElement: "#icon-02",
    duration: 200
  })
    .setClassToggle("#icon-02", "design")
    .addTo(controller);

  var scene = new ScrollMagic.Scene({
    triggerElement: "#icon-03",
    duration: 200
  })
    .setClassToggle("#icon-03", "design")
    .addTo(controller);

  var scene = new ScrollMagic.Scene({
    triggerElement: "#icon-04",
    duration: 200
  })
    .setClassToggle("#icon-04", "design")
    .addTo(controller);

  var scene = new ScrollMagic.Scene({
    triggerElement: "#icon-05",
    duration: 200
  })
    .setClassToggle("#icon-05", "design")
    .addTo(controller);

  var scene = new ScrollMagic.Scene({
    triggerElement: ".last-icon",
    duration: 200
  })
    .setClassToggle(".last-icon", "design")
    .addTo(controller);

  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $("#scroll").fadeIn();
    } else {
      $("#scroll").fadeOut();
    }
  });
  $("#scroll").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });

  $(".main-launch").on("click", function(e) {
    e.preventDefault();
    $(".main-launch").fadeOut(1000);
    $(".main-wrapper").fadeIn(1000);
    sidebarResponsiveness();
    return false;
  });

  unclick = function() {
    return false;
  };

  if ($(window).width() <= 850) {
    $('[data-toggle="tooltip"]').on("click", function() {
      $('[data-toggle="tooltip"]').tooltip("hide");
    });
  } else {
    $('[data-toggle="tooltip"]').tooltip();
  }

  $("#homeSubmenu .item").on("click", function() {
    $(this).toggleClass("clicked");
  });

  // When the carousel slides, auto update the text
  $("#carouselExampleControls").on("slid", function(e) {
    var id = $(".item.active").data("slide-number");
    $("#carousel-text").html($("#slide-content-" + id).html());
  });

  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $("#sidebarCollapse").on("click", function() {
    $("#sidebar, #content").toggleClass("active");
    $(".collapse.in").toggleClass("in");
  });

  $(".mainCollapseMenuWrap .item").on("click", function() {
    $(".mainCollapseMenuWrap").removeClass("show");
  });

  let scroll_link = $(".scroll");

  //smooth scrolling -----------------------
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

  var pieChartInView = false,
    chartRightInView = false,
    chartLeftInView = false,
    chartfatalInView = false,
    chartdressInView = false;

  var iScrollPos = 0,
    dir = "down";

  var animatePieChartTriggered = false,
    animateChartRightTriggered = false,
    animateChartLeftTriggered = false,
    animateChartfatalTriggered = false,
    animateChartDressTriggered = false;

  $(window).bind("scroll", function() {
    var iCurScrollPos = $(this).scrollTop();

    if (iCurScrollPos > iScrollPos) {
      //Scrolling Down
      dir = "down";
    } else {
      //Scrolling Up
      dir = "up";
    }

    iScrollPos = iCurScrollPos;

    if (isScrolledIntoView("#pie-chart1")) {
      if (dir === "down") animatePieChart();
    } else {
      pieChartInView = false;
    } // end piechart

    if (isScrolledIntoView("#chartRight")) {
      if (dir === "down") animateChartRight();
    } else {
      chartRightInView = false;
    } // end chartRight

    if (isScrolledIntoView("#chartLeft")) {
      if (dir === "down") animateChartLeft();
    } else {
      chartLeftInView = false;
    } // end chartLeft

    if (isScrolledIntoView("#chartfatal")) {
      if (dir === "down") animateChartfatal();
    } else {
      chartfatalInView = false;
    } // end chartfatal

    if (isScrolledIntoView("#chart-dress")) {
      if (dir === "down") animateChartDress();
    } else {
      chartdressInView = false;
    } // end chartdress
  });

  // }

  function animatePieChart() {
    if (pieChartInView || animatePieChartTriggered) return;

    pieChartInView = true;
    animatePieChartTriggered = true;
    // PIE CHARTS CONFIGS
    var pieChartsDataValues = [
      { label: "Gen Z", value: 23, color: "#3b6167" },
      { label: "Millenials", value: 19, color: "#5b8a8f" },
      { label: "Gen X", value: 12, color: "#94c4ce" },
      { label: "Boomers", value: 19, color: "#bfe5ec" }
    ];

    for (var i = 0; i < pieChartsDataValues.length; i++) {
      // pieChartsDataValues[i]

      var chartOptions = {
        cutoutPercentage: 80,
        legend: {
          position: "bottom",
          padding: 5,
          labels: { pointStyle: "circle", usePointStyle: true }
        }
      };

      var chart = {
        labels: [pieChartsDataValues[i].label, ""],
        datasets: [
          {
            backgroundColor: [pieChartsDataValues[i].color, "#383838"],
            borderWidth: 0,
            data: [pieChartsDataValues[i].value, 100]
          }
        ]
      };
      Chart.defaults.global.legend.display = false;

      var chChart = document.getElementById("pie-chart" + (i + 1));
      if (chChart) {
        new Chart(chChart, {
          type: "pie",
          data: chart,
          options: chartOptions
        });
      }
    } // END FOR
  } // END animatePieChartTriggered

  function animateChartRight() {
    if (chartRightInView || animateChartRightTriggered) return;

    chartRightInView = true;
    animateChartRightTriggered = true;
    var ctx = document.getElementById("chartRight");

    Chart.defaults.scale.gridLines.display = false;
    Chart.defaults.global.legend.display = false;
    Chart.defaults.scale.ticks.beginAtZero = true;

    var chartRight = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Gen Z (18-23)",
          "Millenials (24-35)",
          "Gen X (36-55)",
          "Boomers (56+)"
        ],
        datasets: [
          {
            label: "Last Vacation Duration in Days",
            data: [6.6, 6.2, 6.4, 7.8],
            backgroundColor: [
              "rgba(59, 97, 103)",
              "rgba(91, 138, 143)",
              "rgba(148, 196, 206)",
              "rgba(191, 229, 236)"
            ]
          }
        ]
      },

      options: {
        scales: {
          xAxes: [
            {
              display: false,
              ticks: {
                display: false
              }
            }
          ],
          yaxes: [
            {
              display: false
            }
          ]
        }
      }
    });
  } // END animateChartRight

  function animateChartLeft() {
    if (chartLeftInView || animateChartLeftTriggered) return;

    chartLeftInView = true;
    animateChartLeftTriggered = true;
    var ctx = document.getElementById("chartLeft");

    Chart.defaults.scale.gridLines.display = false;
    Chart.defaults.global.legend.display = false;
    Chart.defaults.scale.ticks.beginAtZero = true;

    var chartLeft = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Gen Z (18-23)",
          "Millenials (24-35)",
          "Gen X (36-55)",
          "Boomers (56+)"
        ],
        datasets: [
          {
            label: "Total Number of Trips Taken per Year",
            data: [4.4, 5.6, 4.0, 3.5],
            backgroundColor: [
              "rgba(59, 97, 103)",
              "rgba(91, 138, 143)",
              "rgba(148, 196, 206)",
              "rgba(191, 229, 236)"
            ]
          }
        ]
      },

      options: {
        scales: {
          xAxes: [
            {
              display: false,
              ticks: {
                display: false
              }
            }
          ],
          yaxes: [
            {
              display: false,
              gridLines: {
                display: false
              },
              ticks: {
                scaleLineColor: "transparent",
                display: false
              }
            }
          ]
        }
      }
    });
  } // END animateChartLeft

  function animateChartfatal() {
    if (chartfatalInView || animateChartfatalTriggered) return;

    chartfatalInView = true;
    animateChartfatalTriggered = true;

    var ctx = document.getElementById("chartfatal");

    if (window.matchMedia("(max-width: 525px)").matches) {
      Chart.defaults.global.defaultFontSize = 12;
      Chart.defaults.global.legend.display = false;
    }
    if (window.matchMedia("(max-width: 900px)").matches) {
      Chart.defaults.global.defaultFontSize = 15;
      Chart.defaults.global.legend.display = false;
    } else {
      Chart.defaults.global.defaultFontColor = "#000000";
      Chart.defaults.global.defaultFontSize = 18;
      Chart.defaults.global.legend.display = false;
      Chart.defaults.scale.ticks.beginAtZero = true;
    }

    var chartfatal = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Libya",
          "Thailand",
          "Malawi",
          "Liberia",
          ["Democratic", "Republic of", "Congo"]
        ],
        datasets: [
          {
            data: [73.4, 36.2, 35, 33.7, 33.2],
            backgroundColor: [
              "#94c4ce",
              "#94c4ce",
              "#94c4ce",
              "#94c4ce",
              "#94c4ce"
            ]
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "#000000",
                display: false
              },
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: "#000000",
                display: false
              },
              ticks: {
                beginAtZero: true,
                steps: 10,
                min: 0,
                max: 80
              }
            }
          ]
        }
      }
    });
  } // END animateChartfatal

  function animateChartDress() {
    if (chartdressInView || animateChartDressTriggered) return;

    chartdressInView = true;
    animateChartDressTriggered = true;

    var ctx = document.getElementById("chart-dress");

    if ($(window).width() <= 767) {
      Chart.defaults.global.defaultFontSize = 12;
    }
    if ($(window).width() <= 450) {
      Chart.defaults.global.defaultFontSize = 10;
    } else {
      Chart.defaults.global.defaultFontColor = "#000000";
      Chart.defaults.global.defaultFontSize = 13;
      Chart.defaults.global.legend.display = false;
      Chart.defaults.scale.ticks.beginAtZero = true;
      Chart.defaults.scale.gridLines.display = false;
    }

    var chartdress = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Egypt",
          "Pakistan",
          "Iraq",
          ["Saudi", "Arabia"],
          "Lebanon",
          "Turkey",
          "Tunisia"
        ],
        datasets: [
          {
            data: [14, 22, 27, 47, 49, 52, 56],
            backgroundColor: [
              "#94c4ce",
              "#94c4ce",
              "#94c4ce",
              "#94c4ce",
              "#94c4ce",
              "#94c4ce",
              "#94c4ce"
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                color: "#000000",
                display: false
              },
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                max: 100
              }
            }
          ]
        }
      }
    });
  } // END animateChartDress

  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return elemTop <= docViewBottom && elemBottom >= docViewTop;
  }

  function sidebarResponsiveness() {
    var sidebarHeight = $("#homeSubmenu").height();

    var iconHeight = sidebarHeight / 9 - 10;

    var listCSS = $("#homeSubmenu li").css({
      height: iconHeight,
      width: iconHeight,
      margin: "8px auto"
    });

    $("#homeSubmenu li").css({
      height: iconHeight,
      width: iconHeight,
      margin: "20px auto"
    });
    $("#homeSubmenu .item img").css({ padding: "15%" });

    if (sidebarHeight <= 785) {
      iconHeight = sidebarHeight / 9 - 10;
      $("#homeSubmenu li").css({
        height: iconHeight,
        width: iconHeight,
        margin: "10px auto"
      });
      $("#homeSubmenu .item img").css({ padding: "15%" });
    }

    if (sidebarHeight <= 460) {
      iconHeight = sidebarHeight / 10 - 5;
      listCSS;
      $("#homeSubmenu .item img").css({ padding: "20%" });
    }

    if (sidebarHeight <= 375) {
      iconHeight = sidebarHeight / 10 - 5;
      $(".trekbible-logo").css({ padding: "0 0" });
      listCSS;
      $("#homeSubmenu .item img").css({ padding: "20%" });
    }
  }

  //jQuery.fn.center = function() {
  //  var container = $(window);
  //  var top = -this.height() / 2;
  //  var bottom = -this.height() / 2;
  //  var left = -this.width() / 2;
  //  var right = -this.width() / 2;
  //  return this.css("position", "absolute").css({
  //    "margin-left": left + "px",
  //    "margin-top": top + "px",
  //    "margin-right": right + "px",
  //    "margin-bottom": bottom + "px",
  //    left: "50%",
  //    top: "50%",
  //    right: "50%",
  //    bottom: "50%"
  //  });
  //};
  //$(".main-launch .content").center();
});
