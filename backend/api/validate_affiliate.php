<?php

require_once '../config/database.php';

$code = trim($_POST['code']);

$stmt = $pdo->prepare("
SELECT *
FROM affiliate_codes
WHERE code = ?
AND status='active'
");

$stmt->execute([$code]);

$row = $stmt->fetch();

if($row){

echo json_encode([
'success'=>true,
'discount'=>$row['discount_percent'],
'code'=>$row['code']
]);

}else{

echo json_encode([
'success'=>false,
'message'=>'Coupon not found'
]);

}