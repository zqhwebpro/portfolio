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
<div id="qd_change_password" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" aria-label="Close" data-dismiss="modal">
                    <span class="glyphicon glyphicon-remove"></span>
                </button>
                <h4>Change Password</h4>
            </div>
            <form>
                <input type="hidden" name="id" value="<?php echo $qd_user->id; ?>">
                <div class="modal-body">
                    <div class="form-group">
                        <label for="qd_change_pass">Password</label>
                        <input type="password" name="password" class="form-control" id="qd_change_pass" placeholder="Password">
                    </div>
                    <div class="form-group">
                        <label for="qd_conf_pass">Confirm Password</label>
                        <input type="password" name="confpassword" class="form-control" id="qd_conf_pass" placeholder="Confirm Password">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-danger" style="width: 85px;">Cancel</button>
                    <button type="submit" class="btn btn-success" style="width: 85px;" data-loading-text="Saving...">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>
