<?php

header('Content-Type: application/json');

require_once '../config/database.php';
require_once '../config/razorpay.php';

use Razorpay\Api\Api;

try {

    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');

    $plan = trim($_POST['plan'] ?? '');

    $original_price =
    floatval($_POST['original_price'] ?? 0);

    $final_price =
    floatval($_POST['final_price'] ?? 0);

    $discount_percent =
    intval($_POST['discount_percent'] ?? 0);

    $coupon_code =
    trim($_POST['coupon_code'] ?? '');

    $payment_id =
    trim($_POST['razorpay_payment_id'] ?? '');

    $order_id =
    trim($_POST['razorpay_order_id'] ?? '');

    $stmt = $pdo->prepare("
        INSERT INTO enrollments
        (
            name,
            email,
            phone,
            plan_name,
            original_price,
            discount_percent,
            coupon_code,
            final_price,
            razorpay_payment_id,
            razorpay_order_id,
            payment_status
        )
        VALUES
        (
            ?,?,?,?,?,?,?,?,?,?,?
        )
    ");

    $stmt->execute([
        $name,
        $email,
        $phone,
        $plan,
        $original_price,
        $discount_percent,
        $coupon_code,
        $final_price,
        $payment_id,
        $order_id,
        'Paid'
    ]);

    echo json_encode([
        'success' => true
    ]);

} catch(Exception $e){

    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);

}