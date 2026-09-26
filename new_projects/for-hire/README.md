# WordPress Bones Theme & WooCommerce Architecture — "For Hire"

This directory contains a complete, production-ready WordPress environment configured with the **Bones** responsive HTML5 development theme and **WooCommerce 8.8+** for developer contract packages and engineering services.

## Directory Structure

```
for-hire/
├── .htaccess                       # WordPress Apache mod_rewrite permalinks
├── wp-config.php                   # Core WP DB credentials, auth salts, memory limit & AppSec
├── wp-blog-header.php              # Template environment loader
├── wp-load.php                     # WP bootstrap
├── wp-settings.php                 # Core classes, plugin & theme setup
├── index.php                       # WordPress main PHP entry point
├── index.html                      # Interactive live showcase & source code inspector for static web
├── case-study.html                 # Technical case study (Bones scaffolding, hook unhooking, AppSec)
├── favicon.png                     # Site favicon
├── wp-admin/                       # WordPress Administration backend
├── wp-includes/                    # WordPress core functions, hooks API, and version definitions
│   ├── functions.php
│   ├── plugin.php
│   ├── template-loader.php
│   └── version.php
└── wp-content/
    ├── plugins/
    │   └── woocommerce/            # WooCommerce core e-commerce engine
    │       ├── woocommerce.php
    │       └── includes/
    │           ├── class-woocommerce.php
    │           ├── class-wc-product.php
    │           ├── class-wc-cart.php
    │           ├── class-wc-checkout.php
    │           └── wc-core-functions.php
    ├── themes/
    │   └── bones/                  # Bones HTML5 development starter theme
    │       ├── style.css           # Theme metadata header
    │       ├── functions.php       # WooCommerce theme supports & Bones grid wrapper hooks
    │       ├── header.php          # Responsive HTML5 header
    │       ├── footer.php          # Theme footer
    │       ├── index.php           # Standard blog/service loop
    │       ├── sidebar.php         # Widgetized sidebar
    │       ├── woocommerce.php     # Dedicated WooCommerce template override
    │       ├── library/            # Bones core library
    │       │   ├── admin.php       # Admin customization
    │       │   ├── bones.php       # Header and RSS cleanup routines
    │       │   ├── custom-post-type.php # Client project custom post type
    │       │   ├── css/style.css   # Mobile-first responsive stylesheet
    │       │   └── js/scripts.js   # Bones navigation scripts
    │       └── woocommerce/        # Template overrides
    │           ├── archive-product.php
    │           ├── single-product.php
    │           ├── cart/cart.php
    │           └── checkout/form-checkout.php
    └── uploads/
```

## Key Architectural Features

1. **Bones Theme Scaffolding**: Strips header cruft via `library/bones.php` and organizes styles with a mobile-first grid (`m-all`, `t-2of3`, `d-5of7`, `d-2of7`).
2. **WooCommerce Wrapper Decoupling**: Replaces default `#primary`/`#main` wrappers with custom Bones responsive column wrappers via `woocommerce_before_main_content` and `woocommerce_after_main_content`.
3. **WooCommerce Theme Overrides**: Custom implementations of `archive-product.php`, `single-product.php`, `cart/cart.php`, and `checkout/form-checkout.php`.
4. **AppSec & Performance**: Configures 256M/512M memory limits, disables file editing (`DISALLOW_FILE_EDIT`), and tunes transient cache behavior.
