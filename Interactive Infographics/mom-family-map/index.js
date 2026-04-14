$(function() {
  $(document).on("click", ".land", function() {
    $(".land").removeClass("land-active");
    $(this).addClass("land-active");
  });

  $.getJSON("data.json", function(json) {
    json.STATE.forEach((state, index) => {
      const $stateEl = $(`path[title="${state}"]`);
      $stateEl.attr("data-state", json.STATE[index]);
      $stateEl.attr("data-rank", json.RANK[index]);
      $stateEl.attr("data-index", json.INDEX[index]);
      $stateEl.attr("data-ur_rating", json.UR_RATING[index]);
      $stateEl.attr("data-ur_rank", json.UR_RANK[index]);
      $stateEl.attr("data-cr", json.CR[index]);
      $stateEl.attr("data-cr_rating", json.CR_RATING[index]);
      $stateEl.attr("data-er_rank", json.ER_RANK[index]);
    });
  });

  $("path").click(function() {
    $("#data-state h2 > span")
      .text(this.dataset.state)
      .addClass("dancefade");
    $("#data-rank h4 > span")
      .text(this.dataset.rank)
      .addClass("dancefade")
      .delay(300)
      .queue(function() {
        $(this)
          .removeClass("dancefade")
          .dequeue();
      });
    $("#data-index h4 > span")
      .text(this.dataset.index)
      .addClass("dancefade")
      .delay(300)
      .queue(function() {
        $(this)
          .removeClass("dancefade")
          .dequeue();
      });
    $("#data-ur_rating h4 > span")
      .text(this.dataset.ur_rating)
      .addClass("dancefade")
      .delay(300)
      .queue(function() {
        $(this)
          .removeClass("dancefade")
          .dequeue();
      });
    $("#data-ur_rank h4 > span")
      .text(this.dataset.ur_rank)
      .addClass("dancefade")
      .delay(300)
      .queue(function() {
        $(this)
          .removeClass("dancefade")
          .dequeue();
      });
    $("#data-cr h4 > span")
      .text(this.dataset.cr)
      .addClass("dancefade")
      .delay(300)
      .queue(function() {
        $(this)
          .removeClass("dancefade")
          .dequeue();
      });
    $("#data-cr_rating h4 > span")
      .text(this.dataset.cr_rating)
      .addClass("dancefade")
      .delay(300)
      .queue(function() {
        $(this)
          .removeClass("dancefade")
          .dequeue();
      });
    $("#data-er_rank h4 > span")
      .text(this.dataset.er_rank)
      .addClass("dancefade")
      .delay(300)
      .queue(function() {
        $(this)
          .removeClass("dancefade")
          .dequeue();
      });
  });
});
