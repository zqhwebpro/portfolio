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
// check if the user is logged in
if (!isset($qd_user)) {
    // keep track of this page to send the user back to
    $_SESSION['QD']['last_page'] = $_SERVER['REQUEST_URI'];
    header('Location: login.php', true, 302);
    exit;
}

$qd_page_group = isset($_GET['g']) ? $_GET['g'] : 'main';
$qd_page_page = isset($_GET['p']) ? $_GET['p'] : 'main';

// initate variable to store page data
$qd_pages = array();
$group_sort = array();
// get all section and page info
foreach (array_slice(scandir('content'), 2) as $menu_g) {
    $s_file = 'content/' . $menu_g . '/settings.json';
    // only scan dirs with settings files
    if (!is_dir('content/' . $menu_g) || !file_exists($s_file)) {
        continue;
    }
    $s_cont = json_decode(file_get_contents($s_file), true);
    if (is_null($s_cont)) {
        trigger_error('Could not parse json (' . $s_file . ')', E_USER_ERROR);
    }
    if (isset($s_cont['groups']) && !$qd_user->in_group($s_cont['groups'])) {
        continue;
    }
    $qd_pages[$menu_g] = $s_cont;
    // store group sort preferances
    if (isset($s_cont['menu']['sort'])) {
        $group_sort[] = $s_cont['menu']['sort'];
    } else {
        $group_sort[] = 5;
    }
    $page_sort = array();
    foreach (array_slice(scandir('content/' . $menu_g), 2) as $menu_p) {
        $s_file = 'content/' . $menu_g . '/' . $menu_p . '/settings.json';
        // only scan dirs with settings files
        if (!is_dir('content/' . $menu_g . '/' . $menu_p) || !file_exists($s_file)) {
            continue;
        }
        $s_cont = json_decode(file_get_contents($s_file), true);
        if (is_null($s_cont)) {
            trigger_error('Could not parse json (' . $s_file . ')', E_USER_ERROR);
        }
        // check user permissions
        if (isset($s_cont['groups']) && !$qd_user->in_group($s_cont['groups'])) {
            continue;
        }
        // ensure we have hooks array
        if (!isset($s_cont['hooks'])) {
            $s_cont['hooks'] = array();
        }
        // loop through each hook group
        foreach (array_keys($s_cont['hooks']) as $hook_group) {
            // loop through each item in hook group
            foreach ($s_cont['hooks'][$hook_group] as &$hook) {
                if ($hook['type'] == 'remote') { continue; }
                // format file to point to relative file
                $hook['file'] = 'content/' . $menu_g . '/' . $menu_p . '/' . $hook['file'];
            }
            unset($hook);
        }
        // move hooks to correct location
        $s_cont['hooks'] = array('page' => $s_cont['hooks']);
        // make sure plugins is at least an empty array
        if (!isset($s_cont['plugins'])) {
            $s_cont['plugins'] = array();
        }
        // store page settings
        $qd_pages[$menu_g]['pages'][$menu_p] = $s_cont;
        // store page sort preferances
        if (isset($s_cont['menu']['sort'])) {
            $page_sort[] = $s_cont['menu']['sort'];
        } else {
            $page_sort[] = 5;
        }
    }
    array_multisort($page_sort, $qd_pages[$menu_g]['pages']);
}
array_multisort($group_sort, $qd_pages);

// make sure page exists
if (
    !in_array($qd_page_group, array_keys($qd_pages)) ||
    !in_array($qd_page_page, array_keys($qd_pages[$qd_page_group]['pages']))
) {
    $qd_page_group = 'main';
    $qd_page_page = 'error';
}
// get the current page settings
$qd_page_settings = $qd_pages[$qd_page_group]['pages'][$qd_page_page];

