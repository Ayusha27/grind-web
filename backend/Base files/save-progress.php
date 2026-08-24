<?php
require 'config.php';
$data=json_decode(file_get_contents('php://input'),true);

$stmt=$pdo->prepare("INSERT INTO workout_logs
(user_email,month_no,week_no,day_id,exercise_id,set_no,completed,created_at)
VALUES (?,?,?,?,?,?,?,NOW())");

$stmt->execute([
$data['email'],
$data['month'],
$data['week'],
$data['day'],
$data['exercise'],
$data['set'],
$data['completed']
]);

echo json_encode(['success'=>true]);
?>
