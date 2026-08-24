<?php

session_start();

require '../config/database.php';

if(!isset($_SESSION['admin_logged_in'])){
    header("Location: login.php");
    exit;
}

$client_id = $_GET['client_id'];

$stmt = $pdo->prepare("
SELECT * FROM clients
WHERE id = ?
");

$stmt->execute([$client_id]);

$client = $stmt->fetch();
?>

<?php

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $stmt = $pdo->prepare("
    INSERT INTO client_progress
    (
        client_id,
        weight,
        waist,
        chest,
        arms,
        thighs,
        notes
    )
    VALUES
    (
        ?,?,?,?,?,?,?
    )
    ");

    $stmt->execute([
        $client_id,
        $_POST['weight'],
        $_POST['waist'],
        $_POST['chest'],
        $_POST['arms'],
        $_POST['thighs'],
        $_POST['notes']
    ]);

    echo "<h3 style='color:green'>Progress Saved</h3>";
}
?>

<h1>Add Progress</h1>

<p>
Client:
<?php echo $client['name']; ?>
</p>

<form method="POST">

<p>
Weight (kg)<br>
<input type="number" step="0.1" name="weight">
</p>

<p>
Waist (inches)<br>
<input type="number" step="0.1" name="waist">
</p>

<p>
Chest (inches)<br>
<input type="number" step="0.1" name="chest">
</p>

<p>
Arms (inches)<br>
<input type="number" step="0.1" name="arms">
</p>

<p>
Thighs (inches)<br>
<input type="number" step="0.1" name="thighs">
</p>

<p>
Notes<br>
<textarea name="notes"></textarea>
</p>

<button type="submit">
Save Progress
</button>

</form>

