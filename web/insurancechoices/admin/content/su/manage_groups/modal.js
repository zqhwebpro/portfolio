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
    $('#qd_group_edit').on('show.bs.modal', function(e) {
        var edit_button = $(e.relatedTarget);
        if (edit_button.data('id')) {
            var cur_id = edit_button.data('id');
        }

        var the_form = $('form', this)[0];
        // reset the form
        the_form.reset();

        if (cur_id) {
            $.ajax({
                url: 'api/groups/?id=' + cur_id,
                method: 'GET'
            })
            .done(function(data) {
                // loop throught each input, textarea, and select that has a name attribute and is not a button or file
                $('input, textarea, select', the_form).filter('[name]').not(':button, :submit, :file').each(function(i, item) {
                    // check if we got data back for the element
                    if (data.data[$(item).attr('name')]) {
                        // set the value
                        $(item).val(data.data[$(item).attr('name')]);
                    }
                });
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
            });
        } else {
            $('#qd_group_edit input[name=id]').val('');
        }
    });
    $('#qd_group_edit').on('shown.bs.modal', function() {
        $('input, textarea, select', this).filter(':visible').first().focus();
    });

    $('#qd_group_delete').on('show.bs.modal', function(e) {
        var del_button = $(e.relatedTarget);
        if(typeof del_button.data('id') != 'undefined'){
            var cur_id = del_button.data('id');
        }
        $('input[name=id]', this).val(cur_id);
        $('#delete_title').html(del_button.data('title'));
    });

    // handle form submission
    $('#qd_group_delete form, #qd_group_edit form').on('submit', function(e){
        // prevent the page from reloading
        e.preventDefault();
        // get the current modal
        var to_close = $(this).closest('.modal').first();
        // get the submit button
        var submit_button = $('button[type=submit]', this);
        // disable login button
        submit_button.button('loading');

        // check if we are creating an item or editing one
        if ($('input[name=id]', this).val() != '') {
            var cur_id = $('input[name=id]', this).val();
        }

        var the_data = {};
        var raw_data = $.map($(this).serializeArray(), function(n) {
            the_data[n['name']] = n['value'];
        });
        the_data = JSON.stringify(the_data);

        var api_url = 'api/groups/';
        var api_method = 'PUT';
        var success_message = 'Group successfully created';

        if (cur_id) {
            api_url += '?id=' + cur_id;
            // check if we are deleting or patching
            if (to_close[0].id == 'qd_group_delete') {
                api_method = 'DELETE';
                success_message = 'Group successfully deleted';
            } else {
                api_method = 'PATCH';
                success_message = 'Group successfully updated';
            }
        }

        $.ajax({
            url: api_url,
            method: api_method,
            contentType: 'application/json',
            data: the_data
        })
        .done(function(data) {
            // close the modal
            to_close.modal('hide');
            reload_content();
            toastr.success(success_message);
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
            submit_button.button('reset');
        });
    });
});
