<script>
$(function() {
    $('[data-quote-form]').ruhuman({
        checkin: '<?php echo WEBURLROOT; ?>lib/js/ruhuman/ajax.php'
    });

    $('[data-quote-form]').validate({
        rules: {
            'quoteName': 'required',
            'quotePhone': 'required',
            'quoteEmail': {
                'required': true,
                'email': true
            },
            'quote_options[]': 'required',
            'quoteMessage': 'required'
        },
        messages: {
            'quoteName': 'Please enter your name',
            'quotePhone': 'Please enter your phone number',
            'quoteEmail': {
                'required': 'Please enter your email address',
                'email': 'Email address must be a valid email'
            },
            'quote_options[]': 'Please select at least one type of insurance you are interested in',
            'quoteMessage': 'Please enter your message'
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
                toastr.success('Your quote request was sent!');
				record_event('Submit Quote','<?php echo $ga_action; ?>','<?php echo $agent_name ?>', '1');
                // reset the form
                form.reset();
                // close modal
                $('#modal-quote').modal('hide');
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
