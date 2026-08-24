<?php

session_start();

require '../config/database.php';

if(
 !isset($_SESSION['admin_logged_in'])
){
 header("Location: login.php");
 exit;
}

if(
 $_SERVER['REQUEST_METHOD']=='POST'
){

    $email = trim($_POST['email']);

    // Check if client already exists

    $checkStmt = $pdo->prepare("
        SELECT *
        FROM clients
        WHERE email = ?
    ");

    $checkStmt->execute([$email]);

    $existingClient = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if($existingClient){

        // UPDATE EXISTING CLIENT

        $updateStmt = $pdo->prepare("
            UPDATE clients
            SET
                name = ?,
                phone = ?,
                goal = ?
            WHERE email = ?
        ");

        $updateStmt->execute([
            $_POST['name'],
            $_POST['phone'],
            $_POST['goal'],
            $email
        ]);

    } else {

        // CREATE NEW CLIENT

        $stmt = $pdo->prepare("
            INSERT INTO clients
            (
                name,
                email,
                phone,
                goal
            )
            VALUES
            (
                ?,
                ?,
                ?,
                ?
            )
        ");

        $stmt->execute([
            $_POST['name'],
            $email,
            $_POST['phone'],
            $_POST['goal']
        ]);

        $clientId = $pdo->lastInsertId();

        $name = $_POST['name'];

        $prefix = strtoupper(
            substr(
                str_pad(
                    preg_replace(
                        '/[^A-Za-z]/',
                        '',
                        $name
                    ),
                    3,
                    'X'
                ),
                0,
                3
            )
        );

        $token =
            "GR_" .
            $prefix .
            "_" .
            str_pad(
                $clientId,
                6,
                "0",
                STR_PAD_LEFT
            );

        $updateStmt = $pdo->prepare("
            UPDATE clients
            SET access_token = ?
            WHERE id = ?
        ");

        $updateStmt->execute([
            $token,
            $clientId
        ]);
    }

}

$clients =
$pdo->query(
"SELECT * FROM clients ORDER BY id DESC"
)->fetchAll();

?>

<!DOCTYPE html>
<html>
<head>
<title>Clients</title>
</head>
<body>

<h1>Clients</h1>

<form method="POST">

<input
name="name"
placeholder="Name"
required>

<input
name="email"
placeholder="Email"
required>

<input
name="phone"
placeholder="Phone">

<input
name="goal"
placeholder="Goal">

<button type="submit">
Add Client
</button>

</form>

<hr>

<?php foreach($clients as $client){ ?>

<p>

<a href="client-details.php?id=<?php echo $client['id']; ?>">

<?php echo $client['name']; ?>

</a>

-

<?php echo $client['email']; ?>

-

<?php echo $client['access_token']; ?>

</p>

<?php } ?>

</body>
</html>