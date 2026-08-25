<?php

header('Content-Type: application/json');

require_once __DIR__ . '/../config/database.php';

try {

    /*
    TEMPORARY
    Later this will come from the authenticated session.
    */
    $client_id = isset($_GET['client_id'])
        ? (int) $_GET['client_id']
        : 1;

    // Get active workout plan
    $stmt = $pdo->prepare("
        SELECT *
        FROM workout_plans
        WHERE client_id = ?
        AND is_active = 1
        ORDER BY id DESC
        LIMIT 1
    ");

    $stmt->execute([$client_id]);

    $plan = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$plan) {
        echo json_encode([
            'success' => true,
            'data' => null,
            'message' => 'No workout plan assigned.'
        ]);

        exit;
    }

    // Get workout days
    $stmt = $pdo->prepare("
        SELECT *
        FROM workout_days
        WHERE plan_id = ?
        ORDER BY day_number
    ");

    $stmt->execute([$plan['id']]);

    $days = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get exercises for each day
    foreach ($days as &$day) {

        $stmt = $pdo->prepare("
            SELECT *
            FROM workout_exercises
            WHERE day_id = ?
            ORDER BY sort_order
        ");

        $stmt->execute([$day['id']]);

        $day['exercises'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode([
        'success' => true,
        'data' => [
            'plan' => $plan,
            'days' => $days
        ]
    ]);

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => 'Failed to fetch workout.'
    ]);
}