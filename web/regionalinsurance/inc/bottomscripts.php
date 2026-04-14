<script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
<script
 src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="<?php echo WEBURLROOT; ?>js/ruhuman/ruhuman.min.js"></script>
<script src="<?php echo WEBURLROOT; ?>js/bootstrap-hover-dropdown.min.js" type="text/JavaScript"></script>
<noscript id="deferred-styles">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Lato:400,400i,700|Roboto+Condensed|Roboto+Slab" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo WEBROOT; ?>css/b.min.css">
    <link rel="stylesheet" href="<?php echo WEBROOT; ?>css/custom.css">
</noscript>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.16.0/jquery.validate.min.js" integrity="sha256-UOSXsAgYN43P/oVrmU+JlHtiDGYWN2iHnJuKY9WD+Jg=" crossorigin="anonymous"></script>
<script>
    var loadDeferredStyles = function() {
        var addStylesNode = document.getElementById("deferred-styles");
        var replacement = document.createElement("div");
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement)
        addStylesNode.parentElement.removeChild(addStylesNode);
    };
    var raf = requestAnimationFrame || mozRequestAnimationFrame ||
        webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) {
        raf(function() { window.setTimeout(loadDeferredStyles, 0); });
    } else {
        window.addEventListener('load', loadDeferredStyles);
    }
</script>

<script>
$('.dropdown').on('show.bs.dropdown', function () {
    $(this).siblings('.open').removeClass('open').find('a.dropdown-toggle').attr('data-toggle', 'dropdown');
    $(this).find('a.dropdown-toggle').removeAttr('data-toggle');
});

// call me form
$(function() {
    $('#frmCallMe').ruhuman({
        checkin: '<?php echo WEBURLROOT; ?>js/ruhuman/ajax.php'
    });

    $('#frmCallMe').validate({
        rules: {
            'questionsName': 'required',
            'questionsPhone': 'required',
            'questionsInsurance': 'required'
        },
        messages: {
            'questionsName': 'Please enter your name',
            'questionsPhone': 'Please enter your phone number',
            'questionsInsurance': 'Please select the type of insurance you are interested in'
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
                url: '<?php echo WEBURLROOT; ?>index.php',
                method: 'POST',
                data: $(form).serialize()
            })
            .done(function(data) {
                // let the user know their message was sent
                toastr.success('Your request was sent!');
				record_event('Form','Submit','Please Call Me');
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
