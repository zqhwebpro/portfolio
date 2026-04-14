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
<div id="qd_user_edit" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" aria-label="Close" data-dismiss="modal">
                    <span class="glyphicon glyphicon-remove"></span>
                </button>
                <h4>Edit User</h4>
            </div>
            <form>
                <div class="modal-body">
                    <input type="hidden" name="id" />
                    <div class="form-group">
                        <label for="qd_user_edit_name">User Name</label>
                        <input type="text" name="username" class="form-control" id="qd_user_edit_name" placeholder="User Name">
                    </div>
                    <div class="form-group">
                        <label for="qd_group_edit_pass">Password</label>
                        <input type="password" name="password" class="form-control" id="qd_group_edit_pass" placeholder="Password">
                    </div>
                    <hr />
                    <div class="form-group">
                        <label for="qd_user_edit_groups">Groups</label>
                        <input type="hidden" class="multi-item-output" name="groups" value="" />
                        <div class="row">
                            <div class="col-sm-10">
                                <p>
                                    <select class="form-control" id="qd_user_edit_groups"></select>
                                </p>
                            </div>
                            <div class="col-sm-2">
                                <p>
                                    <button type="button" class="btn btn-success btn-block" id="add_multi_item">
                                        <span class="glyphicon glyphicon-plus"></span> Add
                                    </button>
                                </p>
                            </div>
                        </div>
                        <table class="table table-striped" id="multi_item_display"></table>
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
<div id="qd_user_delete" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4>Confirm Delete</h4>
            </div>
            <div class="modal-body">
                Are you sure you would like to delete <span id="delete_title"></span>?
            </div>
            <div class="modal-footer">
                <form>
                    <input type="hidden" name="id" value="" />
                    <button type="button" data-dismiss="modal" class="btn btn-danger" style="width: 85px;">No</button>
                    <button type="submit" class="btn btn-success" style="width: 85px;" data-loading-text="Deleting...">Yes</button>
                </form>
            </div>
        </div>
    </div>
</div>