$qd_plugins = array();
$qd_all_plugins  = array_slice(scandir('plugins'), 2);
$qd_plugin_load_order = array_pad(array(), count($qd_all_plugins), PHP_INT_MAX);
// loop through page specific plugins and give a sort value
for ($i = 0; $i < count($qd_page_settings['plugins']); $i++) {
    // get the curret plugin name
    $plugin = $qd_page_settings['plugins'][$i];
    // search for the current plugin in the list of plugins
    $plugin_slot = array_search($plugin, $qd_all_plugins);
    // check if the plugin exists
    if ($plugin_slot !== false) {
        $qd_plugin_load_order[$plugin_slot] = $i;
    }
}
// sort the plugin in the order to be loaded
array_multisort($qd_plugin_load_order, $qd_all_plugins);
unset($qd_plugin_load_order);
// load all plugin settings
foreach ($qd_all_plugins as $plugin) {
    $s_file = 'plugins/' . $plugin . '/settings.json';
    if (!is_dir('plugins/' . $plugin) || !file_exists($s_file)) {
        continue;
    }
    $s_cont = json_decode(file_get_contents($s_file), true);
    if (is_null($s_cont)) {
        trigger_error('Could not parse json (' . $s_file . ')', E_USER_ERROR);
    }
    // make sure the active var is set
    if (!isset($s_cont['active'])) {
        $s_cont['active'] = false;
    }
    // add plugin hooks
    if ($s_cont['active'] || in_array($plugin, $qd_page_settings['plugins'])) {
        // loop through each hook group
        foreach ($s_cont['hooks'] as $hook_group => $hook_conts) {
            // loop through each item in hook group
            foreach ($hook_conts as $hook) {
                if ($hook['type'] != 'remote') {
                    $hook['file'] = 'plugins/' . $plugin . '/' . $hook['file'];
                }
                if (isset($qd_page_settings['hooks']['plugins'][$hook_group])) {
                    $qd_page_settings['hooks']['plugins'][$hook_group][] = $hook;
                } else {
                    $qd_page_settings['hooks']['plugins'][$hook_group] = array($hook);
                }
            }
        }
    }
    // add plugin settings to qd_plugins array
    $qd_plugins[$plugin] = $s_cont;
}

// include all top hooks
foreach (array('plugins', 'page') as $hook) {
    if (isset($qd_page_settings['hooks'][$hook]['top'])) {
        foreach ($qd_page_settings['hooks'][$hook]['top'] as $tmp) {
            if ($tmp['type'] == "include") {
                include $tmp['file'];
            }
        }
    }
}

