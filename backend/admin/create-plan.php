<?php

session_start();

require '../config/database.php';

if(
 !isset($_SESSION['admin_logged_in'])
){
 header("Location: login.php");
 exit;
}

$client_id = $_GET["client_id"];

$stmt = $pdo->prepare(
"SELECT * FROM clients WHERE id=?"
);

$stmt->execute([$client_id]);

$client = $stmt->fetch();

if($_SERVER['REQUEST_METHOD']=='POST'){

    $stmt = $pdo->prepare(
"
INSERT INTO workout_plans
(
    client_id,
    plan_name,
    workout_json
)
VALUES
(
    ?,
    ?,
    ?
)
"
);

$stmt->execute([
    $client_id,
    $_POST['plan_name'],
    $_POST['workout_json']
]);

$plan_id = $pdo->lastInsertId();

$json = json_decode(
    $_POST['workout_json'],
    true
);

if(isset($json['days'])){

    $dayNumber = 1;

    foreach($json['days'] as $day){

        $stmt = $pdo->prepare(
        "
        INSERT INTO workout_days
        (
            plan_id,
            day_number,
            day_name
        )
        VALUES
        (
            ?,
            ?,
            ?
        )
        "
        );

        $stmt->execute([
            $plan_id,
            $dayNumber,
            $day['day_name']
        ]);

        $day_id = $pdo->lastInsertId();

        $dayNumber++;
        
        if(isset($day['exercises'])){

    $sortOrder = 1;

    foreach($day['exercises'] as $exercise){

        $stmt = $pdo->prepare("
            INSERT INTO workout_exercises
            (
                day_id,
                exercise_name,
                sets_count,
                reps,
                youtube_url,
                sort_order
            )
            VALUES
            (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )
        ");

        $stmt->execute([
            $day_id,
            $exercise['name'],
            $exercise['sets'],
            $exercise['reps'],
            $exercise['youtube'],
            $sortOrder
        ]);

        $sortOrder++;

            } // foreach exercises

        } // if exercises

    } // foreach days

} // if days

echo "<h3 style='color:green;'>Workout Plan Created Successfully</h3>";

} // end POST

?>

<!DOCTYPE html>
<html>
<head>
<title>Create Workout Plan</title>
</head>
<body>

<h1>

Assign Workout Plan

</h1>

<p>

Client:
<?php echo $client['name']; ?>

</p>

<form method="POST">

<input
type="text"
name="plan_name"
placeholder="Plan Name"
required>

<br><br>

<textarea
name="workout_json"
rows="20"
cols="120"
placeholder="Paste AI Workout JSON"
required
></textarea>

<br><br>

<button type="submit">

Save Workout Plan

</button>

</form>

</body>
</html>