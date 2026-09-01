<?php

session_start();

require '../config/database.php';

/*
TEMPORARY
Later we'll use login session.
For now use client ID 1.
*/

$client_id = 1;

$stmt = $pdo->prepare("
SELECT *
FROM workout_plans
WHERE client_id = ?
AND is_active = 1
ORDER BY id DESC
LIMIT 1
");

$stmt->execute([$client_id]);

$plan = $stmt->fetch();


if(!$plan){
    die("No workout plan assigned.");
}

$stmt = $pdo->prepare("
SELECT *
FROM workout_days
WHERE plan_id = ?
ORDER BY day_number
");

$stmt->execute([$plan['id']]);

$days = $stmt->fetchAll();

?>

<!DOCTYPE html>
<html>
<head>
    <title>My Workout</title>
</head>
<body>

<h1><?php echo $plan['plan_name']; ?></h1>

<hr>

<?php foreach($days as $day): ?>

    <h2>
        Day <?php echo $day['day_number']; ?>
        -
        <?php echo $day['day_name']; ?>
    </h2>
    
    <?php

$stmt = $pdo->prepare("
SELECT *
FROM workout_exercises
WHERE day_id = ?
ORDER BY sort_order
");

$stmt->execute([$day['id']]);

$exercises = $stmt->fetchAll();

?>

<ul>

<?php foreach($exercises as $exercise): ?>

<li>

<strong>
<?php echo $exercise['exercise_name']; ?>
</strong>

<br>

Sets:
<?php echo $exercise['sets_count']; ?>

<br>

Reps:
<?php echo $exercise['reps']; ?>

<br>

<a href="<?php echo $exercise['youtube_url']; ?>" target="_blank">
Watch Video
</a>
<br><br>
<a href="complete-workout.php?exercise_id=<?php echo $exercise['id']; ?>&day_id=<?php echo $day['id']; ?>">
Mark Complete
</a>


</li>

<br>

<?php endforeach; ?>

</ul>

<hr>

<?php endforeach; ?>

</body>
</html>