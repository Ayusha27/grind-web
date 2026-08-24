<?php

session_start();

require '../config/database.php';

if(
 !isset($_SESSION['admin_logged_in'])
){
 header("Location: login.php");
 exit;
}

$client_id = $_GET['id'];

$stmt = $pdo->prepare(
"SELECT * FROM clients WHERE id=?"
);

$stmt->execute([$client_id]);

$client = $stmt->fetch();

?>

<h1>

<?php echo $client['name']; ?>

</h1>

<p>

Email:
<?php echo $client['email']; ?>

</p>

<p>

Goal:
<?php echo $client['goal']; ?>

</p>

<hr>

<h2>Workout Plans</h2>

<p>No plans assigned yet.</p>

<hr>

<h2>Diet</h2>

<p>No diet assigned yet.</p>

<hr>

<h2>Notes</h2>

<p>No notes yet.</p>