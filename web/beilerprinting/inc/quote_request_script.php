<script>
$(function() {
    $('[data-quote-form]').ruhuman({
        checkin: '<?php echo WEBURLROOT; ?>js/ruhuman/ajax.php'
    });

    $('[data-quote-form]').validate({
        rules: {
            'fullname': 'required',
            'email': {
                'required': true,
                'email': true
            },
            'phone': 'required',
            'quote-or-reorder': 'required',
            'item': 'required',
            'quantity': 'required',
            'finished-size': 'required',
            'ink-options': 'required',
            'paper': 'required'
        },
        messages: {
            'fullname': 'Please enter your name',
            'email': {
                'required': 'Please enter your email address',
                'email': 'Email address must be a valid email'
            },
            'phone': 'Please enter your phone number',
            'quote-or-reorder': 'Please select Quote or Reorder',
            'item': 'Please enter the item type',
            'quantity': 'Please enter the quanitity',
            'finished-size': 'Please enter the size',
            'ink-options': 'Please select an ink option',
            'paper': 'Please enter the paper type as best as you can describe it'
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
				record_event('Form','Submit','Get A Quote');
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
