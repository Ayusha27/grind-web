<?php

require '../config/database.php';

$exercise_id = $_GET['exercise_id'];
$day_id = $_GET['day_id'];

$user_email = "arup.theorem@gmail.com";

$stmt = $pdo->prepare("
INSERT INTO workout_logs
(
user_email,
month_no,
week_no,
day_id,
exercise_id,
set_no,
completed
)
VALUES
(
?,
1,
1,
?,
?,
1,
1
)
");

$stmt->execute([
$user_email,
$day_id,
$exercise_id
]);

header("Location: workout.php");
exit;