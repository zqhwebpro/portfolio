$(document).ready(function () {
  // Clicking the menu on the left with remove limbo toggle
  $(document).on("click", ".trail-left-bar-nav li a", function () {
    //$(".trail-records-position").removeClass("trail-records-slide");
    //$(".trail-map-cont").removeClass("trail-map-width-minus");
  });

  const commonState = () => {
    $(".trail-top-bar-cont").addClass("trail-top-slide-down slide-in-top").removeClass("slide-in-top");
    $("image").removeClass("display-show");
    //$(".trail-right-bar-cont").removeClass("trail-right-width-plus");
    $(".trail-top-bar-cont").addClass("slide-in-top");
    let windowSize = $(window).width();
    if (windowSize >= 991.99) {
      //$(".trail-map-cont").addClass("map-marg-neg");
      //$(".trail-map svg").removeClass("marg-reset");
      //$(".trail-map").removeClass("trail-map-mobile");
      //$(".trail-map").removeClass("trail-map-mobile--record");
      $(".trail-right-bar-cont").removeClass("slide-in-right");
      $(".trail-records-bar-cont").removeClass("slide-in-bottom");
    } else {
      $(".trail-left-bar-cont").removeClass("display-show");
      //$(".trail-map-cont").removeClass("frank-the-hamburg-tank");
      $(".trail-top-bar-cont").removeClass("ricky-hamburgby");
      //$(".trail-map").removeClass("trail-map-mobile");
    }
  };

  $(document).on("click", ".adt-trail", function (e) {
    commonState();
    $("image.adt-trail").addClass("display-show");
    e.preventDefault();
  });
  $(".adt-trail").hover(function () {
    $("image.adt-trail").removeClass("trail-path");
  }, function () {
    $("image.adt-trail").addClass("trail-path");
  }
  );

  $(document).on("click", ".nct-trail", function (e) {
    commonState();
    $("image.nct-trail").addClass("display-show");
    e.preventDefault();
  });
  $(".nct-trail").hover(function () {
    $("image.nct-trail").removeClass("trail-path");
  }, function () {
    $("image.nct-trail").addClass("trail-path");
  }
  );

  $(document).on("click", ".pct-trail", function (e) {
    commonState();
    $("image.pct-trail").addClass("display-show");
    e.preventDefault();
  });
  $(".pct-trail").hover(function () {
    $("image.pct-trail").removeClass("trail-path");
  }, function () {
    $("image.pct-trail").addClass("trail-path");
  }
  );

  $(document).on("click", ".gwl-trail", function (e) {
    commonState();
    $("image.gwl-trail").addClass("display-show");
    e.preventDefault();
  });
  $(".gwl-trail").hover(function () {
    $("image.gwl-trail").removeClass("trail-path");
  }, function () {
    $("image.gwl-trail").addClass("trail-path");
  }
  );

  $(document).on("click", ".at-trail", function (e) {
    commonState();
    $("image.at-trail").addClass("display-show");
    e.preventDefault();
  });
  $(".at-trail").hover(function () {
    $("image.at-trail").removeClass("trail-path");
  }, function () {
    $("image.at-trail").addClass("trail-path");
  }
  );

  $(document).on("click", ".cdt-trail", function (e) {
    commonState();
    $("image.cdt-trail").addClass("display-show");
    e.preventDefault();
  });
  $(".cdt-trail").hover(function () {
    $("image.cdt-trail").removeClass("trail-path");
  }, function () {
    $("image.cdt-trail").addClass("trail-path");
  }
  );

  //TODO: Closes And Removes Limbo States
  // Right bar Corner X
  $(document).on("click", ".fa-times-right-bar", function () {
    let windowSize = $(window).width();
    if (windowSize >= 991.99) {
      $(".trail-records-position").removeClass("trail-records-slide");
      $(".trail-right-bar-cont").removeClass("trail-right-width-plus");
      $(".trail-map-cont").removeClass("trail-map-width-minus");
      $(".trail-map").removeClass("trail-map-mobile");
      $(".trail-map").removeClass("trail-map-mobile--record");
      $(".trail-right-bar-cont").removeClass("slide-in-right");
    } else {
      $(".trail-right-bar-cont").removeClass("slide-in-bottom");
      $(".trail-records-position").removeClass("trail-records-slide-up");
      $(".trail-right-bar-cont").removeClass("trail-right-top-plus");
      $(".trail-map svg").removeClass("svg-resize");
    }
  });

  $(document).on("click", ".trail-records-position", function (e) {
    let windowSize = $(window).width();
    if (windowSize >= 991.99) {
      $(".trail-right-bar-cont").toggleClass(
        "slide-in-right trail-right-width-plus"
      );
      $(".trail-right-bar-cont").addClass(
        "trail-right-width-plus"
      );
      $(".trail-map-cont").toggleClass("trail-map-width-minus");
      $(".trail-map").toggleClass("trail-map-mobile--record");
    } else {
      $(".trail-right-bar-cont").addClass("slide-in-bottom");
      $(".trail-right-bar-cont").toggleClass("trail-right-top-plus");
      $(".trail-records-position").toggleClass("trail-records-slide-up");
      $(".trail-left-bar-cont").removeClass("display-show");
    }
    e.preventDefault();
  });

  // Responsive Limbo Toggle Catchers
  $(window).resize(function () {
    if ($(window).width() < 991.99) {
      $(".trail-records-position").removeClass("trail-records-slide");
      $(".trail-right-bar-cont").removeClass("trail-right-width-plus");
      $(".trail-map-width-minus").removeClass("trail-map-width-minus");
      $(".trail-map svg").removeClass("svg-resize");
      $(".trail-map").removeClass("trail-map-mobile--record");
      $(".trail-top-bar-cont").removeClass("slide-in-top");
      $(".trail-right-bar-cont").removeClass("slide-in-bottom");
    } else {
      $(".trail-top-bar-cont").removeClass("slide-in-top");
      $(".trail-map").removeClass("trail-map-mobile");
      $(".trail-records-position").removeClass("trail-records-slide-up");
      $(".trail-top-bar-cont").removeClass("ricky-hamburgby");
      $(".trail-left-bar-cont").removeClass("display-show");
      $(".trail-map-cont").removeClass("frank-the-hamburg-tank");
      $(".trail-right-bar-cont").removeClass("trail-right-top-plus");
      $(".trail-map svg").addClass("svg-resize");
    }
  });

  $(document).on("click", ".ron-hamburgundy", function (e) {
    $(".trail-left-bar-cont").toggleClass("display-show");
    $(".trail-map-cont").toggleClass("frank-the-hamburg-tank");
    $(".trail-map").toggleClass("trail-map-mobile");
    $(".trail-top-bar-cont").toggleClass("ricky-hamburgby");
    $(".trail-right-bar-cont").removeClass("trail-right-top-plus");
    $(".trail-records-position").removeClass("trail-records-slide-up");
    e.preventDefault();
  });

  //TODO: Condense
  $.getJSON("json/trail-data.json", function (json) {



    $(document).on("click", ".adt-trail", function () {
      $(".trail-top-bar-name h2").html(json.TRAIL[0]);
      $(".dis").html(json.DIS[0]);
      $(".hp").html(json.HP[0]);
      $(".lp").html(json.LP[0]);
      $(".fact").html(json.FACT[0]);
      $(".record").html(json.RECORD[0]);
    });
    $(document).on("click", ".cdt-trail", function () {
      $(".trail-top-bar-name h2").html(json.TRAIL[3]);
      $(".dis").html(json.DIS[3]);
      $(".hp").html(json.HP[3]);
      $(".lp").html(json.LP[3]);
      $(".fact").html(json.FACT[3]);
      $(".record").html(json.RECORD[3]);
    });
    $(document).on("click", ".pct-trail", function () {
      $(".trail-top-bar-name h2").html(json.TRAIL[2]);
      $(".dis").html(json.DIS[2]);
      $(".hp").html(json.HP[2]);
      $(".lp").html(json.LP[2]);
      $(".fact").html(json.FACT[2]);
      $(".record").html(json.RECORD[2]);
    });
    $(document).on("click", ".gwl-trail", function () {
      $(".trail-top-bar-name h2").html(json.TRAIL[4]);
      $(".dis").html(json.DIS[4]);
      $(".hp").html(json.HP[4]);
      $(".lp").html(json.LP[4]);
      $(".fact").html(json.FACT[4]);
      $(".record").html(json.RECORD[4]);
    });
    $(document).on("click", ".at-trail", function () {
      $(".trail-top-bar-name h2").html(json.TRAIL[5]);
      $(".dis").html(json.DIS[5]);
      $(".hp").html(json.HP[5]);
      $(".lp").html(json.LP[5]);
      $(".fact").html(json.FACT[5]);
      $(".record").html(json.RECORD[5]);
    });
    $(document).on("click", ".nct-trail", function () {
      $(".trail-top-bar-name h2").html(json.TRAIL[6]);
      $(".dis").html(json.DIS[6]);
      $(".hp").html(json.HP[6]);
      $(".lp").html(json.LP[6]);
      $(".fact").html(json.FACT[6]);
      $(".record").html(json.RECORD[6]);
    });
  });
});