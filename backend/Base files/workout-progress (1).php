<?php
require_once 'config/database.php';

$user_email = "arup.theorem@gmail.com";


$totalStmt = $pdo->query("
    SELECT COUNT(*) as total
    FROM workout_exercises
");

$totalExercises = $totalStmt->fetch()['total'];

$completedStmt = $pdo->prepare("
    SELECT COUNT(DISTINCT exercise_id) as completed
    FROM workout_logs
    WHERE user_email = ?
    AND completed = 1
");

$completedStmt->execute([$user_email]);

$completedExercises = $completedStmt->fetch()['completed'];

$progress = 0;

if($totalExercises > 0){
    $progress = round(
        ($completedExercises / $totalExercises) * 100
    );
}

/*
|--------------------------------------------------------------------------
| Body Progress Data
|--------------------------------------------------------------------------
*/

$client_id = 1;

$stmt = $pdo->prepare("
SELECT *
FROM client_progress
WHERE client_id = ?
ORDER BY created_at DESC
LIMIT 1
");

$stmt->execute([$client_id]);

$current = $stmt->fetch(PDO::FETCH_ASSOC);

$stmt = $pdo->prepare("
SELECT *
FROM client_progress
WHERE client_id = ?
ORDER BY created_at ASC
LIMIT 1
");

$stmt->execute([$client_id]);

$start = $stmt->fetch(PDO::FETCH_ASSOC);

$weightLost = 0;
$waistReduced = 0;

if($current && $start){

    $weightLost =
        $start['weight']
        -
        $current['weight'];

    $waistReduced =
        $start['waist']
        -
        $current['waist'];
}

/*
|--------------------------------------------------------------------------
| Chart Data
|--------------------------------------------------------------------------
*/

$stmt = $pdo->prepare("
SELECT *
FROM client_progress
WHERE client_id = ?
ORDER BY created_at ASC
");

$stmt->execute([$client_id]);

$history = $stmt->fetchAll(PDO::FETCH_ASSOC);

$dates = [];
$weights = [];
$waists = [];

foreach($history as $row){

    $dates[] =
        date(
            'd M',
            strtotime($row['created_at'])
        );

    $weights[] = $row['weight'];
    $waists[] = $row['waist'];
}


?>

<!DOCTYPE html>
<html>

<head>
<title>Workout Progress</title>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</head>

<body>

<h1>Workout Progress</h1>

<p>
Completed Exercises:
<?php echo $completedExercises; ?>
/
<?php echo $totalExercises; ?>
</p>

<p>
<?php echo $progress; ?>% Complete
</p>

<div style="
width:400px;
height:30px;
background:#ddd;
border-radius:20px;
overflow:hidden;
">
    <div style="
    width:<?php echo $progress; ?>%;
    height:30px;
    background:green;
    ">
    </div>
</div>

<hr>

<h2>Latest Measurements</h2>

<?php if($current): ?>

<p>
Weight:
<strong><?php echo $current['weight']; ?> kg</strong>
</p>

<p>
Waist:
<strong><?php echo $current['waist']; ?> in</strong>
</p>

<p>
Chest:
<strong><?php echo $current['chest']; ?> in</strong>
</p>

<p>
Arms:
<strong><?php echo $current['arms']; ?> in</strong>
</p>

<p>
Thighs:
<strong><?php echo $current['thighs']; ?> in</strong>
</p>

<?php endif; ?>

<hr>

<h2>Transformation Stats</h2>

<p>
Weight Lost:
<strong>
<?php echo $weightLost; ?> kg
</strong>
</p>

<p>
Waist Reduced:
<strong>
<?php echo $waistReduced; ?> in
</strong>
</p>

<hr>

<h2>Progress Chart</h2>

<canvas
id="weightChart"
width="800"
height="300">
</canvas>

<script>

const labels =
<?php echo json_encode($dates); ?>;

const weightData =
<?php echo json_encode($weights); ?>;

const waistData =
<?php echo json_encode($waists); ?>;

new Chart(
document.getElementById('weightChart'),
{
type:'line',

data:{
labels:labels,

datasets:[
{
label:'Weight',
data:weightData,
borderColor:'#ff5c35',
fill:false
},
{
label:'Waist',
data:waistData,
borderColor:'#16a34a',
fill:false
}
]
}
}
);

</script>

</body>
</html>