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
class user extends dbRow
{
    // array of groups the user is in
    protected $grps;

    // check if user is in group (accepts string or array)
    public function in_group($grp)
    {
        // super user knows all, super user sees all
        if (in_array('xSU', $this->grps)) {
            return true;
        }
        // check if we have string or array
        if (is_string($grp)) {
            return in_array($grp, $this->grps);
        } elseif(is_array($grp)) {
            // loop through each group passed
            foreach ($grp as $tmp) {
                if (in_array($tmp, $this->grps)) {
                    return true;
                }
            }
        }
        // there are no groups left... inform the guards
        return false;
    }

    public function __get($var)
    {
        if (in_array($var, array('grps'))) {
            return $this->$var;
        }
        return parent::__get($var);
    }
    public function __set($var, $val)
    {
        if ($var == 'groups') {
            $this->grps = explode(',', $val);
        }
        return parent::__set($var, $val);
    }
}
