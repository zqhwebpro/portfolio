# Quantum Dash
## About
Quantum Dash is a customizable and expandable administration panel. Its goal is to provide a platform to build administration panels to manage websites and servers or anything you can manage programmatically.

## Requirements
PHP 5.3+  
MySQL or MariaDB

## Installing
1. Copy files to webserver.
2. Create empty database.
3. Run setup.php through a web browser.

You can use an existing database but setup script may overwrite some tables.

## Groups
Groups are used to restrict who can see certain content and pages. You can create groups to use on specific pages. You can check if the logged in user is in a group by doing `$qd_user->in_group('YOURGROUPHERE');`  
Create the group then go to **Manage Users** to add a user to the group.
### xSU group
This group has special privileges. Any user belonging to this group is automatically in every other group. `$qd_user->in_group('ANYGROUPHERE');` will always return true. **Be cautious when adding a user to xSU group.** They have unrestricted access to all pages.

## Users
Users can be added, deleted, or modified through the User managment page under Quantum Dash in the menu.

## Creating New Page
In the content folder make new content group folder. This folder is where you will group similar pages.
This folder should have a **settings.json** file.

In your content group folder create a page folder. This folder should have a **settings.json** file.

Place your index.php file in here. This is the file that will be loaded when your page is selected from the navigation.

## settings.json (Content Groups and Pages)
### Menu
Valid In: group folders

sort (int): used to sort content groups and pages. Default: 5  
title (string): The title that will show up in the navigation and browser tab.  
icon (string): any glyphicon icon name. (ie. cog)
```json
"menu": {
    "sort": 5,
    "title": "Website",
    "icon": "globe"
}
```

### Groups
Valid In: group folders, page folders  
Groups is an array of groups allowed to see the content group or page the settings.json file is in.
```json
"groups":["xSU", "mGROUPS", "mCONTENT"]
```
Setting `"groups":null` will allow anyone to view content group or page.

### Plugins
Valid In: page folders  
Plugins is an array of plugins that should be included when loading the page.
```json
"plugins":["highlight", "motd"]
```

### Hooks
Valid In: page folders, plugins  
Hooks are used to include files at different places during page load. Files used should be in the same folder as the settings.json file.
#### Top
Loads file before any output is sent back to browser.  
key: top  
types: include
#### CSS
Loads with other css files in `<head>` tag.  
key: css  
types: include, link
#### Javascript
Loads with other javascript files in `<head>` tag.  
key: javascript  
types: include, script
#### Home Screen
Loads on the home page of Quantum Dash (only works for plugins).  
key: home_screen  
types: include
#### Modal
Loads file at end of body so modal isnt displayed while the rest of the page is loading  
key: modal  
types: include
#### Example
```json
"hooks":{
    "home_screen":[
        {"file":"box.php", "type":"include"}
    ],
    "top":[
        {"file":"top.php", "type":"include"}
    ],
    "css":[
        {"file":"pretty.css", "type":"link"},
        {"file":"custom.php", "type":"include"}
    ],
    "javascript":[
        {"file":"functional.js", "type":"script"},
        {"file":"dynamic.php", "type":"include"}
        {"file":"modal_buttons.js", "type":"script"}
    ],
    "modal":[
        {"file":"modal.php", "type":"include"}
    ]
}
```

## Creating Plugin
In the plugins folder create a new folder. Place all the files you need for your plugin in here. Create a **settings.json** file. Add hooks for needed files.

## settings.json (Plugins)
active (bool): Whether the plugin is active by default (true) or only when requested (false). Default: false.  
See also **Hooks** section of *settings.json (Content Groups and Pages)*

## Useful Variables
$db: a database object. You can use this to make queries `$result = $db->query('SELECT * FROM table;')`.  
$qd_user: contains all the users info.

## Useful Directories
api/inc/common/site/ and inc/common/site/: Any php file placed in this directory will be auto loaded on every page. This can be useful for global variables, site specific classes, or logging.
