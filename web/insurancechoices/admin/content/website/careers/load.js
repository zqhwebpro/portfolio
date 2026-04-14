/*
Quantum Dash - A modular foundation for building admin panels
Copyright (C) 2015  Alex Mayer and Jonathan Gingrich

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
function reload_content() {
    // clear the content
    $('#ic_career_content').html('');
    // add a spinner
    $('#ic_career_content').spin();

    $.ajax({
        url: 'api/careers/',
        method: 'GET'
    })
    .done(function(data) {
        if (data.data && data.data.length) {
            $('#ic_career_content').html(
                '<table class="table table-striped">\
                    <thead>\
                        <tr><th>Name</th><th class="hidden-xs">Type</th><th class="hidden-xs">Active</th><th>Edit</th><th>Delete</th></tr>\
                    </thead>\
                    <tbody id="item_content"></tbody>\
                </table>'
            );
            $.each(data.data, function(i, item){
                $('#item_content').append(
                    '<tr' + (item.active == 'Y' ?  '' : ' class="grey-row"') + '>\
                        <td>' + item.name + '</td>\
                        <td class="hidden-xs">' + item.type + '</td>\
                        <td class="text-center hidden-xs"><span class="glyphicon glyphicon-' + (item.active == "Y" ? 'check' : 'unchecked') + '"></span></td>\
                        <td style="width: 10px;"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#ic_career_edit" data-id="' + item.id + '"><span class="glyphicon glyphicon-edit"></span></button></td>\
                        <td style="width: 10px;"><button type="button" class="btn btn-danger" data-id="' + item.id + '" data-toggle="modal" data-target="#ic_career_delete" data-title="' + item.name + '"><span class="glyphicon glyphicon-trash"></span></button></td>\
                    </tr>'
                );
            });
        } else {
            $('#ic_career_content').html(
                '<div class="alert alert-info" role="alert">\
                    <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>\
                    No Careers\
                </div>'
            );
        }
    })
    .fail(function(x, status, error) {
        $('#ic_career_content').html(
            '<div class="alert alert-danger" role="alert">\
                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>\
                <span class="sr-only">Error:</span>\
                Could Not Load Content\
            </div>'
        );
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
        // remove the spinner
        $('#ic_career_content').spin(false);
    });
}

$(function() {
    reload_content();

    // init date time pickers
    $('#ic_career_edit_listing_date').datetimepicker({
        format: 'YYYY-MM-DD',
        showClear: true
    });
});
