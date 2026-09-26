<!doctype html>
<!--[if lt IE 7]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?php wp_title( '' ); ?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<link rel="stylesheet" href="./wp-content/themes/bones/library/css/style.css">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div id="container">
		<header class="header" role="banner">
			<div id="inner-header" class="wrap cf">
				<div>
					<p id="logo" class="h1"><a href="?view=shop" rel="nofollow">FOR HIRE <span>//</span> WP+WC</a></p>
					<div class="site-desc">WordPress Bones Theme &amp; WooCommerce Engineering</div>
				</div>
				<nav role="navigation">
					<ul id="main-nav" class="nav">
						<li><a href="?view=shop">Services &amp; Packages</a></li>
						<li><a href="../../2026/index.html">Main Portfolio</a></li>
						<li><a href="../index.html">Interactive Apps</a></li>
						<li>
							<a href="?view=cart" class="cart-link-btn">
								<span>Cart</span>
								<span id="cart-item-count" class="cart-badge">0</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