// main site content
if (!file_exists('content/' . $qd_page_group . '/' . $qd_page_page . '/index.php')) {
    header('Location: ?g=main&p=error', true, 302);
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title><?php echo $qd_page_settings['menu']['title']; ?> / Quantum Dash</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.css" integrity="sha256-R91pD48xW+oHbpJYGn5xR0Q7tMhH4xOrWn1QqMRINtA=" crossorigin="anonymous" />
    <link href="css/qd.min.css" rel="stylesheet">
    <?php
    // include css hooks
    foreach (array('plugins', 'page') as $hook) {
        if (isset($qd_page_settings['hooks'][$hook]['css'])) {
            foreach ($qd_page_settings['hooks'][$hook]['css'] as $tmp) {
                switch ($tmp['type']) {
                    case 'remote':
                    case 'link':
                        echo '<link rel="stylesheet" href="' . $tmp['file'] . '">' . "\n";
                        break;
                    case 'include':
                    default:
                        include $tmp['file'];
                        break;
                }
            }
        }
    }
    ?>

    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
    <header>
        <div class="container-fluid">
            <div class="row-fluid">
                <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
                    <div class="col-lg-1 col-sm-2 col-xs-2">
                        <span class="hidden-xs qd-slider-toggle">
                            MENU <span class="glyphicon glyphicon-chevron-right"></span>
                        </span>
                        <span class="hidden-sm visible-xs qd-slider-toggle">
                            <span class="glyphicon glyphicon-menu-hamburger"></span>
                        </span>
                    </div>
                    <div class="col-lg-11 col-sm-10 col-xs-10">
                        <span class="qd-page-title">
                            <?php echo $qd_page_settings['menu']['title']; ?>
                        </span>
                        <span class="hidden-xs">
                            <div class="pull-right">
                                <span class="qd-username">Welcome, <?php echo $qd_user->username; ?></span>
                                <button type="button" class="btn btn-success" data-toggle="modal" data-target="#qd_confirm_logout">Logout</button>
                            </div>
                        </span>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    <?php
    // include page trying to be loaded
    include 'content/' . $qd_page_group . '/' . $qd_page_page . '/index.php';
    ?>
    <div id="qd_confirm_logout" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    Are you sure you would like to logout?
                </div>
                <div class="modal-footer">
                    <button type="button" data-dismiss="modal" class="btn btn-danger" style="width: 85px;">No</button>
                    <a href="?g=main&p=logout" class="btn btn-success" style="width: 85px;">Yes</a>
                </div>
            </div>
        </div>
    </div>
    <?php
    // include all modal hooks
    foreach(array('plugins', 'page') as $hook){
        if(isset($qd_page_settings['hooks'][$hook]['modal'])){
            foreach($qd_page_settings['hooks'][$hook]['modal'] as $tmp){
                if($tmp['type'] == "include"){
                    include $tmp['file'];
                }
            }
        }
    }
    ?>

    <div class="qd-slider">
        <nav class="panel-group" id="qd-menu-accordion" role="tablist" aria-multiselectable="true">
            <?php
            foreach ($qd_pages as $menu_gt => $menu_g) {
                $menu_conts = '';
                $group_selected = $menu_gt == $qd_page_group;
                foreach ($menu_g['pages'] as $menu_pt => $menu_p) {
                    // get page selected status
                    $page_selected = $menu_pt == $qd_page_page;
                    if (isset($menu_p['menu']['display']) && !$menu_p['menu']['display']) {
                        continue;
                    }
                    $menu_conts .= '
                    <a href="?g=' . $menu_gt . '&p=' . $menu_pt . '">
                        <div class="qd-nav-page' . ($page_selected ? ' active' : '') . '">
                            ' . $menu_p['menu']['title'] . '
                        </div>
                    </a>
                    ';
                }
                if ($menu_conts != '') {
                    if (isset($menu_g['menu']['icon'])) {
                        $menu_g['menu']['title'] = '<span class="glyphicon glyphicon-' . $menu_g['menu']['icon'] . '"></span> ' . $menu_g['menu']['title'];
                    }
                    echo '
                    <div class="panel panel-nav">
                        <div class="panel-heading' . ($group_selected ? '' : ' collapsed') . '" role="tab" id="qd-menu-heading-' . $menu_gt . '" data-toggle="collapse" data-parent="#qd-menu-accordion" data-target="#qd-menu-' . $menu_gt . '" aria-expanded="' . ($group_selected ? 'true' : 'false') . '" aria-controls="qd-menu-' . $menu_gt . '">
                            <div class="panel-title">
                                ' . $menu_g['menu']['title'] . '<div class="qd-menu-arrow"><span class="glyphicon glyphicon-menu-down"></span></div>
                            </div>
                        </div>
                        <div id="qd-menu-' . $menu_gt . '" class="panel-collapse collapse' . ($group_selected ? ' in' : '') . '" role="tabpanel" aria-labelledby="qd-menu-heading-' . $menu_gt . '">
                            <div class="panel-body">
                                ' . $menu_conts . '
                            </div>
                        </div>
                    </div>';
                }
            }
            ?>
        </nav>
        <div class="qd-version">Version <?php echo QD_VERSION; ?></div>
    </div>

    <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.js" integrity="sha256-yNbKY1y6h2rbVcQtf0b8lq4a+xpktyFc3pSYoGAY1qQ=" crossorigin="anonymous"></script>
    <?php
    foreach (array('plugins', 'page') as $hook) {
        if (isset($qd_page_settings['hooks'][$hook]['javascript'])) {
            foreach ($qd_page_settings['hooks'][$hook]['javascript'] as $tmp) {
                switch ($tmp['type']) {
                    case 'include':
                        include $tmp['file'];
                        break;
                    case 'remote':
                    case 'script':
                    default:
                        echo '<script src="' . $tmp['file'] . '"></script>' . "\n";
                        break;
                }
            }
        }
    }
    ?>
    <script type="text/javascript">
        $(function () {
            // set toastr timout to a reasonable time
            toastr.options.timeOut = 7000;

            function qdSliderToggle() {
                // grab qd-slider element
                var qdSlider = $('.qd-slider');
                // check if the slider is open or closed
                if (qdSlider.hasClass('open')) {
                    qdSliderClose();
                } else {
                    qdSliderOpen();
                }
            }
            function qdSliderOpen() {
                // grab qd-slider element
                var qdSlider = $('.qd-slider');
                // toggle the arrows
                $('.qd-slider-toggle .glyphicon').removeClass('glyphicon-chevron-right');
                $('.qd-slider-toggle .glyphicon').addClass('glyphicon-chevron-left');
                // animate menu
                qdSlider.animate({ left: '0px' }, 250);
                // toggle open class
                qdSlider.addClass('open');
            }
            function qdSliderClose() {
                // grab qd-slider element
                var qdSlider = $('.qd-slider');
                // toggle the arrows
                $('.qd-slider-toggle .glyphicon').addClass('glyphicon-chevron-right');
                $('.qd-slider-toggle .glyphicon').removeClass('glyphicon-chevron-left');
                // animate menu
                qdSlider.animate({ left: -qdSlider.width() + 'px' }, 250);
                // toggle open class
                qdSlider.removeClass('open');
            }
            // menu events
            $('.qd-slider-toggle').on('click', function(e){
                // prevent default button interaction
                e.preventDefault();
                // toggle the slider
                qdSliderToggle();
                // return false (infinite loop without this?)
                return false;
            });
            // close slider if it is open
            $(document).on('click', function(e) {
                // get closest slider
                var qdSlider = $(e.target).closest('.qd-slider');
                // check if slider is open and we clicked outside the slider
                if ($('.qd-slider').hasClass('open') && !qdSlider.length){
                    qdSliderClose();
                }
            });
        });
    </script>
</body>
</html>
