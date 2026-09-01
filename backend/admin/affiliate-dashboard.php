<?php
require_once '../config/database.php';

$query = $pdo->query("
SELECT
    ac.id,
    ac.affiliate_name,
    ac.affiliate_email,
    ac.code,
    ac.discount_percent,
    ac.commission_percent,
    ac.status,
    COUNT(e.id) AS total_sales,
    COALESCE(SUM(e.final_price),0) AS revenue,
    COALESCE(AVG(e.final_price),0) AS average_order,
    COALESCE(SUM(e.final_price) * ac.commission_percent / 100,0) AS commission_due
FROM affiliate_codes ac
LEFT JOIN enrollments e
ON ac.code = e.coupon_code
AND e.payment_status='Paid'
GROUP BY
ac.id,
ac.affiliate_name,
ac.affiliate_email,
ac.code,
ac.discount_percent,
ac.commission_percent,
ac.status
ORDER BY revenue DESC
");

$affiliates = $query->fetchAll(PDO::FETCH_ASSOC);

$totalAffiliates = count($affiliates);
$totalSales = 0;
$totalRevenue = 0;

foreach($affiliates as $row){
    $totalSales += $row['total_sales'];
    $totalRevenue += $row['revenue'];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Affiliate Dashboard - GRIND</title>
<style>
body{margin:0;background:#050505;color:#fff;font-family:Arial,sans-serif;padding:40px}
h1{margin-bottom:30px}
.cards{display:flex;gap:20px;flex-wrap:wrap;margin-bottom:35px}
.card{background:#111;padding:25px;border-radius:10px;min-width:220px;border:1px solid #222}
.card h3{margin:0;color:#999;font-size:15px}
.card h2{margin:12px 0 0;color:#FF8C32}
table{width:100%;border-collapse:collapse;background:#111}
th{background:#FF8C32;color:#000;padding:14px;text-align:left}
td{padding:14px;border-bottom:1px solid #222}
tr:hover{background:#1a1a1a}
.status{color:#5dd65d;font-weight:bold}
</style>
</head>
<body>

<h1>Affiliate Performance</h1>

<div class="cards">
<div class="card">
<h3>Total Affiliates</h3>
<h2><?= $totalAffiliates ?></h2>
</div>

<div class="card">
<h3>Total Sales</h3>
<h2><?= $totalSales ?></h2>
</div>

<div class="card">
<h3>Total Revenue</h3>
<h2>₹<?= number_format($totalRevenue,2) ?></h2>
</div>
</div>

<table>
<thead>
<tr>
<th>Affiliate</th>
<th>Coupon</th>
<th>Discount</th>
<th>Sales</th>
<th>Revenue</th>
<th>Avg Order</th>
<th>Commission</th>
<th>Status</th>
</tr>
</thead>
<tbody>

<?php foreach($affiliates as $row): ?>
<tr>
<td><?= htmlspecialchars($row['affiliate_name'] ?: '-') ?></td>
<td><?= htmlspecialchars($row['code']) ?></td>
<td><?= number_format($row['discount_percent'],0) ?>%</td>
<td><?= $row['total_sales'] ?></td>
<td>₹<?= number_format($row['revenue'],2) ?></td>
<td>₹<?= number_format($row['average_order'],2) ?></td>
<td>₹<?= number_format($row['commission_due'],2) ?></td>
<td><span class="status"><?= ucfirst($row['status']) ?></span></td>
</tr>
<?php endforeach; ?>

</tbody>
</table>

</body>
</html>
