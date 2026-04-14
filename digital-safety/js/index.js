$(document).ready(function() {
  $(".view-guide-btn").on("click", function(e) {
    e.preventDefault();
    window.location.href = "https://parent.guide/to-the-internet/access/";
    return false;
  });
  $(".test-knowledge-btn").on("click", function(e) {
    e.preventDefault();
    window.location.href =
      "https://parent.guide/to-the-internet/digital-safety-quiz/";
    return false;
  });
  if (window.matchMedia("(height: 1366px)").matches) {
    $(".category-wrap .content").css("padding", "150px 50px");
    $(".category-wrap footer").css("padding", "50px 10px");
    $(".category-wrap .inner-wrap .text-content").css("padding-bottom", "50px");
  }
  if (window.matchMedia("(max-width: 1060px)").matches) {
    $(".category-wrap").css("height", "auto");
  }
  if (window.matchMedia("(max-width: 1050px)").matches) {
    $(".content").css("padding", "30px 90px");
  }
  if (window.matchMedia("(max-width: 1026px)").matches) {
    $(".content").css("padding", "30px 80px");
  }
  if (window.matchMedia("(width: 1024px) and (height: 1366px)").matches) {
    $(".category-wrap").css("height", "100vh");
    $(".category-wrap .content").css("padding", "150px 50px");
  }
  if (window.matchMedia("(height: 1024px)").matches) {
    $(".category-wrap .content").css("padding", "130px 50px");
    $(".category-wrap").css("height", "100vh");
  }
  if (window.matchMedia("(max-width: 1003px)").matches) {
    $(".content").css("padding", "30px 70px");
  }
  if (window.matchMedia("(max-width: 981px)").matches) {
    $(".content").css("padding", "30px 60px");
  }
  if (window.matchMedia("(max-width: 877px)").matches) {
    $(".category-wrap .parent-guide").css("width", "95%");
  }
  if (window.matchMedia("(height: 768px)").matches) {
    $(".category-wrap .content").css("padding", "30px");
    $(".category-wrap .inner-wrap").css({
      height: "100%",
      width: "100%"
    });
    $(".category-wrap .parent-guide").css("width", "30%");
  }
  if (window.matchMedia("(width: 768px)").matches) {
    $(".category-wrap .content").css("padding", "100px 50px");
  }
  if (window.matchMedia("(max-height: 750px)").matches) {
    $(".category-wrap").css("height", "auto");
  }
  if (window.matchMedia("(height: 736px)").matches) {
    $(".category-wrap .content").css("padding", "60px 50px");
  }
  if (window.matchMedia("(height: 821px)").matches) {
    $(".category-wrap footer p").css("padding", "35px 60px");
  }
});
