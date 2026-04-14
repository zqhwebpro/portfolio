<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.js" integrity="sha256-yNbKY1y6h2rbVcQtf0b8lq4a+xpktyFc3pSYoGAY1qQ=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js" integrity="sha256-UOSXsAgYN43P/oVrmU+JlHtiDGYWN2iHnJuKY9WD+Jg=" crossorigin="anonymous"></script>
<script src="<?php echo WEBURLROOT; ?>js/ruhuman/ruhuman.min.js"></script>
<script src="<?php echo WEBURLROOT; ?>js/bootstrap-hover-dropdown.min.js" type="text/JavaScript"></script>

<script>
$('.dropdown').on('show.bs.dropdown', function () {
    $(this).siblings('.open').removeClass('open').find('a.dropdown-toggle').attr('data-toggle', 'dropdown');
    $(this).find('a.dropdown-toggle').removeAttr('data-toggle');
});

// call me form
$(function() {
    $('#frmContact').ruhuman({
        checkin: WEBROOT + 'js/ruhuman/ajax.php'
    });

    $('#frmContact').validate({
        rules: {
            'firstname': 'required',
            'lastname': 'required',
            'location': 'required',
            'email': 'required',
            'phone': 'required',
            'calltime': 'required',
            'message': 'required'
        },
        messages: {
            'firstname': 'Please enter your first name',
            'lastname': 'Please enter your last name',
            'location': 'Please enter your location',
            'email': 'Please enter your email address',
            'phone': 'Please enter your phone number',
            'calltime': 'Plase enter a time for us to call you',
            'message': 'Please enter your message'
        },
        invalidHandler: function(event, validator) {
            // reset toastr
            toastr.remove();
            // output the error message
            toastr.error(validator.errorList[0].message);
        },
        errorClass: 'has-error',
        highlight: function(element, errorClass) {
            $(element).closest('.form-group').addClass(errorClass);
        },
        unhighlight: function(element, errorClass) {
            $(element).closest('.form-group').removeClass(errorClass);
        },
        errorPlacement: function(error) {
            return true;
        },
        submitHandler: function(form, e) {
            e.preventDefault();

            // get the submit button
            var submit_button = $('input[type=submit]', form);
            // disable login button
            submit_button.button('loading');

            $.ajax({
                url: WEBROOT + 'index.php',
                method: 'POST',
                data: $(form).serialize()
            })
            .done(function(data) {
                // let the user know their message was sent
                toastr.success('Your request was sent!');
                record_event('Form','Submit','<?php if (!empty($_POST['selection'])) { echo 'Consult Request'; } else { echo 'Message'; } ?>');
                // reset the form
                form.reset();
            })
            .fail(function(x, status, error) {
                if (x.responseJSON && x.responseJSON.errors) {
                    $.each(x.responseJSON.errors, function(i, item) {
                        toastr.error(item);
                    });
                } else {
                    // let the user know there was a server error
                    toastr.error('Error communicating with the server');
                }
            })
            .always(function() {
                // reenable button
                submit_button.button('reset');
            });
        }
    });
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
