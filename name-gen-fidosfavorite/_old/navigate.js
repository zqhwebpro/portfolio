$(document).ready(function() {

  $(document).on('click', '.get-started', function () {
    $(".pup-options").addClass("z-front fade-in-bottom");
  });

  $(document).on('click', '.fa-times--filter', function () {
    $(".pup-name").addClass("z-front fade-in-top");
    $(".pup-options").removeClass("z-front fade-in-bottom fade-in-top");
  });

  $(document).on('click', '.show-me', function () {
    $(".pup-options").removeClass("z-front fade-in-bottom fade-in-top");
    $(".pup-name").addClass("z-front fade-in-top");
  });

  $(document).on('click', '.try-again', function () {
    $(".pup-name").addClass("z-front");
  });

  $(document).on('click', '.filter', function () {
    $(".pup-name").removeClass("z-front fade-in-top");
    $(".pup-options").addClass("z-front fade-in-top");
  });

  $(document).on('click', '.fa-times--list', function () {
    $(".pup-list").removeClass("z-front fade-in-bottom");
    $(".pup-name").addClass("z-front fade-in-top");
  });

  $(document).on('click', '.my-list-link', function() {
    $(".pup-name").removeClass("z-front fade-in-top");
    $(".pup-list").addClass("z-front fade-in-bottom");
  });

  $(document).on('click', '.radio-buttons label', function(){
    $(this).toggleClass("radio-buttons-selected");
    return false;
  });

  $(document).on('click', '.radio-no-radio label', function () {
    $(this).toggleClass("radio-buttons-selected");
    return false;
  });
 
});