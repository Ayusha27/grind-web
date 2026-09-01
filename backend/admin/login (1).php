<?php
session_start();

$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = $_POST['username'];
    $password = $_POST['password'];

    if (
        $username == "admin" &&
        $password == "Grind@2026"
    ) {

        $_SESSION['admin_logged_in'] = true;

        header("Location: dashboard.php");
        exit;

    } else {

        $error = "Invalid Login";

    }
}
?>

<!DOCTYPE html>
<html>
<head>
<title>GRIND Admin Login</title>
</head>
<body>

<h2>GRIND Admin Login</h2>

<form method="POST">

<input
type="text"
name="username"
placeholder="Username"
required>

<br><br>

<input
type="password"
name="password"
placeholder="Password"
required>

<br><br>

<button type="submit">
Login
</button>

</form>

<p style="color:red;">
<?php echo $error; ?>
</p>

</body>
</html>