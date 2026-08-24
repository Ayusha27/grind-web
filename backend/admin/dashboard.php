<?php

session_start();

if(
 !isset($_SESSION['admin_logged_in'])
){
 header("Location: login.php");
 exit;
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Dashboard</title>
</head>
<body>

<h1>GRIND Dashboard</h1>

<p>
Welcome Admin
</p>

<a href="clients.php">
Manage Clients
</a>

</body>
</html>