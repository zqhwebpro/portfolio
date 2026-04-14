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
    $('#qd_user_edit').on('show.bs.modal', function(e) {
        var edit_button = $(e.relatedTarget);
        if (edit_button.data('id')) {
            var cur_id = edit_button.data('id');
        }

        var the_form = $('form', this)[0];
        // reset the form
        the_form.reset();
        // clear multi-item table
        $('#multi_item_display').html('');
        $('.multi-item-output').val('');

        if (cur_id) {
            $.ajax({
                url: 'api/users/?id=' + cur_id,
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
                if (data.data['groups']) {
                    // split the list
                    var item_list = data.data['groups'].split(',');
                    // add each item to the table by name
                    $.each(item_list, function(i, item_id) {
                        var item_name = $('#qd_user_edit_groups option[value=' + item_id + ']').text();
                        $('#multi_item_display').append('<tr>\
                            <td>' + item_name + '</td>\
                            <td style="width: 56px;"><button type="button" class="btn btn-danger btn-block remove-multi-item" data-id="' + item_id + '"><span class="glyphicon glyphicon-minus"></span></button></td>\
                        </tr>');
                    });
                }
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
            $('#qd_user_edit input[name=id]').val('');
        }
    });
    $('#qd_user_edit').on('shown.bs.modal', function() {
        $('input, textarea, select', this).filter(':visible').first().focus();
    });

    $('#qd_user_delete').on('show.bs.modal', function(e) {
        var del_button = $(e.relatedTarget);
        if(typeof del_button.data('id') != 'undefined'){
            var cur_id = del_button.data('id');
        }
        $('input[name=id]', this).val(cur_id);
        $('#delete_title').html(del_button.data('title'));
    });

    // handle form submission
    $('#qd_user_edit form, #qd_user_delete form').on('submit', function(e){
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
            // check if we are dealing with an array
            if (n['name'].substr(-2) == '[]') {
                var field_name = n['name'].substr(0, n['name'].length - 2);
                // init the array if it doesnt exist yet
                if (!the_data[field_name]) {
                    the_data[field_name] = [];
                }
                the_data[field_name].push(n['value']);
            } else {
                the_data[n['name']] = n['value'];
            }
        });
        the_data = JSON.stringify(the_data);

        var api_url = 'api/users/';
        var api_method = 'PUT';
        var success_message = 'User successfully created';

        if (cur_id) {
            api_url += '?id=' + cur_id;
            // check if we are deleting or patching
            if (to_close[0].id == 'qd_user_delete') {
                api_method = 'DELETE';
                success_message = 'User successfully deleted';
            } else {
                api_method = 'PATCH';
                success_message = 'User successfully updated';
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

    $(document).on('click', '.btn-login', function(e){
        // prevent the page from reloading
        e.preventDefault();

        $.ajax({
            url: 'api/users/auth/?id=' + $(this).data('id'),
            method: 'GET'
        })
        .done(function(data) {
            window.location.replace('index.php');
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
    });

    // multi-select
    $('#add_multi_item').on('click', function (e) {
        var item_id = $('#qd_user_edit_groups').val();
        var cur_items = [];
        if ($('input[name=groups]').val() != '') {
            cur_items = $('input[name=groups]').val().split(',');
        }
        // check if the device already has this item
        if (cur_items.indexOf(item_id) > -1) {
            toastr.warning('Group already active');
            return false;
        }

        // add item name to table
        var title = $('#qd_user_edit_groups option:selected').text();
        $('#multi_item_display').append('<tr>\
            <td>' + title + '</td>\
            <td style="width: 56px;"><button type="button" class="btn btn-danger btn-block remove-multi-item" data-id="' + item_id + '"><span class="glyphicon glyphicon-minus"></span></button></td>\
        </tr>');

        // add current item_id to items
        cur_items.push(item_id);

        $('input[name=groups]').val(cur_items.join(','));
    });
    $(document).on('click', '.remove-multi-item', function () {
        // get current item id
        var item_id = $(this).data('id');
        // get the current item list
        var cur_items = $('input[name=groups]').val().split(',');
        var new_items = [];
        // remove current item
        $.each(cur_items, function(i, item) {
            if (item == item_id) {
                return;
            }
            new_items.push(item);
        });

        // update input
        $('input[name=groups]').val(new_items.join(','));

        // remove table row
        $(this).closest('tr').remove();
    });
});
