<?php /*
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
*/ ?>
<div id="ic_career_edit" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" aria-label="Close" data-dismiss="modal">
                    <span class="glyphicon glyphicon-remove"></span>
                </button>
                <h4>Edit Career</h4>
            </div>
            <form>
                <div class="modal-body">
                    <input type="hidden" name="id" />
                    <div class="form-group">
                        <label for="ic_career_edit_active">Active</label>
                        <select id="ic_career_edit_active" name="active" class="form-control">
                            <option value="Y">Yes</option>
                            <option value="N">No</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ic_career_edit_name">Position Title</label>
                        <input type="text" name="name" class="form-control" id="ic_career_edit_name" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label for="ic_career_edit_career_type">Position Type</label>
                        <select id="ic_career_edit_career_type" name="type" class="form-control">
                            <option value="F">Full-Time</option>
                            <option value="P">Part-Time</option>
                            <option value="T">Temporary</option>
                            <option value="S">Seasonal</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="ic_career_edit_listing_date">Listing Date</label>
                        <input type="text" name="listing_date" class="form-control" id="ic_career_edit_listing_date" placeholder="Listing Date">
                    </div>
                    <div class="form-group">
                        <label for="ic_career_edit_description">Description</label>
                        <textarea class="tinymce" name="description" id="ic_career_edit_description" placeholder="Description" style="height: 150px;"></textarea>
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
<div id="ic_career_delete" class="modal fade">
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
