<?php /*
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
*/ ?>
<div class="content-fluid">
    <div class="row-fluid">
        <div class="col-sm-6 col-md-5 col-lg-4">
            <div class="panel panel-default">
                <div class="panel-heading">Password</div>
                <div class="panel-body">
                    <ul>
                        <li><p>Passwords should be at least 8 characters long</p></li>
                        <li><p>Passwords should contain at least 1 upper case and lower case letter</p></li>
                        <li><p>Passwords should contain at least 1 symbol</p></li>
                    </ul>
                </div>
                <div class="panel-footer">
                    <button type="button" class="btn btn-success btn-block" data-toggle="modal" data-target="#qd_change_password">Change Password</button>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-5 col-lg-4">
            <div class="panel panel-default">
                <div class="panel-heading">Your Privileges</div>
                <div class="panel-body">
                    <?php
                    if (count($user_groups) > 0) {
                        foreach ($user_groups as $tmp) {
                            echo '<p>' . $tmp['description'] . '</p>';
                        }
                    } else {
                        echo '<p>You do not have any privileges.</p>';
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>
