function socialMedia() {
  $(document).on('click', '.social-share', function () {
    $('.modal-container').addClass('modal-container-bg');
    $('.social-share-modal').addClass('fade-in social-share-modal-backdrop');
  });
  $(document).on('click', '.modal-close', function () {
    $('.modal-container').removeClass('modal-container-bg');
    $('.social-share-modal').removeClass('fade-in social-share-modal-backdrop');  
  });
}
socialMedia();