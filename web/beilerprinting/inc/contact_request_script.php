<script>
$(function() {
    $('[data-contact-form]').ruhuman({
        checkin: '<?php echo WEBURLROOT; ?>js/ruhuman/ajax.php'
    });

    $('[data-contact-form]').validate({
        rules: {
            'fullname': 'required',
            'email': {
                'required': true,
                'email': true
            },
            'message': 'required',
        },
        messages: {
            'fullname': 'Please enter your name',
            'email': {
                'required': 'Please enter your email address',
                'email': 'Email address must be a valid email'
            },
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
            var submit_button = $('button[type=submit]', form);
            // disable login button
            submit_button.button('loading');

            $.ajax({
                url: window.location,
                method: 'POST',
                data: $(form).serialize()
            })
            .done(function(data) {
                // let the user know their message was sent
                toastr.success('Your contact request was sent!');
				record_event('Form','Submit','Contact');
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
</script>
