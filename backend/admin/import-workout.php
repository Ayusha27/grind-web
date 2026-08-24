<?php

require_once '../config/database.php';

$message = '';

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $client_id = (int)$_POST['client_id'];

    $json = $_POST['workout_json'];

    $data = json_decode($json, true);

    if(!$data){
        $message = "Invalid JSON";
    } else {

        try {

            $pdo->beginTransaction();

/* Get Next Version Number */

$versionStmt = $pdo->prepare("
    SELECT COALESCE(MAX(version_no),0) as max_version
    FROM workout_plans
    WHERE client_id = ?
");

$versionStmt->execute([$client_id]);

$versionData = $versionStmt->fetch(PDO::FETCH_ASSOC);

$nextVersion = $versionData['max_version'] + 1;

/* Deactivate Existing Plans */

$deactivateStmt = $pdo->prepare("
    UPDATE workout_plans
    SET is_active = 0
    WHERE client_id = ?
");

$deactivateStmt->execute([$client_id]);


            /* Create Workout Plan */

           $stmt = $pdo->prepare("
    INSERT INTO workout_plans
    (
        client_id,
        plan_name,
        is_active,
        version_no,
        workout_json
    )
    VALUES
    (
        ?,
        ?,
        1,
        ?,
        ?
    )
");

            $stmt->execute([
    $client_id,
    $data['plan_name'],
    $nextVersion,
    $json
]);

            $plan_id = $pdo->lastInsertId();

            /*
            Create Days
            */

            foreach($data['days'] as $dayIndex => $day){

                $dayStmt = $pdo->prepare("
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
                ");

                $dayStmt->execute([
                    $plan_id,
                    $dayIndex + 1,
                    $day['day_name']
                ]);

                $day_id = $pdo->lastInsertId();

                /*
                Exercises
                */

                foreach($day['exercises'] as $exerciseIndex => $exercise){

                    $exerciseStmt = $pdo->prepare("
                        INSERT INTO workout_exercises
                        (
                            day_id,
                            exercise_name,
                            sets_count,
                            reps,
                            youtube_url,
                            notes,
                            sort_order
                        )
                        VALUES
                        (
                            ?,
                            ?,
                            ?,
                            ?,
                            ?,
                            '',
                            ?
                        )
                    ");

                    $exerciseStmt->execute([
                        $day_id,
                        $exercise['name'],
                        $exercise['sets'],
                        $exercise['reps'],
                        $exercise['youtube'],
                        $exerciseIndex + 1
                    ]);
                }
            }

            $pdo->commit();

            $message = "Workout Imported Successfully";

        } catch(Exception $e){

            $pdo->rollBack();

            $message = $e->getMessage();
        }
    }
}

?>

<!DOCTYPE html>
<html>
<head>
<title>Import Workout</title>
</head>

<body>

<h2>Import Workout Plan</h2>

<p><?php echo $message; ?></p>

<form method="POST">

<label>Client ID</label>
<br>
<input type="number" name="client_id" required>

<br><br>

<label>Workout JSON</label>
<br>

<textarea
name="workout_json"
rows="25"
cols="120"
required></textarea>

<br><br>

<button type="submit">
Import Workout
</button>

</form>

</body>
</html>