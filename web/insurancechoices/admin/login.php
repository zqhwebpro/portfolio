<?php
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
// get common classes, function, and variables
require 'inc/common.php';

// check if the user is already logged in
if (isset($qd_user)) {
    header('Location: index.php', true, 302);
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="description" content="A modular foundation for building admin panels">
    <meta name="keywords" content="modular,admin panel,dashboard,cms,content managment,server managment">
    <meta name="author" content="Alex Mayer, Jonathan Gingrich">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Login / Quantum Dash</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.css" integrity="sha256-R91pD48xW+oHbpJYGn5xR0Q7tMhH4xOrWn1QqMRINtA=" crossorigin="anonymous" />
    <link href="css/qd.min.css" rel="stylesheet">
    <link href="css/qd_login.min.css" rel="stylesheet">

    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    <div class="content-fliud">
        <div class="row-fluid clearfix">
            <div class="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                <div class="panel panel-default">
                    <div class="panel-heading"><span class="glyphicon glyphicon-user"></span> Quantum Dash Login</div>
                    <div class="panel-body login-form">
                        <form id="qd_userlogin">
                            <input type="text" class="form-control" name="username" placeholder="Username" autocorrect="off" autocapitalize="none" autofocus>
                            <input type="password" class="form-control" name="password" placeholder="Password">
                            <button class="btn btn-lg btn-success btn-block" type="submit" data-loading-text="Signing In...">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.js" integrity="sha256-yNbKY1y6h2rbVcQtf0b8lq4a+xpktyFc3pSYoGAY1qQ=" crossorigin="anonymous"></script>
    <script>
        $(function() {
            // set toastr timout to a reasonable time
            toastr.options.timeOut = 7000;
            // catch form submit
            $('#qd_userlogin').on('submit', function(e) {
                // dont let the form accutally submit
                e.preventDefault();

                // get the submit button
                var the_button = $('button[type=submit]');
                // disable login button
                the_button.button('loading');

                // reset toastr
                toastr.remove();

                // format user info
                var userinfo = JSON.stringify({
                    'username': $('#qd_userlogin input[name=username]').val(),
                    'password': $('#qd_userlogin input[name=password]').val()
                });

                $.ajax({
                    url: 'api/users/auth/',
                    method: 'POST',
                    contentType: 'application/json',
                    data: userinfo
                })
                .done(function(data) {
                    // send the user to the main page
                    window.location.replace(data.links.next);
                })
                .fail(function(jqxhr, status, error) {
                    if (error == 'Unauthorized') {
                        toastr.error('Invalid username and password combo');
                        $('input[name=password]').val('');
                        $('input[name=password]').select();
                    } else {
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
    </script>
</body>
</html>
