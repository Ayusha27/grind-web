<?php

require_once '../config/database.php';

$message = '';

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $token = trim($_POST['access_token']);
    $stmt = $pdo->prepare("
    SELECT id
    FROM clients
    WHERE access_token = ?
    LIMIT 1
");

$stmt->execute([$token]);

$client = $stmt->fetch(PDO::FETCH_ASSOC);

if(!$client){

    die("Invalid Access Token");

}

$client_id = $client['id'];

    $json = $_POST['diet_json'];

    $data = json_decode($json, true);

    if(!$data){
        die("Invalid JSON");
    }

    $pdo->prepare("
        UPDATE diet_plans
        SET is_active = 0
        WHERE client_id = ?
    ")->execute([$client_id]);

    $stmt = $pdo->prepare("
        INSERT INTO diet_plans
        (
            client_id,
            plan_name,
            diet_json,
            is_active
        )
        VALUES
        (
            ?,
            ?,
            ?,
            1
        )
    ");

    $stmt->execute([
        $client_id,
        $data['plan_name'],
        $json
    ]);

    $message = "Diet Plan Saved Successfully";
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Add Diet Plan</title>
</head>
<body>

<h2>Add Diet Plan</h2>

<?php if($message): ?>
    <p style="color:green;">
        <?php echo $message; ?>
    </p>
<?php endif; ?>

<form method="POST">

    <label>Client Token</label>
<br>

<input
    type="text"
    name="access_token"
    placeholder="e.g. GR_XXX_000000"
    style="
        width:300px;
        padding:10px;
        font-size:14px;
    "
    required
>

    <br><br>

    <label>Diet JSON</label>

    <br>

    <textarea
        name="diet_json"
        rows="25"
        style="width:100%;"
        required
    ></textarea>

    <br><br>

    <button type="submit">
        Save Diet Plan
    </button>

</form>

</body>
</html>