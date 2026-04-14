<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link href='http://fonts.googleapis.com/css?family=Shadows+Into+Light|Roboto:400,700' rel='stylesheet' type='text/css'>
    <link href="lib/css/styles.css" rel="stylesheet" type="text/css" />
    <link href="<?php bloginfo('stylesheet_url'); ?>" rel="stylesheet" type="text/css" />
    <link href="<?php bloginfo('template_directory'); ?>/lib/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <title>York Music Shop: Yorks #1 Music Shop</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="<?php bloginfo('template_directory'); ?>/navspritescript.js"></script>
    <?php wp_enqueue_script("jquery"); ?>
    <?php wp_head(); ?>
</head>

<body>
    <div id="allcontain">
        <div id="headcontain">
            <header>
                <img class="ymslogopos" height="88" src="http://www.zqhwebpro.com/portfolio/web/yms/yms/wp-content/uploads/2017/12/yms_logo.png" width="487"/>
            </header>
            <nav>
              <?php wp_nav_menu( array( 'theme_location' => 'header-menu' ) ); ?>
            </nav>
        </div>
