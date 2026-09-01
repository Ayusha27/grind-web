<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';

try {

    $exercise_id = isset($_POST['exercise_id'])
        ? (int) $_POST['exercise_id']
        : 0;

    $day_id = isset($_POST['day_id'])
        ? (int) $_POST['day_id']
        : 0;

    $user_email = trim($_POST['user_email'] ?? '');

    if (
        $exercise_id <= 0 ||
        $day_id <= 0 ||
        $user_email === ''
    ) {
        http_response_code(400);

        echo json_encode([
            'success' => false,
            'message' => 'Missing required fields'
        ]);

        exit;
    }

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

    echo json_encode([
        'success' => true,
        'message' => 'Workout marked complete'
    ]);

} catch (Throwable $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Failed to complete workout'
    ]);
}