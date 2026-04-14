/*
Quantum Dash - A modular foundation for building admin panels
Copyright (C) 2017  Alex Mayer and Jonathan Gingrich

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
$(function(){
    $('#qd_change_password').on('show.bs.modal', function() {
        $('form', this)[0].reset();
    });
    $('#qd_change_password').on('shown.bs.modal', function() {
        $('input[name=password]', this).focus();
    });
    // handle form submission
    $('#qd_change_password form').on('submit', function(e){
        // prevent the page from reloading
        e.preventDefault();

        // make sure passwords match
        if ($('input[name=password]', this).val() != $('input[name=confpassword]', this).val()) {
            toastr.error('Passwords do not match');
            return false;
        }

        // get the submit button
        var the_button = $('button[type=submit]', this);
        // disable login button
        the_button.button('loading');

        var the_data = JSON.stringify({
            'password': $('input[name=password]', this).val(),
            'confpassword': $('input[name=confpassword]', this).val(),
        });

        $.ajax({
            url: 'api/users/?id=' + $('input[name=id]', this).val(),
            method: 'PATCH',
            contentType: 'application/json',
            data: the_data
        })
        .done(function(data) {
            // close the modal
            $('#qd_change_password').modal('hide');
            toastr.success('Your password was successfully updated');
        })
        .fail(function(x, status, error) {
            if (x.responseJSON && x.responseJSON.errors) {
                $.each(x.responseJSON.errors, function(i, item) {
                    toastr.error(item);
                });
            } else {
                if (x.responseText){
                    console.log(x.responseText);
                }
                // let the user know there was a server error
                toastr.error('Error communicating with the server');
            }
        })
        .always(function() {
            // reenable button
            the_button.button('reset');
        });
    });
});
