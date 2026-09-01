<?php

header('Content-Type: application/json');

require_once '../config/database.php';
require_once '../config/razorpay.php';
require_once '../vendor/autoload.php';

use Razorpay\Api\Api;

$plan = $_POST['plan'] ?? '';
$price = floatval($_POST['price'] ?? 0);

$coupon = trim($_POST['coupon'] ?? '');

$discount_percent = 0;

$discountEligiblePlans = [
    '3 MONTH KICKSTART',
    '6 MONTH TRANSFORMATION',
    '12 MONTH LIFESTYLE EVOLUTION'
];

if(
    $coupon != '' &&
    in_array($plan, $discountEligiblePlans)
){

    $stmt = $pdo->prepare("
        SELECT *
        FROM affiliate_codes
        WHERE code = ?
        AND status='active'
        AND expiry_date >= CURDATE()
        LIMIT 1
    ");

    $stmt->execute([$coupon]);

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if($row){

        $discount_percent =
        (int)$row['discount_percent'];

    }
}

$final_price =
$price - ($price * $discount_percent / 100);

if($price <= 0){

    echo json_encode([
        'success' => false,
        'message' => 'Price received is zero'
    ]);

    exit;
}

$api = new Api(
    RAZORPAY_KEY_ID,
    RAZORPAY_KEY_SECRET
);

$order = $api->order->create([
    'receipt' => 'GRIND_' . time(),
    'amount' => round($final_price * 100),
    'currency' => 'INR'
]);

echo json_encode([
    'success' => true,
    'order_id' => $order['id'],
    'amount' => round($final_price * 100),
    'final_price' => $final_price,
    'discount_percent' => $discount_percent
]);