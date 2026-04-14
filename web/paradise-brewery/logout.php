<?php
session_start();
session_unset();
session_destroy();
header('Location: login.php?msg=loggedout');
?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Logout Page</title>
</head>

<body>
</body>
</html>