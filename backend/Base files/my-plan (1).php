<?php

require_once 'config/database.php';

$user_email = "arup.mohanty28j@gmail.com";

/*
|--------------------------------------------------------------------------
| Workout Progress
|--------------------------------------------------------------------------
*/

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
| Load Active Workout Plan
|--------------------------------------------------------------------------
*/

$token = $_GET['token'] ?? '';

$clientStmt = $pdo->prepare("
    SELECT id
    FROM clients
    WHERE access_token = ?
");

$clientStmt->execute([$token]);

$client = $clientStmt->fetch(PDO::FETCH_ASSOC);

if(!$client){
    die("Invalid Access Link");
}

$client_id = $client['id'];

$planStmt = $pdo->prepare("
    SELECT *
    FROM workout_plans
    WHERE client_id = ?
    AND is_active = 1
    ORDER BY id DESC
    LIMIT 1
");

$planStmt->execute([$client_id]);

$plan = $planStmt->fetch(PDO::FETCH_ASSOC);

$daysData = [];

if($plan){

    $daysStmt = $pdo->prepare("
        SELECT *
        FROM workout_days
        WHERE plan_id = ?
        ORDER BY day_number ASC
    ");

    $daysStmt->execute([$plan['id']]);

    $days = $daysStmt->fetchAll(PDO::FETCH_ASSOC);

    foreach($days as $day){

        $exerciseStmt = $pdo->prepare("
            SELECT *
            FROM workout_exercises
            WHERE day_id = ?
            ORDER BY sort_order ASC
        ");


        $exerciseStmt->execute([$day['id']]);

        $exercises = [];

        while($row = $exerciseStmt->fetch(PDO::FETCH_ASSOC)){

            $exercises[] = [
                'name'  => $row['exercise_name'],
                'sets'  => (int)$row['sets_count'],
                'reps'  => $row['reps'],
                'note'  => $row['notes'],
                'yt'    => $row['youtube_url']
            ];
        }
        
        

        $colors = [
            "#ff5c35",
            "#2563eb",
            "#16a34a",
            "#9333ea",
            "#ea580c",
            "#0f766e"
        ];

        $color =
            $colors[
                ($day['day_number'] - 1)
                %
                count($colors)
            ];

        $daysData[] = [
            'id'        => (int)$day['day_number'],
            'label'     => $day['day_name'],
            'short'     => $day['day_name'],
            'color'     => $color,
            'colorSoft' => 'rgba(255,92,53,.1)',
            'calMin'    => 250,
            'calMax'    => 350,
            'calNote'   => 'Workout Day',
            'exercises' => $exercises
        ];
    }
}


/*
|--------------------------------------------------------------------------
| Load Active Diet Plan
|--------------------------------------------------------------------------
*/

$dietStmt = $pdo->prepare("
    SELECT *
    FROM diet_plans
    WHERE client_id = ?
    AND is_active = 1
    ORDER BY id DESC
    LIMIT 1
");

$dietStmt->execute([$client_id]);

$dietPlan = $dietStmt->fetch(PDO::FETCH_ASSOC);

$dietData = [];

if($dietPlan){
    $dietData = json_decode(
        $dietPlan['diet_json'],
        true
    );
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GRIND — Workout Tracker</title>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@300;400;500;600&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
:root {
  --bg:#f5f2ed; --ink:#1a1714; --ink2:#6b6560; --card:#ffffff; --border:#e0dbd4;
  --cal:#dc2626; --done-bg:#f0fdf4; --done-border:#86efac; --done-text:#15803d;
  --radius:14px; --shadow:0 2px 12px rgba(26,23,20,.08); --accent:#ff5c35;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Archivo',sans-serif;background:var(--bg);color:var(--ink);min-height:100vh;padding-bottom:80px;}
body::before{content:'';position:fixed;inset:0;opacity:.025;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");pointer-events:none;z-index:0;}

/* ── HEADER ── */
.site-header{background:var(--ink);padding:0 32px;display:flex;align-items:stretch;justify-content:space-between;gap:24px;position:sticky;top:0;z-index:200;}
.header-brand{display:flex;align-items:center;gap:0;padding:13px 0;text-decoration:none;}
.brand-icon{width:42px;height:42px;background:linear-gradient(135deg,#ff5c35,#ff8a35);border-radius:10px;display:flex;align-items:center;justify-content:center;margin-right:11px;position:relative;overflow:hidden;flex-shrink:0;}
.brand-icon::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.15),transparent 60%);}
.brand-icon svg{position:relative;z-index:1;}
.brand-text{display:flex;flex-direction:column;gap:1px;}
.brand-wordmark{font-family:'Archivo Black',sans-serif;font-size:23px;letter-spacing:5px;color:white;line-height:1;}
.brand-wordmark span{color:#ff5c35;}
.brand-powered{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(255,255,255,.3);font-weight:400;margin-top:1px;}
.brand-powered em{color:rgba(255,138,53,.7);font-style:normal;}
.brand-mark {
  width: 36px;
  height: 36px;
  background: var(--d1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Archivo Black', sans-serif;
  font-size: 16px;
  color: white;
  letter-spacing: -1px;
}
.header-stats{display:flex;align-items:center;}
.hstat{padding:0 20px;border-left:1px solid rgba(255,255,255,.1);display:flex;flex-direction:column;justify-content:center;gap:2px;}
.hstat-val{font-family:'JetBrains Mono',monospace;font-size:19px;font-weight:700;color:white;line-height:1;}
.hstat-val.calories{color:#ff8a65;}
.hstat-lbl{font-size:10px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:1.5px;}

/* ── CONTEXT BAR (week/month selector) ── */
.context-bar{background:#111118;border-bottom:1px solid rgba(255,255,255,.07);padding:10px 32px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;}
.ctx-label{font-size:11px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:1.5px;white-space:nowrap;}
.ctx-select{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:white;font-family:'Archivo',sans-serif;font-size:12px;font-weight:500;padding:5px 10px;border-radius:7px;cursor:pointer;outline:none;transition:border-color .2s;}
.ctx-select:focus,.ctx-select:hover{border-color:rgba(255,92,53,.5);}
.ctx-select option{background:#1a1714;color:white;}
.ctx-divider{width:1px;height:20px;background:rgba(255,255,255,.1);}
.ctx-info{font-size:11px;color:rgba(255,92,53,.8);margin-left:auto;display:flex;align-items:center;gap:5px;}
.ctx-dot{width:6px;height:6px;border-radius:50%;background:#ff5c35;animation:pulse 2s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

/* ── TOP NAV ── */
.top-nav{background:var(--ink);border-top:1px solid rgba(255,255,255,.06);display:flex;padding:0 32px;}
.top-nav-btn{padding:10px 22px;font-family:'Archivo',sans-serif;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,.35);border:none;background:transparent;cursor:pointer;border-bottom:3px solid transparent;transition:all .2s;white-space:nowrap;}
.top-nav-btn.active{color:white;border-bottom-color:#ff5c35;}
.top-nav-btn:hover:not(.active){color:rgba(255,255,255,.65);}

/* ── DAY PILL BAR ── */
.week-bar{background:var(--ink);border-top:1px solid rgba(255,255,255,.05);display:flex;overflow-x:auto;scrollbar-width:none;padding:0 32px;}
.week-bar::-webkit-scrollbar{display:none;}
.day-pill{flex-shrink:0;display:flex;flex-direction:column;align-items:center;padding:10px 20px 8px;cursor:pointer;border-bottom:3px solid transparent;transition:all .2s;}
.day-pill:hover{background:rgba(255,255,255,.04);}
.day-pill.active{border-bottom-color:var(--accent-day);}
.pill-num{font-family:'Archivo Black',sans-serif;font-size:18px;color:rgba(255,255,255,.22);line-height:1;transition:color .2s;}
.day-pill.active .pill-num,.day-pill.done-day .pill-num{color:white;}
.pill-label{font-size:9px;text-transform:uppercase;letter-spacing:1.5px;color:rgba(255,255,255,.28);white-space:nowrap;transition:color .2s;}
.day-pill.active .pill-label{color:rgba(255,255,255,.7);}
.pill-dot{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.12);margin-top:5px;transition:background .2s;}
.day-pill.active .pill-dot{background:var(--accent-day);}
.pill-dot.has-progress{background:rgba(255,255,255,.4);}
.pill-dot.is-done{background:#22c55e !important;}

/* ── VIEWS ── */
#workoutView,#progressView,#dietView{display:none;}
#workoutView.active,#progressView.active,#dietView.active{display:block;}
.main{padding:26px 32px;position:relative;z-index:1;}

/* ── DAY PANEL ── */
.day-panel{display:none;}
.day-panel.active{display:block;animation:slideIn .22s ease;}
@keyframes slideIn{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}}

/* ── DAY HERO ── */
.day-hero{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:20px;padding:20px 24px;background:var(--card);border-radius:var(--radius);border:1px solid var(--border);box-shadow:var(--shadow);position:relative;overflow:hidden;}
.day-hero::before{content:attr(data-day);position:absolute;right:-6px;top:-16px;font-family:'Archivo Black',sans-serif;font-size:100px;color:var(--day-color);opacity:.05;line-height:1;pointer-events:none;user-select:none;}
.hero-tag{display:inline-flex;align-items:center;gap:6px;border-radius:50px;padding:4px 12px;font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;}
.hero-title{font-family:'Archivo Black',sans-serif;font-size:21px;line-height:1.1;color:var(--ink);margin-bottom:8px;max-width:460px;}
.hero-meta{display:flex;gap:14px;flex-wrap:wrap;}
.hmeta-item{font-size:12px;color:var(--ink2);}
.hmeta-item strong{color:var(--ink);font-weight:600;}
.hero-right{display:flex;flex-direction:column;align-items:flex-end;gap:9px;flex-shrink:0;}
.radial-wrap{position:relative;width:74px;height:74px;}
.radial-wrap svg{transform:rotate(-90deg);}
.radial-bg{fill:none;stroke:var(--border);stroke-width:5;}
.radial-fill{fill:none;stroke-width:5;stroke-linecap:round;transition:stroke-dashoffset .6s cubic-bezier(.4,0,.2,1);}
.radial-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.radial-pct{font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:700;line-height:1;}
.radial-done{font-size:9px;color:var(--ink2);margin-top:1px;}
.reset-btn{display:flex;align-items:center;gap:5px;padding:6px 12px;border:1.5px solid var(--border);background:transparent;color:var(--ink2);border-radius:8px;font-size:11px;font-family:'Archivo',sans-serif;font-weight:500;cursor:pointer;transition:all .2s;}
.reset-btn:hover{border-color:var(--cal);color:var(--cal);}

/* ── WEEK CONTEXT BADGE ── */
.week-context-badge{display:flex;align-items:center;gap:8px;padding:10px 16px;background:rgba(255,92,53,.06);border:1.5px dashed rgba(255,92,53,.25);border-radius:10px;margin-bottom:16px;font-size:12px;color:var(--ink2);}
.week-context-badge strong{color:var(--accent);font-weight:600;}
.week-context-badge .auto-tag{background:var(--accent);color:white;font-size:10px;font-weight:700;padding:2px 8px;border-radius:50px;letter-spacing:.5px;margin-left:auto;}

.calorie-strip{display:flex;align-items:center;gap:12px;padding:12px 16px;background:linear-gradient(135deg,#fff5f0,#fff);border:1.5px solid #fecaca;border-radius:10px;margin-bottom:16px;}
.cal-flame{font-size:22px;}
.cal-info{flex:1;}
.cal-range{font-family:'JetBrains Mono',monospace;font-size:17px;font-weight:700;color:var(--cal);line-height:1;}
.cal-label{font-size:11px;color:var(--ink2);margin-top:2px;}
.cal-breakdown{display:flex;gap:7px;flex-wrap:wrap;}
.cal-tag{background:rgba(220,38,38,.07);color:var(--cal);border-radius:50px;padding:3px 10px;font-size:11px;font-weight:500;}

.day-progress-wrap{margin-bottom:16px;}
.progress-labels{display:flex;justify-content:space-between;font-size:11px;color:var(--ink2);margin-bottom:5px;}
.progress-bar{height:5px;background:var(--border);border-radius:3px;overflow:hidden;}
.progress-fill{height:100%;border-radius:3px;transition:width .5s cubic-bezier(.4,0,.2,1);width:0%;}


/* ── WARM-UP CHECKLIST ── */
.warmup-section{
  background:linear-gradient(135deg,#fffaf7,#fff);
  border:1.5px solid #fed7c7;
  border-radius:var(--radius);
  margin-bottom:16px;
  overflow:hidden;
  box-shadow:var(--shadow);
}
.warmup-head{
  display:flex;
  align-items:flex-start;
  gap:12px;
  padding:16px 18px;
  border-bottom:1px solid #f3e5de;
}
.warmup-icon{
  width:38px;height:38px;border-radius:10px;
  background:rgba(255,92,53,.1);
  display:flex;align-items:center;justify-content:center;
  font-size:20px;flex-shrink:0;
}
.warmup-title{
  font-family:'Archivo Black',sans-serif;
  font-size:15px;color:var(--ink);
}
.warmup-note{
  font-size:12px;color:var(--ink2);
  line-height:1.5;margin-top:4px;
}
.warmup-list{padding:8px 14px 14px;}
.warmup-item{
  display:flex;align-items:center;gap:11px;
  padding:11px 8px;
  border-bottom:1px solid rgba(224,219,212,.65);
  cursor:pointer;user-select:none;
}
.warmup-item:last-child{border-bottom:none;}
.warmup-check{
  width:21px;height:21px;border:2px solid var(--border);
  border-radius:6px;background:#fff;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;transition:all .18s;
}
.warmup-item.done .warmup-check{background:#22c55e;border-color:#22c55e;}
.warmup-item.done .warmup-check::after{
  content:'';width:9px;height:5px;
  border-left:2px solid #fff;border-bottom:2px solid #fff;
  transform:rotate(-45deg) translate(1px,-1px);
}
.warmup-info{flex:1;}
.warmup-name{font-size:13px;font-weight:600;color:var(--ink);}
.warmup-item.done .warmup-name{text-decoration:line-through;color:var(--ink2);}
.warmup-duration{
  font-family:'JetBrains Mono',monospace;
  font-size:10px;color:var(--ink2);margin-top:2px;
}

.warmup-actions{
  display:flex;
  align-items:center;
  gap:8px;
  flex-shrink:0;
}
.warmup-yt-btn{
  display:flex;
  align-items:center;
  gap:4px;
  padding:5px 10px;
  background:#ff0000;
  color:#fff;
  border-radius:6px;
  font-size:11px;
  font-weight:600;
  text-decoration:none;
  transition:opacity .2s,transform .15s;
  white-space:nowrap;
}
.warmup-yt-btn:hover{
  opacity:.85;
  transform:scale(1.04);
}
@media(max-width:480px){
  .warmup-yt-btn{
    padding:5px 8px;
    font-size:10px;
  }
  .warmup-yt-text{display:none;}
}

.warmup-status{
  font-size:10px;font-weight:700;color:var(--accent);
  text-transform:uppercase;letter-spacing:.8px;
}
.warmup-item.done 
.warmup-actions{
  display:flex;
  align-items:center;
  gap:8px;
  flex-shrink:0;
}
.warmup-yt-btn{
  display:flex;
  align-items:center;
  gap:4px;
  padding:5px 10px;
  background:#ff0000;
  color:#fff;
  border-radius:6px;
  font-size:11px;
  font-weight:600;
  text-decoration:none;
  transition:opacity .2s,transform .15s;
  white-space:nowrap;
}
.warmup-yt-btn:hover{
  opacity:.85;
  transform:scale(1.04);
}
@media(max-width:480px){
  .warmup-yt-btn{
    padding:5px 8px;
    font-size:10px;
  }
  .warmup-yt-text{display:none;}
}

.warmup-status{color:var(--done-text);}
@media(max-width:768px){
  .warmup-head{padding:14px;}
  .warmup-list{padding:6px 10px 12px;}
  
.warmup-actions{
  display:flex;
  align-items:center;
  gap:8px;
  flex-shrink:0;
}
.warmup-yt-btn{
  display:flex;
  align-items:center;
  gap:4px;
  padding:5px 10px;
  background:#ff0000;
  color:#fff;
  border-radius:6px;
  font-size:11px;
  font-weight:600;
  text-decoration:none;
  transition:opacity .2s,transform .15s;
  white-space:nowrap;
}
.warmup-yt-btn:hover{
  opacity:.85;
  transform:scale(1.04);
}
@media(max-width:480px){
  .warmup-yt-btn{
    padding:5px 8px;
    font-size:10px;
  }
  .warmup-yt-text{display:none;}
}

.warmup-status{display:none;}
}

/* ── EXERCISE CARDS ── */
.exercise-card{background:var(--card);border:1.5px solid var(--border);border-radius:var(--radius);margin-bottom:9px;overflow:hidden;transition:border-color .2s,box-shadow .2s,transform .15s;box-shadow:var(--shadow);}
.exercise-card:hover{transform:translateY(-1px);box-shadow:0 5px 18px rgba(26,23,20,.09);}
.exercise-card.completed{border-color:var(--done-border);background:var(--done-bg);}
.ex-header{display:flex;align-items:center;gap:11px;padding:13px 15px;cursor:pointer;user-select:none;}
.ex-num{font-family:'Archivo Black',sans-serif;font-size:12px;width:26px;height:26px;border-radius:6px;display:flex;align-items:center;justify-content:center;background:var(--border);color:var(--ink2);flex-shrink:0;transition:all .2s;}
.exercise-card.completed .ex-num{background:var(--done-border);color:var(--done-text);}
.ex-info{flex:1;}
.ex-name{font-weight:600;font-size:14px;color:var(--ink);line-height:1.2;}
.exercise-card.completed .ex-name{text-decoration:line-through;color:var(--ink2);}
.ex-spec{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--ink2);margin-top:2px;}
.ex-note{font-size:11px;color:var(--ink2);font-style:italic;margin-top:2px;}
.ex-actions{display:flex;align-items:center;gap:7px;flex-shrink:0;}
.yt-btn{display:flex;align-items:center;gap:4px;padding:5px 10px;background:#ff0000;color:white;border-radius:6px;font-size:11px;font-weight:600;text-decoration:none;transition:opacity .2s,transform .15s;white-space:nowrap;}
.yt-btn:hover{opacity:.85;transform:scale(1.04);}
.expand-chevron{color:var(--ink2);transition:transform .3s;flex-shrink:0;}
.exercise-card.open .expand-chevron{transform:rotate(180deg);}
.sets-panel{display:none;padding:3px 15px 14px;}
.exercise-card.open .sets-panel{display:block;}
.sets-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--ink2);margin-bottom:7px;padding-top:8px;border-top:1px solid var(--border);}
.sets-row{display:flex;flex-wrap:wrap;gap:7px;}
.set-tile{display:flex;align-items:center;gap:8px;padding:9px 12px;border:1.5px solid var(--border);border-radius:10px;cursor:pointer;transition:all .18s;background:var(--bg);user-select:none;min-width:96px;}
.set-tile:hover{border-color:var(--day-color);}
.set-tile.done{background:var(--done-bg);border-color:var(--done-border);}
.set-check{width:18px;height:18px;border-radius:5px;border:2px solid var(--border);background:white;display:flex;align-items:center;justify-content:center;transition:all .18s;flex-shrink:0;}
.set-tile.done .set-check{background:#22c55e;border-color:#22c55e;}
.set-tile.done .set-check::after{content:'';display:block;width:9px;height:5px;border-left:2px solid white;border-bottom:2px solid white;transform:rotate(-45deg) translate(1px,-1px);}
.set-title{font-size:10px;color:var(--ink2);text-transform:uppercase;letter-spacing:1px;}
.set-reps{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:var(--ink);}
.set-tile.done .set-reps{color:var(--done-text);}
.set-tile.done .set-title{color:rgba(21,128,61,.6);}

.day-complete{display:none;align-items:center;gap:14px;padding:15px 19px;background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:2px solid #86efac;border-radius:var(--radius);margin-bottom:16px;}
.day-complete.visible{display:flex;animation:popIn .4s cubic-bezier(.34,1.56,.64,1);}
@keyframes popIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
.complete-emoji{font-size:30px;}
.complete-text h3{font-family:'Archivo Black',sans-serif;font-size:17px;color:#15803d;}
.complete-text p{font-size:12px;color:#16a34a;margin-top:2px;}
.complete-cal{margin-left:auto;text-align:right;}
.complete-cal-val{font-family:'JetBrains Mono',monospace;font-size:19px;font-weight:700;color:var(--cal);}
.complete-cal-lbl{font-size:10px;color:var(--ink2);text-transform:uppercase;letter-spacing:1px;}

/* ═══════════════════════════════════════
   ANALYTICS
═══════════════════════════════════════ */
.analytics-wrap{padding:26px 32px;position:relative;z-index:1;}
.analytics-header{margin-bottom:22px;}
.analytics-header h2{font-family:'Archivo Black',sans-serif;font-size:22px;color:var(--ink);}
.analytics-header p{font-size:12px;color:var(--ink2);margin-top:3px;}

/* ═══════════════════════════════════════
   DIET UI
═══════════════════════════════════════ */

.nutrition-cards{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:12px;
    margin-bottom:20px;
}

.nutri-card{
    background:#fff;
    border:1px solid var(--border);
    border-radius:14px;
    padding:16px;
    box-shadow:var(--shadow);
}

.nutri-label{
    font-size:11px;
    text-transform:uppercase;
    color:var(--ink2);
    margin-bottom:6px;
}

.nutri-value{
    font-family:'JetBrains Mono', monospace;
    font-size:22px;
    font-weight:700;
}

.bmi-blue{
    border-left:5px solid #3b82f6;
}

.bmi-green{
    border-left:5px solid #22c55e;
}

.bmi-yellow{
    border-left:5px solid #f59e0b;
}

.bmi-red{
    border-left:5px solid #ef4444;
}

.meal-option{
    background:#fafafa;
    border:1px solid #e5e5e5;
    border-radius:12px;
    padding:12px;
    margin-top:10px;
}

.option-title{
    font-weight:700;
    margin-bottom:8px;
}

.option-item{
    font-size:13px;
    color:#555;
    margin:4px 0;
}

.meal-subtitle{
    font-size:12px;
    color:var(--accent);
    margin-top:4px;
}

.diet-disclaimer{
    margin:15px 0 20px;
    padding:14px;
    border-radius:12px;
    background:#fff8e1;
    border:1px solid #facc15;
    color:#92400e;
    font-size:13px;
    line-height:1.6;
}


/* ── DIET CALORIE TRACKER ── */
.calorie-tracker{
    background:var(--ink);
    color:#fff;
    border-radius:14px;
    padding:18px 20px;
    margin-bottom:18px;
    box-shadow:var(--shadow);
}
.calorie-tracker-top{
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    gap:14px;
    margin-bottom:10px;
}
.calorie-tracker-label{
    font-size:11px;
    text-transform:uppercase;
    letter-spacing:1.5px;
    color:rgba(255,255,255,.45);
}
.calorie-tracker-value{
    font-family:'JetBrains Mono',monospace;
    font-size:25px;
    font-weight:700;
    margin-top:4px;
}
.calorie-tracker-value span{
    color:#ff8a65;
}
.calorie-tracker-target{
    font-size:11px;
    color:rgba(255,255,255,.5);
    text-align:right;
}
.diet-cal-bar{
    height:7px;
    background:rgba(255,255,255,.12);
    border-radius:50px;
    overflow:hidden;
}
.diet-cal-fill{
    height:100%;
    width:0%;
    background:var(--accent);
    border-radius:50px;
    transition:width .4s ease;
}
.diet-cal-note{
    font-size:11px;
    color:rgba(255,255,255,.5);
    margin-top:8px;
}
.option-header{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    gap:12px;
}
.option-calories{
    flex-shrink:0;
    background:rgba(255,92,53,.1);
    color:var(--accent);
    border:1px solid rgba(255,92,53,.2);
    border-radius:50px;
    padding:4px 9px;
    font-family:'JetBrains Mono',monospace;
    font-size:11px;
    font-weight:700;
}
.meal-option{
    transition:border-color .2s, background .2s, transform .15s;
}
.meal-option.selected{
    border-color:var(--done-border);
    background:var(--done-bg);
}
.meal-select-btn{
    width:100%;
    margin-top:11px;
    padding:9px 12px;
    border:1.5px solid var(--border);
    border-radius:8px;
    background:#fff;
    color:var(--ink2);
    font-family:'Archivo',sans-serif;
    font-size:11px;
    font-weight:700;
    cursor:pointer;
    text-transform:uppercase;
    letter-spacing:.7px;
    transition:all .2s;
}
.meal-select-btn:hover{
    border-color:var(--accent);
    color:var(--accent);
}
.meal-option.selected .meal-select-btn{
    background:#22c55e;
    border-color:#22c55e;
    color:#fff;
}
@media(max-width:768px){
    .calorie-tracker{padding:16px;}
    .calorie-tracker-value{font-size:21px;}
    .option-header{align-items:center;}
}

/* MONTH TABS */
.month-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;gap:12px;flex-wrap:wrap;}
.month-tabs{display:flex;gap:6px;}
.month-tab{padding:7px 18px;border-radius:50px;border:1.5px solid var(--border);background:var(--card);color:var(--ink2);font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Archivo',sans-serif;}
.month-tab.active{background:var(--ink);color:white;border-color:var(--ink);}
.month-tab:hover:not(.active){border-color:var(--ink);}

/* WEEK SELECTOR (inside analytics) */
.week-selector-row{display:flex;gap:6px;margin-bottom:20px;overflow-x:auto;scrollbar-width:none;padding-bottom:4px;}
.week-selector-row::-webkit-scrollbar{display:none;}
.week-sel-btn{flex-shrink:0;padding:7px 16px;border-radius:8px;border:1.5px solid var(--border);background:var(--card);color:var(--ink2);font-size:12px;font-weight:500;cursor:pointer;transition:all .2s;font-family:'JetBrains Mono',monospace;white-space:nowrap;}
.week-sel-btn.active{background:var(--accent);color:white;border-color:var(--accent);}
.week-sel-btn.has-data{border-color:#86efac;color:var(--done-text);}
.week-sel-btn.active.has-data{background:var(--accent);color:white;border-color:var(--accent);}
.week-sel-btn:hover:not(.active){border-color:var(--ink);}

/* SUMMARY CARDS */
.month-summary-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:11px;margin-bottom:22px;}
.mscard{background:var(--card);border:1.5px solid var(--border);border-radius:var(--radius);padding:17px;box-shadow:var(--shadow);position:relative;overflow:hidden;}
.mscard::after{content:attr(data-icon);position:absolute;right:12px;top:8px;font-size:30px;opacity:.1;}
.mscard-val{font-family:'JetBrains Mono',monospace;font-size:26px;font-weight:700;color:var(--ink);line-height:1;margin-bottom:4px;}
.mscard-lbl{font-size:11px;color:var(--ink2);text-transform:uppercase;letter-spacing:1.5px;}
.mscard-sub{font-size:12px;color:var(--ink2);margin-top:6px;}
.mscard-sub span{color:var(--done-text);font-weight:600;}
.mscard.highlight{background:var(--ink);border-color:var(--ink);}
.mscard.highlight .mscard-val{color:white;}
.mscard.highlight .mscard-lbl{color:rgba(255,255,255,.4);}
.mscard.highlight .mscard-sub{color:rgba(255,255,255,.5);}
.mscard.highlight .mscard-sub span{color:#ff8a65;}

/* WEEK DETAIL */
.section-title{font-family:'Archivo Black',sans-serif;font-size:15px;color:var(--ink);margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.section-badge{background:var(--border);color:var(--ink2);border-radius:50px;padding:2px 10px;font-size:11px;font-family:'Archivo',sans-serif;font-weight:500;}

/* DAY GRID (5 workout days per week) */
.wday-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:22px;}
.wday-cell{background:var(--card);border:1.5px solid var(--border);border-radius:12px;padding:14px 10px;text-align:center;transition:all .2s;box-shadow:var(--shadow);}
.wday-cell.done{border-color:var(--done-border);background:var(--done-bg);}
.wday-cell.partial{border-color:#fde68a;background:#fffbeb;}
.wday-cell.empty{opacity:.55;}
.wday-badge{font-size:22px;margin-bottom:6px;}
.wday-name{font-family:'Archivo Black',sans-serif;font-size:13px;color:var(--ink);margin-bottom:3px;}
.wday-focus{font-size:10px;font-weight:600;margin-bottom:5px;text-transform:uppercase;letter-spacing:.8px;}
.wday-stats{display:flex;flex-direction:column;gap:3px;}
.wday-stat{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--ink2);}
.wday-stat span{font-weight:700;}
.wday-stat span.green{color:var(--done-text);}
.wday-stat span.red{color:var(--cal);}
.wday-mini-bar{height:4px;background:var(--border);border-radius:2px;margin-top:6px;overflow:hidden;}
.wday-mini-fill{height:100%;border-radius:2px;transition:width .6s ease;}

/* WEEK SUMMARY STRIP */
.week-summary-strip{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:22px;}
.wsstrip-card{background:var(--card);border:1.5px solid var(--border);border-radius:12px;padding:14px 16px;box-shadow:var(--shadow);text-align:center;}
.wsstrip-val{font-family:'JetBrains Mono',monospace;font-size:22px;font-weight:700;color:var(--ink);line-height:1;margin-bottom:3px;}
.wsstrip-lbl{font-size:11px;color:var(--ink2);text-transform:uppercase;letter-spacing:1px;}

/* 3-MONTH CHART */
.chart-section{background:var(--card);border:1.5px solid var(--border);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow);}
.chart-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;}
.chart-title{font-family:'Archivo Black',sans-serif;font-size:15px;color:var(--ink);}
.chart-legend{display:flex;gap:14px;}
.legend-item{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink2);}
.legend-dot{width:8px;height:8px;border-radius:50%;}
.chart-body{display:flex;gap:4px;align-items:flex-end;height:130px;}
.bar-group{display:flex;flex-direction:column;align-items:center;flex:1;}
.bar-cols{display:flex;gap:3px;align-items:flex-end;height:110px;}
.bar{border-radius:4px 4px 0 0;transition:height .7s cubic-bezier(.4,0,.2,1);cursor:pointer;position:relative;min-width:16px;}
.bar:hover::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 4px);left:50%;transform:translateX(-50%);background:var(--ink);color:white;padding:4px 8px;border-radius:5px;font-size:10px;white-space:nowrap;pointer-events:none;z-index:10;}
.bar-sub-label{font-size:9px;color:var(--ink2);margin-top:5px;text-align:center;font-family:'JetBrains Mono',monospace;}
.bar-main-label{font-size:11px;font-weight:700;color:var(--ink2);font-family:'Archivo Black',sans-serif;letter-spacing:1px;}

/* EMPTY STATE */
.empty-week{text-align:center;padding:40px 20px;color:var(--ink2);}
.empty-week .empty-icon{font-size:40px;margin-bottom:10px;}
.empty-week p{font-size:13px;}
.empty-week strong{color:var(--ink);}

/* TOAST */
.toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(16px);background:var(--ink);color:white;padding:11px 22px;border-radius:50px;font-size:12px;font-weight:500;opacity:0;transition:all .3s;pointer-events:none;z-index:1000;white-space:nowrap;}
.toast.show{opacity:1;transform:translateX(-50%) translateY(0);}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */

.grind-footer{

    padding:20px;
    text-align:center;

    border-top:1px solid var(--border);

    background:#fff;

    margin-top:30px;

    font-size:13px;
}

.footer-link{

    color:var(--accent);

    text-decoration:none;

    font-weight:600;
}

.footer-link:hover{

    opacity:.85;
}

.footer-divider{

    margin:0 10px;

    color:#999;
}

.insta-link{

    display:inline-flex;
    align-items:center;
    gap:8px;
}

.insta-link i{

    font-size:20px;
}

.support-text{

    margin-top:12px;

    color:var(--ink2);

    font-size:13px;
}


/* RESPONSIVE */
@media(max-width:768px){
  .month-summary-grid{grid-template-columns:repeat(2,1fr);}
  .wday-grid{grid-template-columns:repeat(2,1fr);}
  .site-header{padding:0 16px;}
  .context-bar,.top-nav,.week-bar{padding:0 16px;}
  .main,.analytics-wrap{padding:16px;}
  .header-stats{display:none;}
  .week-summary-strip{grid-template-columns:repeat(3,1fr);}
  .nutrition-cards{grid-template-columns:repeat(2,1fr);}
  .grind-footer{display:flex;flex-direction:column;gap:10px;}
.footer-divider{display:none;}
}
</style>

<link rel="stylesheet"
href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

</head>
<body>

<!-- HEADER -->
<header class="site-header">
  <a class="header-brand" href="#">
    <div class="brand-text">
      <div class="brand-wordmark">GRIND<span>.</span></div>
      <div class="brand-powered">powered by <em>Trend</em></div>
    </div>
  </a>
  <div class="header-stats">
    <div class="hstat">
      <div class="hstat-val" id="hTotalSets">0/0</div>
      <div class="hstat-lbl">Sets Done</div>
    </div>
    <div class="hstat">
      <div class="hstat-val" id="hDaysDone">0/5</div>
      <div class="hstat-lbl">Days Done</div>
    </div>
    <div class="hstat">
      <div class="hstat-val calories" id="hCalories">0</div>
      <div class="hstat-lbl">~kcal Today</div>
    </div>
  </div>
</header>

<!-- CONTEXT BAR: which Month + Week am I logging to? -->
<div class="context-bar">
  <span class="ctx-label">Logging to</span>
  <select class="ctx-select" id="ctxMonth" onchange="onContextChange()">
    <option value="0">Month 1</option>
    <option value="1">Month 2</option>
    <option value="2">Month 3</option>
  </select>
  <div class="ctx-divider"></div>
  <select class="ctx-select" id="ctxWeek" onchange="onContextChange()">
    <option value="0">Week 1</option>
    <option value="1">Week 2</option>
    <option value="2">Week 3</option>
    <option value="3">Week 4</option>
  </select>
  <div class="ctx-info">
    <div class="ctx-dot"></div>
    Auto-syncing to Progress
  </div>
</div>

<!-- TOP NAV -->
<div class="top-nav">

  <button class="top-nav-btn active" id="navWorkout" onclick="switchView('workout')">🏋️ Workout</button>
  <button class="top-nav-btn" id="navDiet" onclick="switchView('diet')">
      🍽️ Diet</button>
  <button class="top-nav-btn" id="navProgress" onclick="switchView('progress')">📊 Progress</button>
</div>

<!-- DAY PILL BAR -->
<div class="week-bar" id="weekBar"></div>

<!-- ═══ WORKOUT VIEW ═══ -->
<div id="workoutView" class="active">
  <div class="main" id="main"></div>
</div>

<!-- ═══ DIET VIEW ═══ -->
<div id="dietView">

    <div class="analytics-wrap">

        <div class="analytics-header">
            <h2>AI Nutrition Plan</h2>
            <p>Personalized by GRIND AI</p>
        </div>

        <div id="dietContainer"></div>

    </div>

</div>


<!-- ═══ PROGRESS VIEW ═══ -->
<div id="progressView">
  <div class="analytics-wrap">
    <div class="analytics-header">
        <div id="weightSummary"></div>
      <h2>Progress Tracker</h2>
      <p>All data flows automatically from your workout check-ins — no manual entry needed.</p>
    </div>

    <!-- Month tabs -->
    <div class="month-row">
      <div class="month-tabs" id="monthTabs"></div>
    </div>

    <!-- Month summary cards -->
    <div class="month-summary-grid" id="summaryCards"></div>

    <!-- Week selector -->
    <div class="section-title">Weekly Detail</div>
    <div class="week-selector-row" id="weekSelectorRow"></div>

    <!-- Week content -->
    <div class="section-title" id="weekDetailTitle">Week 1 — Day Breakdown</div>
    <div class="wday-grid" id="wdayGrid"></div>

    <!-- Week summary strip -->
    <div class="week-summary-strip" id="weekSummaryStrip"></div>
    <div id="weeklyWeightTracker"></div>

    <!-- 3-month chart -->
    <div class="section-title">3-Month Overview</div>
    <div class="chart-section">
      <div class="chart-header">
        <div class="chart-title">Workouts · Calories · Score — per month</div>
        <div class="chart-legend">
          <div class="legend-item"><div class="legend-dot" style="background:#ff5c35"></div>Workouts</div>
          <div class="legend-item"><div class="legend-dot" style="background:#2563eb"></div>kcal ÷10</div>
          <div class="legend-item"><div class="legend-dot" style="background:#22c55e"></div>Score %</div>
        </div>
      </div>
      <div class="chart-body" id="threeMonthChart"></div>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
// ═══════════════════════════════════════════
//  DATA
// ═══════════════════════════════════════════

const DAYS = <?php echo json_encode($daysData); ?>;
const DIET_PLAN = <?php echo json_encode($dietData); ?>;

const WARMUPS = [
  {
    name:'Arm Circles',
    duration:'30 sec forward + 30 sec backward',
    yt:'arm circles proper form warm up'
  },
  {
    name:'Shoulder Rolls',
    duration:'10 reps each direction',
    yt:'shoulder rolls proper form warm up'
  },
  {
    name:'Bodyweight Squats',
    duration:'12–15 controlled reps',
    yt:'bodyweight squat proper form'
  },
  {
    name:'Hip Circles',
    duration:'10 reps each direction',
    yt:'hip circles mobility warm up proper form'
  },
  {
    name:'Jumping Jacks or March in Place',
    duration:'60 sec',
    yt:'jumping jacks proper form warm up'
  }
];

console.log('DAYS FROM DATABASE', DAYS);

// ═══════════════════════════════════════════
//  STATE
//  workoutState[monthIdx][weekIdx][dayId] = { sets:{ei:{si:bool}}, savedAt }
// ═══════════════════════════════════════════
let ws = {};
try { ws = JSON.parse(localStorage.getItem('grind_v4') || '{}'); } catch(e){ ws={}; }

// Current context
let ctxMonth = 0, ctxWeek = 0;
try {
  const saved = JSON.parse(localStorage.getItem('grind_v4_ctx') || '{}');
  ctxMonth = saved.m || 0;
  ctxWeek  = saved.w || 0;
} catch(e){}

function saveCtx(){ localStorage.setItem('grind_v4_ctx', JSON.stringify({m:ctxMonth,w:ctxWeek})); }

function ensureSlot(m, w, did) {
  if(!ws[m]) ws[m]={};
  if(!ws[m][w]) ws[m][w]={};
  if(!ws[m][w][did]) ws[m][w][did]={sets:{}, pct:0, cal:0};
  DAYS.find(d=>d.id===did).exercises.forEach((ex,ei)=>{
    if(!ws[m][w][did].sets[ei]) ws[m][w][did].sets[ei]={};
    for(let s=0;s<ex.sets;s++) if(ws[m][w][did].sets[ei][s]===undefined) ws[m][w][did].sets[ei][s]=false;
  });
}

function saveWS(){ localStorage.setItem('grind_v4', JSON.stringify(ws)); }

// Convenience: get current slot's set state for a day
function getSet(did, ei, si){ ensureSlot(ctxMonth,ctxWeek,did); return ws[ctxMonth][ctxWeek][did].sets[ei]?.[si]||false; }
function setSet(did, ei, si, val){ ensureSlot(ctxMonth,ctxWeek,did); if(!ws[ctxMonth][ctxWeek][did].sets[ei]) ws[ctxMonth][ctxWeek][did].sets[ei]={}; ws[ctxMonth][ctxWeek][did].sets[ei][si]=val; }


function ensureWarmupSlot(m,w,did){
  ensureSlot(m,w,did);
  if(!ws[m][w][did].warmups) ws[m][w][did].warmups={};
  WARMUPS.forEach((_,i)=>{
    if(ws[m][w][did].warmups[i]===undefined) ws[m][w][did].warmups[i]=false;
  });
}
function getWarmup(did,wi){
  ensureWarmupSlot(ctxMonth,ctxWeek,did);
  return ws[ctxMonth][ctxWeek][did].warmups[wi] || false;
}
function setWarmup(did,wi,val){
  ensureWarmupSlot(ctxMonth,ctxWeek,did);
  ws[ctxMonth][ctxWeek][did].warmups[wi]=val;
}

// ═══════════════════════════════════════════
//  DERIVED CALCULATIONS
// ═══════════════════════════════════════════
function dayDone(d){
  let n=0;
  d.exercises.forEach((ex,ei)=>{ for(let s=0;s<ex.sets;s++) if(getSet(d.id,ei,s)) n++; });
  return n;
}
function dayTotal(d){ return d.exercises.reduce((a,ex)=>a+ex.sets,0); }
function isExDone(d,ei){ return d.exercises[ei] && Array.from({length:d.exercises[ei].sets},(_,s)=>getSet(d.id,ei,s)).every(Boolean); }
function isDayComplete(d){ return dayDone(d)===dayTotal(d) && dayTotal(d)>0; }

function dayPct(d){ const t=dayTotal(d); return t?Math.round(dayDone(d)/t*100):0; }

function dayCalories(d){
  const done=dayDone(d), total=dayTotal(d);
  if(!total) return 0;
  const r=done/total;
  return Math.round((d.calMin+(d.calMax-d.calMin)*r)*r);
}

// Get snapshot of a specific slot (m,w,did)
function slotPct(m,w,did){
  const d=DAYS.find(x=>x.id===did); if(!d) return 0;
  let done=0, total=dayTotal(d);
  d.exercises.forEach((ex,ei)=>{ for(let s=0;s<ex.sets;s++) if((ws[m]&&ws[m][w]&&ws[m][w][did]&&ws[m][w][did].sets[ei])?.[s]) done++; });
  return total?Math.round(done/total*100):0;
}

function slotCal(m,w,did){
  const d=DAYS.find(x=>x.id===did); if(!d) return 0;
  let done=0, total=dayTotal(d);
  d.exercises.forEach((ex,ei)=>{ for(let s=0;s<ex.sets;s++) if((ws[m]&&ws[m][w]&&ws[m][w][did]&&ws[m][w][did].sets[ei])?.[s]) done++; });
  if(!total) return 0;
  const r=done/total;
  return Math.round((d.calMin+(d.calMax-d.calMin)*r)*r);
}

function slotHasData(m,w,did){
  if(!ws[m]||!ws[m][w]||!ws[m][w][did]) return false;
  return slotPct(m,w,did)>0;
}

// Month aggregates
function monthStats(m){
  let workouts=0, calories=0, totalPossible=5*4;
  for(let w=0;w<4;w++) DAYS.forEach(d=>{ const p=slotPct(m,w,d.id); if(p>0){ workouts++; calories+=slotCal(m,w,d.id); } });
  const score=Math.min(100,Math.round((workouts/totalPossible)*100));
  return {workouts, calories, score, totalPossible};
}

// Week aggregates
function weekStats(m,w){
  let workouts=0, calories=0;
  DAYS.forEach(d=>{ const p=slotPct(m,w,d.id); if(p>0){ workouts++; calories+=slotCal(m,w,d.id); } });
  const score=Math.min(
    100,
    Math.round((workouts / DAYS.length) * 100)
);
  return {workouts, calories, score};
}

function weekHasAnyData(m,w){ return DAYS.some(d=>slotHasData(m,w,d.id)); }

// ═══════════════════════════════════════════
//  HEADER
// ═══════════════════════════════════════════
function updateHeader(){
  const totalSets = DAYS.reduce((a,d)=>a+dayTotal(d),0);
  const doneSets  = DAYS.reduce((a,d)=>a+dayDone(d),0);
  const completeDays = DAYS.filter(d=>isDayComplete(d)).length;
  const totalCal = DAYS.reduce((a,d)=>a+dayCalories(d),0);
  document.getElementById('hTotalSets').textContent = doneSets+'/'+totalSets;
  document.getElementById('hDaysDone').textContent =
    completeDays + '/' + DAYS.length;
  document.getElementById('hCalories').textContent  = totalCal.toLocaleString();
}

// ═══════════════════════════════════════════
//  CONTEXT BAR
// ═══════════════════════════════════════════
function onContextChange(){
  ctxMonth = parseInt(document.getElementById('ctxMonth').value);
  ctxWeek  = parseInt(document.getElementById('ctxWeek').value);
  saveCtx();
  // Re-render all workout panels so set states reflect new slot
  renderMain();
  switchDay(activeDay);
  autoOpen();
  updateHeader();
  showToast(`📍 Now logging to Month ${ctxMonth+1} · Week ${ctxWeek+1}`);
}

function initContextBar(){
  document.getElementById('ctxMonth').value = ctxMonth;
  document.getElementById('ctxWeek').value  = ctxWeek;
}

// ═══════════════════════════════════════════
//  VIEW SWITCHING
// ═══════════════════════════════════════════
let currentView='workout';

function switchView(v){

    currentView = v;

    document.getElementById('workoutView')
        .classList.toggle('active', v==='workout');

    document.getElementById('dietView')
        .classList.toggle('active', v==='diet');

    document.getElementById('progressView')
        .classList.toggle('active', v==='progress');

    document.getElementById('navWorkout')
        .classList.toggle('active', v==='workout');

    document.getElementById('navDiet')
        .classList.toggle('active', v==='diet');

    document.getElementById('navProgress')
        .classList.toggle('active', v==='progress');

    document.getElementById('weekBar').style.display =
        v === 'workout' ? 'flex' : 'none';

    if(v === 'progress'){

    analyticsMonth = ctxMonth;
    analyticsWeek  = ctxWeek;

    renderAnalytics();

}

    if(v === 'diet'){
        renderDiet();
    }
}

// ═══════════════════════════════════════════
//  WORKOUT — TABS
// ═══════════════════════════════════════════
let activeDay=1;

function renderTabs(){
  document.getElementById('weekBar').innerHTML = DAYS.map((d,i)=>{
    const hasProg=dayDone(d)>0, isDone=isDayComplete(d);
    return `<div class="day-pill ${i===0?'active':''} ${isDone?'done-day':''}" id="pill_${d.id}"
      style="--accent-day:${d.color}" onclick="switchDay(${d.id})">
      <div class="pill-num">${d.id}</div>
      <div class="pill-label">${d.short}</div>
      <div class="pill-dot ${isDone?'is-done':hasProg?'has-progress':''}"></div>
    </div>`;
  }).join('');
}

function updateTab(d){
  const pill=document.getElementById(`pill_${d.id}`); if(!pill) return;
  const dot=pill.querySelector('.pill-dot');
  const done=isDayComplete(d), prog=dayDone(d)>0;
  dot.className='pill-dot'+(done?' is-done':prog?' has-progress':'');
}

function switchDay(id){
  document.querySelectorAll('.day-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.day-pill').forEach(p=>p.classList.remove('active'));
  const panel=document.getElementById(`panel_${id}`);
  const pill=document.getElementById(`pill_${id}`);
  if(panel) panel.classList.add('active');
  if(pill) pill.classList.add('active');
  activeDay=id;
}

// ═══════════════════════════════════════════
//  WORKOUT — RENDER PANELS
// ═══════════════════════════════════════════
function renderMain(){
  document.getElementById('main').innerHTML = DAYS.map(d=>renderDayPanel(d)).join('');
  document.getElementById(`panel_${DAYS[0].id}`).classList.add('active');
}

function renderDayPanel(d){
  const done=dayDone(d), total=dayTotal(d), pct=dayPct(d);
  const C=2*Math.PI*30, offset=C-(pct/100)*C, complete=isDayComplete(d);
  return `
  <div class="day-panel" id="panel_${d.id}" style="--day-color:${d.color};--day-color-soft:${d.colorSoft}">
    <div class="day-complete ${complete?'visible':''}" id="complete_${d.id}">
      <div class="complete-emoji">🔥</div>
      <div class="complete-text"><h3>Day ${d.id} Crushed!</h3><p>Synced to Month ${ctxMonth+1} · Week ${ctxWeek+1} automatically.</p></div>
      <div class="complete-cal"><div class="complete-cal-val">${dayCalories(d)} kcal</div><div class="complete-cal-lbl">Est. burned</div></div>
    </div>
    <div class="week-context-badge">
      📍 Logging to <strong>Month ${ctxMonth+1} · Week ${ctxWeek+1}</strong>
      &nbsp;— change in the bar above
      <span class="auto-tag">AUTO-SYNC</span>
    </div>
    <div class="day-hero" data-day="${d.id}">
      <div class="hero-left">
        <div class="hero-tag" style="background:${d.colorSoft};color:${d.color}">● Day ${d.id}</div>
        <div class="hero-title">${d.label}</div>
        <div class="hero-meta">
          <div class="hmeta-item"><strong>${d.exercises.length}</strong>&nbsp;exercises</div>
          <div class="hmeta-item"><strong>${total}</strong>&nbsp;total sets</div>
          <div class="hmeta-item"><strong>${done}</strong>&nbsp;done</div>
        </div>
      </div>
      <div class="hero-right">
        <div class="radial-wrap">
          <svg viewBox="0 0 72 72" width="74" height="74">
            <circle class="radial-bg" cx="36" cy="36" r="30"/>
            <circle class="radial-fill" id="ring_${d.id}" cx="36" cy="36" r="30" stroke="${d.color}"
              stroke-dasharray="${C}" stroke-dashoffset="${offset}"/>
          </svg>
          <div class="radial-center">
            <div class="radial-pct" id="pct_${d.id}">${pct}%</div>
            <div class="radial-done" id="setslabel_${d.id}">${done}/${total}</div>
          </div>
        </div>
        <button class="reset-btn" onclick="resetDay(${d.id})">↺ Reset Day</button>
      </div>
    </div>
    <div class="calorie-strip">
      <div class="cal-flame">🔥</div>
      <div class="cal-info">
        <div class="cal-range">${d.calMin}–${d.calMax} kcal</div>
        <div class="cal-label">Estimated range · ${d.calNote}</div>
      </div>
      <div class="cal-breakdown">
        <div class="cal-tag" id="calEarned_${d.id}">Earned: ${dayCalories(d)} kcal</div>
      </div>
    </div>
    <div class="day-progress-wrap">
      <div class="progress-labels"><span>Session Progress</span><span id="progLabel_${d.id}">${done} of ${total} sets</span></div>
      <div class="progress-bar"><div class="progress-fill" id="progFill_${d.id}" style="background:${d.color};width:${pct}%"></div></div>
    </div>
    ${renderWarmupSection(d)}
    ${d.exercises.map((ex,ei)=>renderExCard(d,ex,ei)).join('')}
  </div>`;
}


function renderWarmupSection(d){
  const doneCount=WARMUPS.filter((_,wi)=>getWarmup(d.id,wi)).length;
  return `
  <div class="warmup-section">
    <div class="warmup-head">
      <div class="warmup-icon">🔥</div>
      <div>
        <div class="warmup-title">Warm-Up First</div>
        <div class="warmup-note">
          A proper warm-up gradually raises your heart rate, improves blood flow and prepares your joints and muscles for the workout. It can improve movement quality and reduce the risk of strain. Complete these before starting your working sets.
        </div>
      </div>
    </div>
    <div class="warmup-list" id="warmupList_${d.id}">
      ${WARMUPS.map((w,wi)=>{
        const checked=getWarmup(d.id,wi);
        return `<div class="warmup-item ${checked?'done':''}" id="warmup_${d.id}_${wi}" onclick="toggleWarmup(${d.id},${wi})">
          <div class="warmup-check"></div>
          <div class="warmup-info">
            <div class="warmup-name">${w.name}</div>
            <div class="warmup-duration">${w.duration}</div>
          </div>
          <div class="warmup-actions">
            <a
              class="warmup-yt-btn"
              href="https://www.youtube.com/results?search_query=${encodeURIComponent(w.yt)}"
              target="_blank"
              onclick="event.stopPropagation()"
              aria-label="Watch ${w.name} proper form video"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z"/>
              </svg>
              <span class="warmup-yt-text">Watch</span>
            </a>
            <div class="warmup-status">${checked?'Done':'Warm up'}</div>
          </div>
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

function renderExCard(d,ex,ei){
  const done=isExDone(d,ei);
  const sets=Array.from({length:ex.sets},(_,si)=>{
    const checked=getSet(d.id,ei,si);
    return `<div class="set-tile ${checked?'done':''}" id="tile_${d.id}_${ei}_${si}" onclick="toggleSet(${d.id},${ei},${si})">
      <div class="set-check"></div>
      <div class="set-text"><div class="set-title">Set ${si+1}</div><div class="set-reps">${ex.reps}</div></div>
    </div>`;
  }).join('');
  return `
  <div class="exercise-card ${done?'completed':''}" id="excard_${d.id}_${ei}">
    <div class="ex-header" onclick="toggleCard(${d.id},${ei})">
      <div class="ex-num">${ei+1}</div>
      <div class="ex-info">
        <div class="ex-name">${ex.name}</div>
        <div class="ex-spec">${ex.sets} × ${ex.reps}</div>
        ${ex.note?`<div class="ex-note">${ex.note}</div>`:''}
      </div>
      <div class="ex-actions">
        <a
    class="yt-btn"
    href="https://www.youtube.com/results?search_query=${encodeURIComponent(ex.yt)}"
    target="_blank"
    onclick="event.stopPropagation()"
>
    <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z"/>
    </svg>
    Watch
</a>
        <svg class="expand-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </div>
    </div>
    <div class="sets-panel">
      <div class="sets-label">Track your sets</div>
      <div class="sets-row" id="setsRow_${d.id}_${ei}">${sets}</div>
    </div>
  </div>`;
}

// ═══════════════════════════════════════════
//  INTERACTIONS
// ═══════════════════════════════════════════

function toggleWarmup(did,wi){
  const newVal=!getWarmup(did,wi);
  setWarmup(did,wi,newVal);
  saveWS();
  const item=document.getElementById(`warmup_${did}_${wi}`);
  if(item){
    item.classList.toggle('done',newVal);
    const status=item.querySelector('.warmup-status');
    if(status) status.textContent=newVal?'Done':'Warm up';
  }
}

function toggleCard(did,ei){ document.getElementById(`excard_${did}_${ei}`).classList.toggle('open'); }

function toggleSet(did,ei,si){
  ensureSlot(ctxMonth,ctxWeek,did);
  const newVal = !getSet(did,ei,si);
  setSet(did,ei,si,newVal);
  saveWS();
  // Update UI
  const tile=document.getElementById(`tile_${did}_${ei}_${si}`);
  if(tile) tile.classList.toggle('done',newVal);
  refreshExCard(did,ei);
  refreshDayProgress(did);
  updateHeader();
}

function refreshExCard(did,ei){
  const d=DAYS.find(x=>x.id===did);
  const card=document.getElementById(`excard_${did}_${ei}`); if(!card) return;
  card.classList.toggle('completed',isExDone(d,ei));
}

function refreshDayProgress(did){
  const d=DAYS.find(x=>x.id===did);
  const done=dayDone(d), total=dayTotal(d), pct=dayPct(d);
  const C=2*Math.PI*30, offset=C-(pct/100)*C;
  const ring=document.getElementById(`ring_${did}`); if(ring) ring.style.strokeDashoffset=offset;
  const pctEl=document.getElementById(`pct_${did}`); if(pctEl) pctEl.textContent=pct+'%';
  const sEl=document.getElementById(`setslabel_${did}`); if(sEl) sEl.textContent=done+'/'+total;
  const fEl=document.getElementById(`progFill_${did}`); if(fEl) fEl.style.width=pct+'%';
  const lEl=document.getElementById(`progLabel_${did}`); if(lEl) lEl.textContent=done+' of '+total+' sets';
  const cEl=document.getElementById(`calEarned_${did}`); if(cEl) cEl.textContent='Earned: '+dayCalories(d)+' kcal';
  const complete=isDayComplete(d);
  const banner=document.getElementById(`complete_${did}`);
  if(banner) banner.classList.toggle('visible',complete);
  updateTab(d);
}

function resetDay(did){
  ensureSlot(ctxMonth,ctxWeek,did);
  const d=DAYS.find(x=>x.id===did);
  d.exercises.forEach((ex,ei)=>{ for(let s=0;s<ex.sets;s++) setSet(did,ei,s,false); });
  WARMUPS.forEach((_,wi)=>setWarmup(did,wi,false));
  saveWS();
  const warmupList=document.getElementById(`warmupList_${did}`);
  if(warmupList){
    WARMUPS.forEach((_,wi)=>{
      const item=document.getElementById(`warmup_${did}_${wi}`);
      if(item){
        item.classList.remove('done');
        const status=item.querySelector('.warmup-status');
        if(status) status.textContent='Warm up';
      }
    });
  }
  d.exercises.forEach((ex,ei)=>{
    const row=document.getElementById(`setsRow_${did}_${ei}`);
    if(row) row.innerHTML=Array.from({length:ex.sets},(_,si)=>
      `<div class="set-tile" id="tile_${did}_${ei}_${si}" onclick="toggleSet(${did},${ei},${si})">
        <div class="set-check"></div>
        <div class="set-text"><div class="set-title">Set ${si+1}</div><div class="set-reps">${ex.reps}</div></div>
      </div>`).join('');
    refreshExCard(did,ei);
  });
  refreshDayProgress(did); updateHeader();
  showToast('Day '+did+' reset ↺');
}

function autoOpen(){
  DAYS.forEach(d=>{
    document.querySelectorAll(`#panel_${d.id} .exercise-card`).forEach(c=>c.classList.remove('open'));
    for(let ei=0;ei<d.exercises.length;ei++){
      if(!isExDone(d,ei)){
        const card=document.getElementById(`excard_${d.id}_${ei}`);
        if(card){ card.classList.add('open'); break; }
      }
    }
  });
}

// ═══════════════════════════════════════════
//  ANALYTICS
// ═══════════════════════════════════════════
let analyticsMonth=0, analyticsWeek=0;

function renderAnalytics(){

    renderMonthTabs();

    renderMonthSummary(analyticsMonth);

    renderWeekSelector(analyticsMonth);

    renderWeekDetail(analyticsMonth, analyticsWeek);

    renderWeightSummary();

    renderWeeklyWeightTracker();

    renderThreeMonthChart();

}

function renderMonthTabs(){
  document.getElementById('monthTabs').innerHTML = [0,1,2].map(m=>{
    const {workouts}=monthStats(m);
    return `<button class="month-tab ${m===analyticsMonth?'active':''}" onclick="switchAnalyticsMonth(${m})">
      Month ${m+1}${workouts>0?' ✓':''}
    </button>`;
  }).join('');
}

function switchAnalyticsMonth(m){

    analyticsMonth = m;
    analyticsWeek = 0;

    renderMonthTabs();

    renderMonthSummary(m);

    renderWeekSelector(m);

    renderWeekDetail(m,0);

    renderWeightSummary();

    renderWeeklyWeightTracker();

}

function renderMonthSummary(m){
  const {workouts, calories, score, totalPossible}=monthStats(m);
  const avgCal=workouts?Math.round(calories/workouts):0;
  document.getElementById('summaryCards').innerHTML=`
    <div class="mscard highlight" data-icon="🏆">
      <div class="mscard-val">${score}%</div>
      <div class="mscard-lbl">Month Score</div>
      <div class="mscard-sub">${workouts}/${totalPossible} sessions<br><span>${score>=80?'🔥 On fire!':score>=50?'💪 Good pace':'🌱 Keep going'}</span></div>
    </div>
    <div class="mscard" data-icon="✅">
      <div class="mscard-val">${workouts}</div>
      <div class="mscard-lbl">Workouts Done</div>
      <div class="mscard-sub">Out of <span>${totalPossible} planned sessions</span></div>
    </div>
    <div class="mscard" data-icon="🔥">
      <div class="mscard-val">${calories.toLocaleString()}</div>
      <div class="mscard-lbl">Calories Burned</div>
      <div class="mscard-sub">Avg <span>${avgCal} kcal</span> per session</div>
    </div>
    <div class="mscard" data-icon="📆">
      <div class="mscard-val">${[0,1,2,3].filter(w=>weekHasAnyData(m,w)).length}/4</div>
      <div class="mscard-lbl">Active Weeks</div>
      <div class="mscard-sub">Best: <span>${bestWeekScore(m)}% week score</span></div>
    </div>`;
}

function bestWeekScore(m){ return Math.max(...[0,1,2,3].map(w=>weekStats(m,w).score)); }

function renderWeekSelector(m){
  document.getElementById('weekSelectorRow').innerHTML = [0,1,2,3].map(w=>{
    const hasData=weekHasAnyData(m,w);
    const isActive=w===analyticsWeek;
    return `<button class="week-sel-btn ${isActive?'active':''} ${hasData&&!isActive?'has-data':''}"
      onclick="switchAnalyticsWeek(${w})">
      Week ${w+1}${hasData?' ✓':''}
    </button>`;
  }).join('');
}

function switchAnalyticsWeek(w){

    analyticsWeek = w;

    renderWeekSelector(analyticsMonth);

    renderWeekDetail(analyticsMonth,w);

    renderWeightSummary();

    renderWeeklyWeightTracker();

}

function renderWeekDetail(m, w){
  document.getElementById('weekDetailTitle').textContent = `Week ${w+1} — Day Breakdown`;

  // Day grid
  document.getElementById('wdayGrid').innerHTML = DAYS.map(d=>{
    const pct=slotPct(m,w,d.id);
    const cal=slotCal(m,w,d.id);
    const hasData=slotHasData(m,w,d.id);
    const cls=pct>=100?'done':pct>0?'partial':'empty';
    const badge=pct>=100?'✅':pct>=50?'⚡':pct>0?'🔸':'—';
    const miniColor=pct>=100?'#22c55e':pct>=50?'#f59e0b':'#e5e7eb';
    return `<div class="wday-cell ${cls}">
      <div class="wday-badge">${badge}</div>
      <div class="wday-name">Day ${d.id}</div>
      <div class="wday-focus" style="color:${d.color}">${d.short}</div>
      <div class="wday-stats">
        <div class="wday-stat">Completion: <span class="${pct>=100?'green':pct>0?'':''}">${hasData?pct+'%':'–'}</span></div>
        <div class="wday-stat">Calories: <span class="red">${hasData?cal+' kcal':'–'}</span></div>
      </div>
      <div class="wday-mini-bar"><div class="wday-mini-fill" style="width:${pct}%;background:${miniColor}"></div></div>
    </div>`;
  }).join('');

  // Week summary strip
  const {workouts, calories, score}=weekStats(m,w);
  document.getElementById('weekSummaryStrip').innerHTML=`
    <div class="wsstrip-card">
      <div class="wsstrip-val">${workouts}/${DAYS.length}</div>
      <div class="wsstrip-lbl">Sessions Completed</div>
    </div>
    <div class="wsstrip-card">
      <div class="wsstrip-val">${calories.toLocaleString()}</div>
      <div class="wsstrip-lbl">Calories Burned</div>
    </div>
    <div class="wsstrip-card">
      <div class="wsstrip-val" style="color:${score>=80?'#16a34a':score>=50?'#d97706':'#dc2626'}">${score}%</div>
      <div class="wsstrip-lbl">Week Score</div>
    </div>`;
}

function renderThreeMonthChart(){
  const maxWorkouts=20;
  document.getElementById('threeMonthChart').innerHTML = [0,1,2].map(m=>{
    const {workouts,calories,score}=monthStats(m);
    const wH=Math.max(3,Math.round((workouts/maxWorkouts)*100));
    const cH=Math.max(3,Math.min(100,Math.round((calories/4000)*100)));
    const sH=Math.max(3,Math.round((score/100)*100));
    return `<div class="bar-group">
      <div class="bar-cols">
        <div class="bar" style="height:${wH}px;background:#ff5c35;flex:1" data-tip="${workouts} workouts"></div>
        <div class="bar" style="height:${cH}px;background:#2563eb;flex:1" data-tip="${calories} kcal"></div>
        <div class="bar" style="height:${sH}px;background:#22c55e;flex:1" data-tip="${score}% score"></div>
      </div>
      <div class="bar-sub-label">${score}%</div>
      <div class="bar-main-label">M${m+1}</div>
    </div>`;
  }).join('');
}

function renderWeightSummary(){

    const starting = parseFloat(

        DIET_PLAN.current_weight

    );

   let latest = starting;

for(let month = analyticsMonth; month >= 0; month--){

    for(let week = 3; week >= 0; week--){

        const key = getWeightKey(month, week);

        if(
            weeklyWeights[key] !== undefined &&
            weeklyWeights[key] !== ""
        ){

            latest = parseFloat(
                weeklyWeights[key]
            );

            month = -1; // stop outer loop
            break;

        }

    }

}

    const diff = (

        latest - starting

    ).toFixed(1);

    const colour =

        diff < 0

        ? "#22c55e"

        : diff > 0

        ? "#ef4444"

        : "#666";

    document.getElementById(

        "weightSummary"

    ).innerHTML = `

<div class="month-summary-grid">

<div class="mscard">

<div class="mscard-val">

${starting} kg

</div>

<div class="mscard-lbl">

Starting Weight

</div>

</div>

<div class="mscard">

<div class="mscard-val">

${latest} kg

</div>

<div class="mscard-lbl">

Current Weight

</div>

</div>

<div class="mscard">

<div
class="mscard-val"
style="color:${colour};">

${diff} kg

</div>

<div class="mscard-lbl">

Weight Change

</div>

</div>

</div>

`;

}

function renderWeeklyWeightTracker(){

    let html =

`
<div class="exercise-card">

<div class="ex-header">

<div class="ex-name">

Weekly Weight Tracker

</div>

</div>

<div style="padding:20px;">

`;

    for(let week=0;week<4;week++){

        const key =

            getWeightKey(

                analyticsMonth,

                week

            );

        html += `

<div style="
display:flex;
align-items:center;
margin-bottom:15px;
gap:15px;
">

<div style="width:90px;">

Week ${week+1}

</div>

<input

type="number"

step="0.1"

value="${weeklyWeights[key] ?? ''}"

placeholder="kg"

style="
padding:8px;
width:120px;
"

onchange="updateWeeklyWeight(

${analyticsMonth},

${week},

this.value

)"

>

</div>

`;

    }

    html +=

`

</div>

</div>

`;

    document.getElementById(

        "weeklyWeightTracker"

    ).innerHTML = html;

}


// ═══════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════
let toastTimer;
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'),2800);
}


let dietSelections = {};
try {
    dietSelections = JSON.parse(localStorage.getItem('grind_diet_selections') || '{}');
} catch(e){
    dietSelections = {};
}

let weeklyWeights = {};

try{

    weeklyWeights = JSON.parse(
        localStorage.getItem('grind_weekly_weights')
    ) || {};

}catch(e){

    weeklyWeights = {};

}

function saveDietSelections(){
    localStorage.setItem('grind_diet_selections', JSON.stringify(dietSelections));
}

function saveWeeklyWeights(){

    localStorage.setItem(

        'grind_weekly_weights',

        JSON.stringify(weeklyWeights)

    );

}

function getWeightKey(month, week){

    return `month_${month}_week_${week}`;

}

function updateWeeklyWeight(month, week, value){

    const key = getWeightKey(month, week);

    weeklyWeights[key] = value;

    saveWeeklyWeights();

    renderAnalytics();

}

function getDietTargetCalories(){
    const raw = String(DIET_PLAN.daily_calories || '');
    const nums = raw.match(/\d+/g);
    if(!nums || !nums.length) return 0;
    if(nums.length >= 2){
        return Math.round((parseInt(nums[0]) + parseInt(nums[1])) / 2);
    }
    return parseInt(nums[0]);
}

function extractValue(value){

    if(!value) return 0;

    const numbers = String(value).match(/\d+/);

    return numbers ? parseInt(numbers[0]) : 0;

}

function getConsumedNutrition(){

    let nutrition = {

        calories:0,
        protein:0,
        carbs:0,
        fat:0,
        fibre:0

    };

    Object.keys(dietSelections).forEach(mealIndex=>{

        const optionIndex = dietSelections[mealIndex];

        const meal = DIET_PLAN.meals?.[parseInt(mealIndex)];

        const option = meal?.options?.[optionIndex];

        if(!option) return;

        nutrition.calories += extractValue(option.calories);

        nutrition.protein += extractValue(option.protein);

        nutrition.carbs += extractValue(option.carbs);

        nutrition.fat += extractValue(option.fat);

        nutrition.fibre += extractValue(option.fibre);

    });

    return nutrition;

}

function selectMealOption(mealIndex, optionIndex){
    if(dietSelections[mealIndex] === optionIndex){
        delete dietSelections[mealIndex];
    } else {
        dietSelections[mealIndex] = optionIndex;
    }
    saveDietSelections();
    renderDiet();
}

function resetDietSelections(){

    if(!confirm("Reset today's diet selections?")){
        return;
    }

    dietSelections = {};

    saveDietSelections();

    renderDiet();

    showToast("Today's diet has been reset.");

}

function renderDiet(){

    const container =
        document.getElementById('dietContainer');

    if(!DIET_PLAN){

        container.innerHTML =
            '<div class="empty-week">No Diet Plan Found</div>';

        return;
    }

    const bmi = parseFloat(DIET_PLAN.bmi);

let bmiClass = '';
let bmiIcon  = '';

if (bmi < 18.5) {

    bmiClass = 'bmi-blue';
    bmiIcon  = '🔵';

}
else if (bmi < 25) {

    bmiClass = 'bmi-green';
    bmiIcon  = '🟢';

}
else if (bmi < 30) {

    bmiClass = 'bmi-yellow';
    bmiIcon  = '🟡';

}
else {

    bmiClass = 'bmi-red';
    bmiIcon  = '🔴';

}

    const nutrition = getConsumedNutrition();

const consumedCalories = nutrition.calories;
const consumedProtein  = nutrition.protein;
const consumedCarbs    = nutrition.carbs;
const consumedFat      = nutrition.fat;
const consumedFibre    = nutrition.fibre;

const targetCalories = getDietTargetCalories();

const caloriePct = targetCalories
    ? Math.min(
        100,
        Math.round(
            (consumedCalories / targetCalories) * 100
        )
      )
    : 0;

    let html = `

        <div class="calorie-tracker">

    <div class="calorie-tracker-top">

        <div>

            <div class="calorie-tracker-label">

                Today's Nutrition

            </div>

            <div class="calorie-tracker-value">

                🔥 ${consumedCalories} / ${targetCalories} kcal

            </div>

            <div style="
    margin-top:12px;
    line-height:1.8;
    font-size:13px;
">

     Protein Target : ${DIET_PLAN.daily_protein}<br>

     Carbs Target : ${DIET_PLAN.daily_carbs}<br>

     Fat Target : ${DIET_PLAN.daily_fat}<br>

     Fibre Target : ${DIET_PLAN.daily_fibre}

</div>

<div style="margin-top:15px;">
    <button
        class="reset-btn"
        onclick="resetDietSelections()">

        ↺ Reset Today's Diet

    </button>
</div>

        </div>

        <div class="calorie-tracker-target">

            ${caloriePct}% Complete

        </div>

    </div>

    <div class="diet-cal-bar">

        <div
            class="diet-cal-fill"
            style="width:${caloriePct}%">
        </div>

    </div>

</div>

        <div class="nutrition-cards">

    <div class="nutri-card">
        <div class="nutri-label">Weight</div>
        <div class="nutri-value">${DIET_PLAN.current_weight}</div>
    </div>

    <div class="nutri-card">
        <div class="nutri-label">Goal Weight</div>
        <div class="nutri-value">${DIET_PLAN.goal_weight}</div>
    </div>

    <div class="nutri-card">
        <div class="nutri-label">Height</div>
        <div class="nutri-value">${DIET_PLAN.height}</div>
    </div>

    <div class="nutri-card ${bmiClass}">
        <div class="nutri-label">BMI</div>
        <div class="nutri-value">${DIET_PLAN.bmi}</div>

        <div style="margin-top:6px;font-size:12px;font-weight:600;color:#666;">
            ${bmiIcon} ${DIET_PLAN.bmi_status}
        </div>
    </div>

    <div class="nutri-card">
        <div class="nutri-label">Calories</div>
        <div class="nutri-value">${DIET_PLAN.daily_calories}</div>
    </div>

    <div class="nutri-card">
        <div class="nutri-label">Protein</div>
        <div class="nutri-value">${DIET_PLAN.daily_protein}</div>
    </div>

    <div class="nutri-card">
        <div class="nutri-label">Carbs</div>
        <div class="nutri-value">${DIET_PLAN.daily_carbs}</div>
    </div>

    <div class="nutri-card">
        <div class="nutri-label">Fat</div>
        <div class="nutri-value">${DIET_PLAN.daily_fat}</div>
    </div>

    <div class="nutri-card">
        <div class="nutri-label">Fibre</div>
        <div class="nutri-value">${DIET_PLAN.daily_fibre}</div>
    </div>

    <div class="nutri-card">
        <div class="nutri-label">Water</div>
        <div class="nutri-value">${DIET_PLAN.daily_water_intake}</div>
    </div>

</div>

        <div class="day-hero">

            <div>

                <div class="hero-title">
                    ${DIET_PLAN.plan_name}
                </div>

                <div class="ex-note">
                    ${DIET_PLAN.notes || ''}
                </div>
                
                <div class="diet-disclaimer">
                <strong>⚠ Medical Disclaimer:</strong><br>
                If you have any pre-existing medical condition, are taking medication, are pregnant, nursing, or have specific dietary restrictions, please consult your physician or a qualified healthcare professional before starting this nutrition plan.
            </div>

            </div>

        </div>

    `;

    DIET_PLAN.meals.forEach((meal, mealIndex)=>{

        html += `
        <div class="exercise-card">

            <div class="ex-header">

                <div class="ex-info">

                    <div class="ex-name">
                        ${meal.meal}
                    </div>

                    <div class="meal-subtitle">
                    You can have any one of the meal options below
                    </div>

                </div>

            </div>

            <div style="padding:15px;">
        `;

        meal.options.forEach((option, optionIndex)=>{

            const isSelected = dietSelections[mealIndex] === optionIndex;

            html += `
                <div class="meal-option ${isSelected ? 'selected' : ''}">

                    <div class="option-header">

    <div>
        <div class="option-title">
            ${option.name}
        </div>

        <div class="meal-subtitle">
             ${option.protein} Protein •
             ${option.carbs} Carbs •
             ${option.fat} Fat •
             ${option.fibre} Fibre
        </div>

    </div>

    <div class="option-calories">
        🔥 ${extractValue(option.calories)} kcal
    </div>

</div>

                    ${option.items.map(item=>`
    <div class="option-item">
        • ${item}
    </div>
`).join('')}

<div style="
    margin-top:12px;
    padding-top:10px;
    border-top:1px dashed #ddd;
    font-size:12px;
    color:#666;
">

     ${option.calories} kcal &nbsp;&nbsp;

     ${option.protein} Protein &nbsp;&nbsp;

     ${option.carbs} Carbs &nbsp;&nbsp;

     ${option.fat} Fat &nbsp;&nbsp;

     ${option.fibre} Fibre

</div>

                    <button
                        type="button"
                        class="meal-select-btn"
                        onclick="selectMealOption(${mealIndex}, ${optionIndex})"
                    >
                        ${isSelected ? '✓ I Had This' : 'I Had This'}
                    </button>

                </div>
            `;
        });

        html += `
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
}


// ═══════════════════════════════════════════
//  BOOT
// ═══════════════════════════════════════════
initContextBar();
renderTabs();
renderMain();
updateHeader();
autoOpen();
</script>

<div class="grind-footer">

    <a href="https://www.instagram.com/grindfit.ai/"
       target="_blank"
       class="footer-link insta-link">

        <i class="fab fa-instagram"></i>

        <span>Follow us on Instagram</span>

    </a>

    <div class="support-text">

        Need support?

        <a href="mailto:support.grindfit.ai@trenddma.com"
           class="footer-link">

            support.grindfit.ai@trenddma.com

        </a>

    </div>

</div>

</body>
</html>
