<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.js" integrity="sha256-yNbKY1y6h2rbVcQtf0b8lq4a+xpktyFc3pSYoGAY1qQ=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js" integrity="sha256-UOSXsAgYN43P/oVrmU+JlHtiDGYWN2iHnJuKY9WD+Jg=" crossorigin="anonymous"></script>
<script src="<?php echo WEBURLROOT; ?>lib/js/ruhuman/ruhuman.min.js"></script>

<script>
$('.dropdown').on('show.bs.dropdown', function () {
    $(this).siblings('.open').removeClass('open').find('a.dropdown-toggle').attr('data-toggle', 'dropdown');
    $(this).find('a.dropdown-toggle').removeAttr('data-toggle');
});

// Telephone Numbers
$(function(){
    // scroll to
    $.fn.scrollView = function () {
        return this.each(function () {
            $('html, body').animate({
                scrollTop: ( $(this).offset().top )
            }, 1000);
        });
    }

    $.fn.scrollViewFast = function () {
        return this.each(function () {
            $('html, body').animate({
                scrollTop: ( $(this).offset().top )
            }, 200);
        });
    }

    <?php
    if( $_GET['scroll'] != "") {
        echo "$('#" . $_GET['scroll'] . "').scrollView();";
    }
    ?>
});
</script>
