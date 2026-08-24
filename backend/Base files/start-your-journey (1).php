<?php
// ─────────────────────────────────────────────
//  GRIND — Client Intake Form
//  Email: arup.mohanty28j@gmail.com
//  Uses PHP mail() — no third-party dependency
// ─────────────────────────────────────────────

$submitted   = false;
$mail_error  = false;
$errors      = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // ── Sanitise helpers ──────────────────────
    function clean(string $val): string {
        return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
    }
    function cleanArr(array $arr): array {
        return array_map('clean', $arr);
    }

    // ── Collect & sanitise ────────────────────
    $name            = clean($_POST['name']            ?? '');
    $email           = clean($_POST['email']           ?? '');
    $age             = clean($_POST['age']             ?? '');
    $gender          = clean($_POST['gender']          ?? '');
    $occupation      = clean($_POST['occupation']      ?? '');
    $weight          = clean($_POST['weight']          ?? '');
    $weight_unit     = clean($_POST['weight_unit']     ?? 'kg');
    $height_unit     = clean($_POST['height_unit']     ?? 'cm');
    $height_cm       = clean($_POST['height']          ?? '');
    $height_ft       = clean($_POST['height_ft']       ?? '');
    $height_in       = clean($_POST['height_in']       ?? '');
    $fitness_level   = clean($_POST['fitness_level']   ?? '');
    $days_per_week   = clean($_POST['days_per_week']   ?? '');
    $session_dur     = clean($_POST['session_duration'] ?? '');
    $goals           = isset($_POST['goals']) ? implode(', ', cleanArr((array)$_POST['goals'])) : '';
    $goal_focus      = clean($_POST['goal_focus']      ?? '');
    $workout_pref    = clean($_POST['workout_pref']    ?? '');
    $injuries        = isset($_POST['injuries']) ? implode(', ', cleanArr((array)$_POST['injuries'])) : '';
    $injuries_detail = clean($_POST['injuries_detail'] ?? '');
    $diet            = clean($_POST['diet']            ?? '');
    $sleep           = clean($_POST['sleep']           ?? '');
    $stress          = clean($_POST['stress']          ?? '');
    $consultation    = clean($_POST['consultation']    ?? 'no');

    // ── Build height display string ───────────
    if ($height_unit === 'ft') {
        $height_display = $height_ft . 'ft ' . $height_in . 'in';
    } else {
        $height_display = $height_cm . ' cm';
    }

    // ── Basic validation ──────────────────────
    if (empty($name))  $errors[] = 'Name is required.';
    if (empty($email) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
        $errors[] = 'A valid email address is required.';
    if (empty($age))   $errors[] = 'Age is required.';
    if (empty($weight)) $errors[] = 'Weight is required.';

    // ── Send email if no errors ───────────────
    if (empty($errors)) {

        $to      = 'grindfit.ai@trenddma.com';
        $subject = 'New GRIND Intake Submission — ' . $name;

        // Plain-text body
        $body  = "New GRIND Client Intake Submission\n";
        $body .= "===================================\n\n";
        $body .= "PERSONAL\n";
        $body .= "--------\n";
        $body .= "Name       : {$name}\n";
        $body .= "Email      : {$email}\n";
        $body .= "Age        : {$age}\n";
        $body .= "Gender     : " . ($gender ?: 'N/A') . "\n";
        $body .= "Occupation : " . ($occupation ?: 'N/A') . "\n\n";
        $body .= "BODY METRICS\n";
        $body .= "------------\n";
        $body .= "Weight          : {$weight} {$weight_unit}\n";
        $body .= "Height          : {$height_display}\n";
        $body .= "Fitness Level   : " . ($fitness_level ?: 'N/A') . "\n";
        $body .= "Training Days   : " . ($days_per_week ?: 'N/A') . "\n";
        $body .= "Session Length  : " . ($session_dur ?: 'N/A') . "\n\n";
        $body .= "TRAINING GOALS\n";
        $body .= "--------------\n";
        $body .= "Goals Selected  : " . ($goals ?: 'None selected') . "\n";
        $body .= "Specific Focus  : " . ($goal_focus ?: 'N/A') . "\n";
        $body .= "Workout Pref    : " . ($workout_pref ?: 'N/A') . "\n";
        $body .= "Consultation    : " . (($consultation ?? 'no') === 'yes' ? 'Yes – lifestyle consultation requested' : 'No') . "\n\n";
        $body .= "HEALTH\n";
        $body .= "------\n";
        $body .= "Injuries        : " . ($injuries ?: 'None') . "\n";
        $body .= "Injury Details  : " . ($injuries_detail ?: 'N/A') . "\n\n";
        $body .= "DIET & LIFESTYLE\n";
        $body .= "----------------\n";
        $body .= "Diet            : " . ($diet ?: 'N/A') . "\n";
        $body .= "Sleep           : " . ($sleep ?: 'N/A') . "\n";
        $body .= "Stress Level    : " . ($stress ?: 'N/A') . "\n\n";
        $body .= "===================================\n";
        $body .= "Submitted via GRIND Intake Form\n";

        $headers  = "From: GRIND Intake <noreply@trenddma.com>\r\n";
        $headers .= "Reply-To: {$email}\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        if (mail($to, $subject, $body, $headers)) {
            $submitted = true;
        } else {
            $mail_error = true;
        }
    }
}

// ── Helpers for repopulating form on error ──
function old(string $key, string $default = ''): string {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        return htmlspecialchars($_POST[$key] ?? $default, ENT_QUOTES, 'UTF-8');
    }
    return $default;
}
function oldCheck(string $key, string $value): string {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST[$key])) {
        return in_array($value, (array)$_POST[$key]) ? ' checked' : '';
    }
    return '';
}
function oldSelected(string $key, string $value): string {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        return ($_POST[$key] ?? '') === $value ? ' selected' : '';
    }
    return '';
}
function oldGoal(string $value): string {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['goals'])) {
        return in_array($value, (array)$_POST['goals']) ? ' selected' : '';
    }
    return '';
}
function oldWorkout(string $value): string {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        return ($_POST['workout_pref'] ?? '') === $value ? ' selected' : '';
    }
    return '';
}
function oldFitness(string $value): string {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        return ($_POST['fitness_level'] ?? '') === $value ? ' selected' : '';
    }
    return '';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GRIND — Client Intake</title>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black: #0a0a0a;
    --off-black: #111111;
    --card-bg: #161616;
    --border: rgba(255,255,255,0.09);
    --border-hover: rgba(255,255,255,0.22);
    --orange: #F47920;
    --orange-dim: rgba(244, 121, 32, 0.12);
    --white: #f5f5f0;
    --muted: rgba(245,245,240,0.45);
    --input-bg: rgba(255,255,255,0.04);
    --input-bg-focus: rgba(255,255,255,0.07);
    --label: rgba(245,245,240,0.6);
    --font-display: 'Bebas Neue', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  html { font-size: 16px; }

  body {
    background: var(--black);
    color: var(--white);
    font-family: var(--font-body);
    font-weight: 300;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  }

  /* ── HEADER ── */
  header {
    position: relative;
    z-index: 1;
    border-bottom: 1px solid var(--border);
    padding: 0 48px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 40px;
    height: 88px;
  }

  .logo-block {
    display: flex;
    align-items: center;
    gap: 0;
    text-decoration: none;
    flex-shrink: 0;
  }

  .logo-img {
    height: 48px;
    width: auto;
    display: block;
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: 32px;
    justify-content: center;
  }

  .header-nav-item {
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(245,245,240,0.3);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-nav-item.active { color: var(--white); }

  .header-nav-item .step-num {
    width: 22px;
    height: 22px;
    border: 1px solid currentColor;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    flex-shrink: 0;
  }

  .header-nav-item.active .step-num {
    background: var(--orange);
    border-color: var(--orange);
    color: var(--white);
  }

  .header-nav-sep {
    width: 24px;
    height: 1px;
    background: rgba(255,255,255,0.12);
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }

  .header-tag {
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 7px 16px;
    border-radius: 2px;
    white-space: nowrap;
  }

  .header-year {
    font-size: 11px;
    color: rgba(245,245,240,0.2);
    letter-spacing: 0.1em;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    z-index: 1;
    border-bottom: 1px solid var(--border);
    padding: 60px 48px 52px;
    overflow: hidden;
  }

  .hero::after {
    content: 'GRIND';
    position: absolute;
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    font-family: var(--font-display);
    font-size: 220px;
    color: rgba(255,255,255,0.025);
    letter-spacing: -0.02em;
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }

  .hero-eyebrow {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 16px;
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(56px, 7vw, 96px);
    line-height: 0.93;
    letter-spacing: 0.02em;
    color: var(--white);
    margin-bottom: 20px;
  }

  .hero-sub {
    font-size: 15px;
    color: var(--muted);
    max-width: 600px;
    line-height: 1.65;
    font-weight: 300;
  }

  /* ── LAYOUT ── */
  main {
    position: relative;
    z-index: 1;
    flex: 1;
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    padding: 56px 48px 80px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
  }

  .form-section {
    padding: 40px 40px;
    border-bottom: 1px solid var(--border);
  }

  .form-section:nth-child(odd) { border-right: 1px solid var(--border); }
  .form-section.full-width { grid-column: 1 / -1; border-right: none; }
  .form-section.last-row { border-bottom: none; }

  .section-label {
    font-size: 10px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── INPUTS ── */
  .field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
  .field:last-child { margin-bottom: 0; }

  label {
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--label);
    font-weight: 400;
  }

  input[type="text"],
  input[type="email"],
  input[type="number"],
  select,
  textarea {
    background: var(--input-bg);
    border: 1px solid var(--border);
    border-radius: 2px;
    color: var(--white);
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 300;
    padding: 13px 16px;
    width: 100%;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    appearance: none;
    -webkit-appearance: none;
  }

  input:focus, select:focus, textarea:focus {
    border-color: var(--border-hover);
    background: var(--input-bg-focus);
  }

  input::placeholder, textarea::placeholder {
    color: rgba(245,245,240,0.22);
    font-style: italic;
  }

  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    padding-right: 40px;
    cursor: pointer;
  }

  select option { background: #1a1a1a; color: var(--white); }
  textarea { resize: vertical; min-height: 90px; line-height: 1.6; }

  /* ── UNIT TOGGLE ── */
  .unit-toggle {
    display: flex;
    border: 1px solid var(--border);
    border-radius: 2px;
    overflow: hidden;
    width: fit-content;
    margin-bottom: 12px;
  }

  .unit-btn {
    background: transparent;
    border: none;
    color: var(--muted);
    font-family: var(--font-body);
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 6px 14px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .unit-btn.active { background: var(--orange); color: var(--white); }

  /* ── GOAL CHIPS ── */
  .goals-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 20px;
  }

  .goal-chip {
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 14px 18px;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    gap: 12px;
    user-select: none;
    position: relative;
    overflow: hidden;
  }

  .goal-chip::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--orange-dim);
    opacity: 0;
    transition: opacity 0.15s;
  }

  .goal-chip:hover { border-color: var(--border-hover); }
  .goal-chip.selected { border-color: var(--orange); }
  .goal-chip.selected::before { opacity: 1; }
  .goal-chip input[type="checkbox"] { display: none; }

  .goal-icon {
    width: 32px;
    height: 32px;
    border: 1px solid var(--border);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    background: var(--input-bg);
    transition: border-color 0.15s;
  }

  .goal-chip.selected .goal-icon { border-color: var(--orange); }

  .goal-text { position: relative; z-index: 1; }

  .goal-text strong {
    display: block;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--white);
    margin-bottom: 2px;
  }

  .goal-text span { font-size: 11px; color: var(--muted); }

  .check-mark {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 16px;
    height: 16px;
    background: var(--orange);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.15s;
    z-index: 2;
  }

  .goal-chip.selected .check-mark { opacity: 1; }
  .check-mark svg { width: 9px; height: 9px; stroke: white; stroke-width: 2.5; fill: none; }

  /* ── WORKOUT TOGGLE ── */
  .workout-toggle {
    display: flex;
    gap: 10px;
    margin-top: 4px;
  }

  .workout-btn {
    flex: 1;
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 14px 18px;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    gap: 12px;
    background: transparent;
    color: var(--muted);
    font-family: var(--font-body);
    position: relative;
    overflow: hidden;
  }

  .workout-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--orange-dim);
    opacity: 0;
    transition: opacity 0.15s;
  }

  .workout-btn:hover { border-color: var(--border-hover); }
  .workout-btn.selected { border-color: var(--orange); color: var(--white); }
  .workout-btn.selected::before { opacity: 1; }

  .workout-btn .wo-icon { font-size: 20px; position: relative; z-index: 1; }

  .workout-btn .wo-text { position: relative; z-index: 1; text-align: left; }

  .workout-btn .wo-text strong {
    display: block;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--white);
    margin-bottom: 1px;
  }

  .workout-btn .wo-text span { font-size: 11px; color: var(--muted); }

  /* ── FIELD ROW ── */
  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  /* ── FITNESS LEVEL CHIPS ── */
  .level-chips { display: flex; gap: 8px; flex-wrap: wrap; }

  .level-chip {
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 8px 16px;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.15s;
    color: var(--muted);
    background: transparent;
    font-family: var(--font-body);
  }

  .level-chip:hover { border-color: var(--border-hover); color: var(--white); }
  .level-chip.selected { border-color: var(--orange); color: var(--white); background: var(--orange-dim); }

  /* ── CHECKBOXES ── */
  .checkbox-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    cursor: pointer;
    border-bottom: 1px solid var(--border);
    transition: all 0.15s;
  }

  .checkbox-row:last-child { border-bottom: none; }
  .checkbox-row:hover { color: var(--white); }

  .checkbox-box {
    width: 18px;
    height: 18px;
    border: 1px solid var(--border);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.15s;
  }

  .checkbox-row input[type="checkbox"] { display: none; }
  .checkbox-row.checked .checkbox-box { background: var(--orange); border-color: var(--orange); }
  .checkbox-row.checked .checkbox-box svg { display: block; }
  .checkbox-box svg { display: none; width: 10px; height: 10px; stroke: white; stroke-width: 2.5; fill: none; }
  .checkbox-label { font-size: 13px; color: var(--muted); }
  .checkbox-row.checked .checkbox-label { color: var(--white); }

  /* ── SUBMIT ZONE ── */
  .submit-zone {
    grid-column: 1 / -1;
    padding: 40px 40px;
    border-top: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .submit-note { font-size: 12px; color: var(--muted); max-width: 380px; line-height: 1.6; }
  .submit-note strong { color: var(--white); font-weight: 500; }

  .btn-submit {
    background: var(--orange);
    color: var(--white);
    border: none;
    font-family: var(--font-display);
    font-size: 22px;
    letter-spacing: 0.12em;
    padding: 18px 52px;
    cursor: pointer;
    border-radius: 2px;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .btn-submit:hover { background: #d96810; transform: translateY(-1px); }
  .btn-submit:active { transform: translateY(0); }

  /* ── VALIDATION ERRORS ── */
  .form-errors {
    grid-column: 1 / -1;
    background: rgba(220, 53, 34, 0.1);
    border: 1px solid rgba(220, 53, 34, 0.4);
    border-radius: 2px;
    padding: 16px 20px;
    margin: 0 0 0 0;
  }

  .form-errors p {
    font-size: 13px;
    color: #f87171;
    margin-bottom: 4px;
    line-height: 1.5;
  }

  .form-errors p:last-child { margin-bottom: 0; }

  .mail-error {
    grid-column: 1 / -1;
    background: rgba(244, 121, 32, 0.1);
    border: 1px solid rgba(244, 121, 32, 0.35);
    border-radius: 2px;
    padding: 12px 16px;
    font-size: 13px;
    color: #f8a271;
  }

  /* ── THANK YOU ── */
  .thank-you {
    display: flex;
    position: fixed;
    inset: 0;
    background: var(--black);
    z-index: 100;

    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    text-align: center;
    padding: 40px;

    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.thank-you > * {
    flex-shrink: 0;
}

  .ty-logo-wrap { margin-bottom: 36px; }

  .ty-logo {
    height: 56px;
    width: auto;
    margin: 0 auto;
    animation: pop 0.4s ease both;
    opacity: 0.9;
  }

  .ty-logo-fallback {
    display: flex;
    justify-content: center;
    margin-bottom: 0;
  }

  .ty-check {
    width: 72px;
    height: 72px;
    border: 2px solid var(--orange);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 32px;
    animation: pop 0.4s ease both;
  }

  .ty-check svg { width: 32px; height: 32px; stroke: var(--orange); stroke-width: 2; fill: none; }

  @keyframes pop {
    from { transform: scale(0.6); opacity: 0; }
    to   { transform: scale(1); opacity: 1; }
  }

  .ty-eyebrow {
    font-size: 11px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--orange);
    margin-bottom: 16px;
    animation: fadeUp 0.5s 0.15s ease both;
  }

  .ty-title {
    font-family: var(--font-display);
    font-size: clamp(52px, 8vw, 100px);
    line-height: 0.92;
    letter-spacing: 0.03em;
    margin-bottom: 24px;
    animation: fadeUp 0.5s 0.25s ease both;
  }

  .ty-body {
    font-size: 16px;
    color: var(--muted);
    max-width: 440px;
    line-height: 1.7;
    font-weight: 300;
    animation: fadeUp 0.5s 0.35s ease both;
  }

  .ty-divider {
    width: 48px;
    height: 2px;
    background: var(--orange);
    margin: 28px auto;
    animation: fadeUp 0.5s 0.4s ease both;
  }

  .ty-48 {
    font-size: 13px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    border: 1px solid var(--border);
    padding: 10px 22px;
    border-radius: 2px;
    animation: fadeUp 0.5s 0.45s ease both;
  }

  .ty-48 strong { color: var(--white); font-weight: 500; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── FOOTER ── */
  footer {
    position: relative;
    z-index: 1;
    border-top: 1px solid var(--border);
    padding: 20px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer-copy { font-size: 11px; color: rgba(245,245,240,0.25); letter-spacing: 0.06em; }
  .field-note { font-size: 11px; color: var(--muted); margin-top: 4px; font-style: italic; }

  /* ── CONSULTATION OPT-IN ── */
  .consultation-section { border-bottom: 1px solid var(--border); }

  .consultation-wrap {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 20px 24px;
    border: 1px solid var(--border);
    border-radius: 3px;
    cursor: pointer;
    transition: border-color 0.15s, background 0.15s;
    position: relative;
    user-select: none;
  }

  .consultation-wrap:hover { border-color: var(--border-hover); }

  .consultation-wrap.checked {
    border-color: var(--orange);
    background: var(--orange-dim);
  }

  .consult-checkbox-box {
    width: 22px;
    height: 22px;
    border: 1px solid var(--border);
    border-radius: 3px;
    flex-shrink: 0;
    margin-top: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
  }

  .consult-checkbox-box svg { display: none; width: 11px; height: 11px; stroke: white; stroke-width: 2.5; fill: none; }

  .consultation-wrap.checked .consult-checkbox-box {
    background: var(--orange);
    border-color: var(--orange);
  }

  .consultation-wrap.checked .consult-checkbox-box svg { display: block; }

  .consult-text strong {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: var(--white);
    margin-bottom: 5px;
    letter-spacing: 0.03em;
  }

  .consult-text span {
    font-size: 12px;
    color: var(--muted);
    line-height: 1.6;
  }

  /* ── THANK YOU: PRICING NOTE ── */
  .ty-pricing-note {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    max-width: 480px;
    background: rgba(244,121,32,0.08);
    border: 1px solid rgba(244,121,32,0.25);
    border-radius: 4px;
    padding: 20px 24px;
    margin-top: 28px;
    text-align: left;
    animation: fadeUp 0.5s 0.55s ease both;
  }
  
  

  .ty-pricing-icon { font-size: 22px; flex-shrink: 0; margin-top: 2px; }

  .ty-pricing-text { font-size: 13px; color: var(--muted); line-height: 1.7; }

  .ty-pricing-text strong { color: var(--white); display: block; margin-bottom: 5px; font-size: 14px; }

  .ty-highlight { color: var(--orange); font-weight: 500; }
  
  /* Instagram Follow Section */

.ty-social-follow{
    display:flex;
    flex-direction:column;

    align-items:center;
    justify-content:center;

    text-align:center;

    max-width:480px;
    width:100%;

    margin-top:20px;

    padding:28px 24px;

    background:rgba(255,255,255,0.03);

    border:1px solid rgba(244,121,32,0.25);

    border-radius:4px;

    gap:16px;

    animation:fadeUp 0.5s 0.65s ease both;
}

.ty-social-icon{
    color:var(--orange);
    flex-shrink:0;
}

.ty-social-icon svg{
    width:36px;
    height:36px;
}

.ty-social-content{
    text-align:center;
}

.ty-social-content strong{
    display:block;
    font-size:16px;
    color:var(--white);
    margin-bottom:10px;
    letter-spacing:.08em;
}

.ty-social-content span{
    display:block;
    color:var(--muted);
    font-size:13px;
    line-height:1.7;
    margin-bottom:14px;
}

.ty-instagram-btn{
    display:inline-block;

    background:var(--orange);

    color:#fff;

    text-decoration:none;

    padding:10px 18px;

    border-radius:3px;

    font-size:12px;
    font-weight:600;

    letter-spacing:.08em;

    text-transform:uppercase;

    transition:.2s ease;
}

.ty-instagram-btn:hover{
    background:#d96810;
    transform:translateY(-1px);
}

  @media (max-width: 820px) {
    header { padding-left: 24px; padding-right: 24px; grid-template-columns: auto auto; height: 72px; gap: 0; }
    .hero, main, footer { padding-left: 24px; padding-right: 24px; }
    .header-nav, .header-year { display: none; }
    .form-grid { grid-template-columns: 1fr; }
    .form-section:nth-child(odd) { border-right: none; }
    .goals-grid { grid-template-columns: 1fr; }
    .field-row { grid-template-columns: 1fr; }
    .submit-zone { flex-direction: column; align-items: flex-start; }
    .workout-toggle { flex-direction: column; }
    .ty-pricing-note { flex-direction: column; }
    .ty-social-follow{ flex-direction:column;}
  }
</style>
</head>
<body>

<?php if ($submitted): ?>
<!-- ── THANK YOU SCREEN (server-rendered on success) ── -->
<div class="thank-you">
  <div class="ty-logo-wrap">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 48" height="56" role="img" aria-label="GRIND">
      <rect width="110" height="48" rx="2" fill="#0a0a0a"/>
      <text x="8" y="35" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="26" fill="#f5f5f0" letter-spacing="0.5">GRIND</text>
      <circle cx="102" cy="34" r="4" fill="#F47920"/>
    </svg>
  </div>
  <div class="ty-check">
    <svg viewBox="0 0 32 32"><path d="M6 16l7 7L26 9" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </div>
  <p class="ty-eyebrow">Submission Received</p>
  <h2 class="ty-title">YOU'RE IN<br>THE GRIND</h2>
  <p class="ty-body">Thanks for taking the first step. We've received your intake form and are preparing your personalised programme.</p>
  <div class="ty-divider"></div>
  <div class="ty-48">Expect to hear from us within <strong>48 hours</strong></div>
  <div class="ty-pricing-note">
    <div class="ty-pricing-icon">💬</div>
    <div class="ty-pricing-text">
      <strong>What happens next?</strong>
      Our assessment engine will analyse your goals, lifestyle, fitness experience and preferences to prepare a personalised programme.

Every programme is reviewed before finalisation to ensure it aligns with your objectives and training level.<br><br>
      <span class="ty-highlight">
The next step is to review the available programme options and choose the level of support that best fits your goals.
</span>

<br><br>

Once enrolled, you'll receive your personalised programme through a private access link and can begin your training journey.
    </div>
    
  </div>
  
  <div class="ty-social-follow">

    <div class="ty-social-icon">
        <svg viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="5"
                stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="12" r="4"
                stroke="currentColor" stroke-width="2"/>
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
        </svg>
    </div>

    <div class="ty-social-content">

        <strong>JOIN THE COMMUNITY</strong>

        <a href="https://www.instagram.com/grindfit.ai/"
           target="_blank"
           rel="noopener noreferrer"
           class="ty-instagram-btn">

           @GRINDFIT.AI

        </a>

    </div>

</div>
  
</div>
<?php else: ?>

<header>
  <a href="#" class="logo-block" id="logoBlock">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 48" height="48" role="img" aria-label="GRIND">
      <rect width="110" height="48" rx="2" fill="#0a0a0a"/>
      <text x="8" y="35" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="26" fill="#f5f5f0" letter-spacing="0.5">GRIND</text>
      <circle cx="102" cy="34" r="4" fill="#F47920"/>
    </svg>
  </a>
  <nav class="header-nav" aria-label="Form progress">
    <span class="header-nav-item active">
      <span class="step-num">01</span>Intake
    </span>
    <span class="header-nav-sep"></span>
    <span class="header-nav-item">
      <span class="step-num">02</span>Assessment
    </span>
    <span class="header-nav-sep"></span>
    <span class="header-nav-item">
      <span class="step-num">03</span>Programme
    </span>
  </nav>
  <div class="header-right">
    <span class="header-year">© 2026</span>
    <span class="header-tag">Client Onboarding</span>
  </div>
</header>

<div class="hero">
  <p class="hero-eyebrow">Step 01 — Intake Form</p>
  <h1 class="hero-title">START YOUR JOURNEY</h1>
  <p class="hero-sub">Tell us about yourself. Every rep, every goal, every limit — we need the full picture to build something that actually works for you.</p>
</div>

<main>
  <form id="intakeForm" method="POST" action="">
    <div class="form-grid">

      <?php if (!empty($errors)): ?>
      <div class="form-errors">
        <?php foreach ($errors as $err): ?>
          <p><?= $err ?></p>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>

      <?php if ($mail_error): ?>
      <div class="mail-error">
        Your details were received but we couldn't send the confirmation email. Please contact us directly at <strong>grindfit.ai@trenddma.com</strong>.
      </div>
      <?php endif; ?>

      <!-- ── PERSONAL ── -->
      <div class="form-section">
        <div class="section-label">Personal</div>

        <div class="field">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" placeholder="Alex Carter" value="<?= old('name') ?>" required>
        </div>
        <div class="field">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="alex@example.com" value="<?= old('email') ?>" required>
        </div>
        <div class="field">
          <label for="age">Age</label>
          <input type="number" id="age" name="age" placeholder="28" min="14" max="99" value="<?= old('age') ?>" required>
        </div>
        <div class="field">
          <label for="gender">Gender</label>
          <select id="gender" name="gender">
            <option value="" disabled <?= old('gender') ? '' : 'selected' ?>>Select</option>
            <option<?= oldSelected('gender','Male') ?>>Male</option>
            <option<?= oldSelected('gender','Female') ?>>Female</option>
            <option<?= oldSelected('gender','Non-binary') ?>>Non-binary</option>
            <option<?= oldSelected('gender','Prefer not to say') ?>>Prefer not to say</option>
          </select>
        </div>
        <div class="field">
          <label for="occupation">Occupation</label>
          <input type="text" id="occupation" name="occupation" placeholder="Software Engineer" value="<?= old('occupation') ?>">
          <p class="field-note">Helps us understand your daily activity &amp; stress levels.</p>
        </div>
      </div>

      <!-- ── BODY METRICS ── -->
      <div class="form-section">
        <div class="section-label">Body Metrics</div>

        <div class="field">
          <label>Weight Unit</label>
          <div class="unit-toggle">
            <button type="button" class="unit-btn <?= (old('weight_unit','kg')==='kg') ? 'active' : '' ?>" data-unit="kg" data-field="weight">kg</button>
            <button type="button" class="unit-btn <?= (old('weight_unit','kg')==='lbs') ? 'active' : '' ?>" data-unit="lbs" data-field="weight">lbs</button>
          </div>
          <input type="hidden" name="weight_unit" id="weight_unit" value="<?= old('weight_unit','kg') ?>">
          <input type="number" id="weight" name="weight" placeholder="75" min="20" max="400" value="<?= old('weight') ?>" required>
        </div>

        <div class="field">
          <label>Height Unit</label>
          <div class="unit-toggle">
            <button type="button" class="unit-btn <?= (old('height_unit','cm')==='cm') ? 'active' : '' ?>" data-unit="cm" data-field="height">cm</button>
            <button type="button" class="unit-btn <?= (old('height_unit','cm')==='ft') ? 'active' : '' ?>" data-unit="ft" data-field="height">ft/in</button>
          </div>
          <input type="hidden" name="height_unit" id="height_unit" value="<?= old('height_unit','cm') ?>">
          <div id="height-cm" <?= (old('height_unit','cm')==='ft') ? 'style="display:none"' : '' ?>>
            <input type="number" id="height" name="height" placeholder="178" min="100" max="260" value="<?= old('height') ?>">
          </div>
          <div id="height-ft" <?= (old('height_unit','cm')==='cm') ? 'style="display:none"' : '' ?>>
            <div class="field-row" style="margin-top:0;">
              <input type="number" id="height_ft" name="height_ft" placeholder="5" min="3" max="8" value="<?= old('height_ft') ?>">
              <input type="number" id="height_in" name="height_in" placeholder="10" min="0" max="11" value="<?= old('height_in') ?>">
            </div>
          </div>
        </div>

        <div class="field">
          <label>Current Fitness Level</label>
          <div class="level-chips" id="fitnessLevel">
            <?php foreach (['beginner','intermediate','advanced','athlete'] as $lvl): ?>
            <button type="button" class="level-chip <?= oldFitness($lvl) ?>" data-value="<?= $lvl ?>"><?= ucfirst($lvl) ?></button>
            <?php endforeach; ?>
          </div>
          <input type="hidden" id="fitness_level_val" name="fitness_level" value="<?= old('fitness_level') ?>">
        </div>

        <div class="field">
          <label for="days_per_week">Available Training Days / Week</label>
          <select id="days_per_week" name="days_per_week">
            <option value="" disabled <?= old('days_per_week') ? '' : 'selected' ?>>Select</option>
            <?php foreach (['2 days','3 days','4 days','5 days','6 days','7 days'] as $d): ?>
            <option<?= oldSelected('days_per_week',$d) ?>><?= $d ?></option>
            <?php endforeach; ?>
          </select>
        </div>

        <div class="field">
          <label for="session_duration">Preferred Session Length</label>
          <select id="session_duration" name="session_duration">
            <option value="" disabled <?= old('session_duration') ? '' : 'selected' ?>>Select</option>
            <?php foreach (['30 mins','45 mins','60 mins','75 mins','90+ mins'] as $s): ?>
            <option<?= oldSelected('session_duration',$s) ?>><?= $s ?></option>
            <?php endforeach; ?>
          </select>
        </div>
      </div>

      <!-- ── TRAINING GOALS (full width) ── -->
      <div class="form-section full-width">
        <div class="section-label">Training Goals</div>

        <div class="goals-grid" id="goalsGrid">
          <?php
          $goalDefs = [
            'Fat Loss'        => ['🔥', 'Burn, shred, recompose'],
            'Muscle Gain'     => ['💪', 'Size, mass, hypertrophy'],
            'Strength'        => ['🏋️', 'Power, lifts, PRs'],
            'General Fitness' => ['⚡', 'Move better, feel better'],
          ];
          foreach ($goalDefs as $gval => [$icon, $sub]):
            $sel = oldGoal($gval);
          ?>
          <div class="goal-chip<?= $sel ? ' selected' : '' ?>" onclick="toggleGoal(this, '<?= htmlspecialchars($gval) ?>')">
            <input type="checkbox" name="goals[]" value="<?= htmlspecialchars($gval) ?>"<?= $sel ? ' checked' : '' ?>>
            <div class="goal-icon"><?= $icon ?></div>
            <div class="goal-text">
              <strong><?= $gval ?></strong>
              <span><?= $sub ?></span>
            </div>
            <div class="check-mark"><svg viewBox="0 0 10 8"><path d="M1 4l2.5 2.5L9 1" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
          </div>
          <?php endforeach; ?>
        </div>

        <div class="field">
          <label for="goal_focus">Specific Focus Area</label>
          <input type="text" id="goal_focus" name="goal_focus" placeholder="I want to focus on my shoulders and upper back…" value="<?= old('goal_focus') ?>">
        </div>

        <div class="field" style="margin-top: 24px;">
          <label>Workout Preference</label>
          <div class="workout-toggle">
            <?php
            $woDefs = [
              'Gym'  => ['🏟️', 'Full equipment access'],
              'Home' => ['🏠', 'Minimal or no equipment'],
              'Both' => ['🔀', 'Mix of gym &amp; home'],
            ];
            foreach ($woDefs as $wval => [$wico, $wsub]):
              $wid  = 'wo-' . strtolower($wval);
              $wsel = oldWorkout($wval);
            ?>
            <button type="button" class="workout-btn<?= $wsel ? ' selected' : '' ?>" id="<?= $wid ?>" onclick="selectWorkout('<?= $wval ?>')">
              <span class="wo-icon"><?= $wico ?></span>
              <span class="wo-text">
                <strong><?= $wval ?></strong>
                <span><?= $wsub ?></span>
              </span>
            </button>
            <?php endforeach; ?>
          </div>
          <input type="hidden" id="workout_pref" name="workout_pref" value="<?= old('workout_pref') ?>">
        </div>
      </div>

      <!-- ── HEALTH ── -->
      <div class="form-section">
        <div class="section-label">Health &amp; Limitations</div>

        <div class="field">
          <label>Any injuries or physical limitations?</label>
          <div id="injuries">
            <?php foreach (['Knee' => 'Knee issues', 'Lower Back' => 'Lower back pain', 'Shoulder' => 'Shoulder injury', 'None' => 'No injuries'] as $ival => $ilabel): ?>
            <div class="checkbox-row<?= ($_SERVER['REQUEST_METHOD']==='POST' && in_array($ival, (array)($_POST['injuries']??[]))) ? ' checked' : '' ?>" onclick="toggleCheck(this)">
              <input type="checkbox" name="injuries[]" value="<?= $ival ?>"<?= oldCheck('injuries[]',$ival) ?>>
              <div class="checkbox-box"><svg viewBox="0 0 10 8"><path d="M1 4l2.5 2.5L9 1" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
              <span class="checkbox-label"><?= $ilabel ?></span>
            </div>
            <?php endforeach; ?>
          </div>
        </div>

        <div class="field">
          <label for="injuries_detail">Describe any injury / health concern</label>
          <textarea id="injuries_detail" name="injuries_detail" placeholder="E.g. Torn ACL in 2022, fully recovered but cautious with heavy squats…"><?= old('injuries_detail') ?></textarea>
        </div>
      </div>

      <!-- ── DIET & LIFESTYLE ── -->
      <div class="form-section">
        <div class="section-label">Diet &amp; Lifestyle</div>

        <div class="field">
          <label for="diet">Dietary Preference</label>
          <select id="diet" name="diet">
            <option value="" disabled <?= old('diet') ? '' : 'selected' ?>>Select</option>
            <?php foreach (['No restrictions','Vegetarian','Vegan','Keto / Low-carb','Intermittent Fasting','Gluten-free','Other'] as $d): ?>
            <option<?= oldSelected('diet',$d) ?>><?= $d ?></option>
            <?php endforeach; ?>
          </select>
        </div>

        <div class="field">
          <label for="sleep">Average Sleep (hours/night)</label>
          <select id="sleep" name="sleep">
            <option value="" disabled <?= old('sleep') ? '' : 'selected' ?>>Select</option>
            <?php foreach (['Less than 5','5–6 hours','6–7 hours','7–8 hours','8+ hours'] as $s): ?>
            <option<?= oldSelected('sleep',$s) ?>><?= $s ?></option>
            <?php endforeach; ?>
          </select>
        </div>

        <div class="field">
          <label for="stress">Stress Level (daily)</label>
          <select id="stress" name="stress">
            <option value="" disabled <?= old('stress') ? '' : 'selected' ?>>Select</option>
            <?php foreach (['Low','Moderate','High','Very high'] as $s): ?>
            <option<?= oldSelected('stress',$s) ?>><?= $s ?></option>
            <?php endforeach; ?>
          </select>
        </div>
      </div>

      <!-- ── CONSULTATION OPT-IN ── -->
      <div class="form-section full-width consultation-section">
        <div class="section-label">Coaching Consultation</div>
        <div class="consultation-wrap" onclick="toggleConsultation(this)">
          <div class="consult-checkbox-box" id="consultBox">
            <svg viewBox="0 0 10 8"><path d="M1 4l2.5 2.5L9 1" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <input type="checkbox" name="consultation" id="consultation" value="yes"<?= ($_SERVER['REQUEST_METHOD']==='POST' && ($_POST['consultation']??'')==='yes') ? ' checked' : '' ?> style="display:none;">
          <div class="consult-text">
            <strong>I would like a consultation for lifestyle correction</strong>
            <span>Our coaches will reach out to discuss a holistic plan covering training, nutrition, recovery, and daily habits tailored to your lifestyle.
            <p class="consultation-note">
    Note: Lifestyle Correction Consultation is a paid service.
    Pricing and package details are available on the <a style="color:#FF8C1A;font-weight:600;text-decoration:none;" href="https://trenddma.com/GRIND/membership-guide.php" target="_blank">Membership Guide</a>.
</p>
            
            
            </span>
            
            
            
            
          </div>
        </div>
      </div>

      <!-- ── SUBMIT ── -->
      <div class="submit-zone">
        <div class="submit-note">
          <strong>Your data stays with us.</strong> This intake form is the foundation of your personalised GRIND programme. Be as specific as possible — the more we know, the more we can deliver.
        </div>
        <button type="submit" class="btn-submit">Submit</button>
      </div>

    </div>
  </form>
</main>

<footer>
  <span class="footer-copy">© 2026 GRIND — All rights reserved</span>
  <span class="footer-copy">Support: support.grindfit.ai@trenddma.com</span>
  
  
  
</footer>

<?php endif; ?>

<script>
  // ── Goal chips (div, no double-fire) ────────
  function toggleGoal(el, value) {
    el.classList.toggle('selected');
    el.querySelector('input[type="checkbox"]').checked = el.classList.contains('selected');
  }

  // ── Injury checkboxes (div, no double-fire) ─
  function toggleCheck(el) {
    el.classList.toggle('checked');
    const cb = el.querySelector('input[type="checkbox"]');
    if (cb) cb.checked = el.classList.contains('checked');
  }

  // ── Consultation opt-in ──────────────────────
  function toggleConsultation(el) {
    el.classList.toggle('checked');
    const cb = document.getElementById('consultation');
    if (cb) cb.checked = el.classList.contains('checked');
  }

  // Restore checked state on page load (after PHP repopulation)
  (function() {
    const cb = document.getElementById('consultation');
    if (cb && cb.checked) {
      const wrap = cb.closest('.consultation-wrap');
      if (wrap) wrap.classList.add('checked');
    }
  })();

  // ── Workout preference ──────────────────────
  function selectWorkout(value) {
    document.querySelectorAll('.workout-btn').forEach(b => b.classList.remove('selected'));
    const btn = document.getElementById('wo-' + value.toLowerCase());
    if (btn) btn.classList.add('selected');
    document.getElementById('workout_pref').value = value;
  }

  // ── Unit toggles ────────────────────────────
  document.querySelectorAll('.unit-toggle').forEach(group => {
    group.querySelectorAll('.unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const field = btn.dataset.field;
        const unit  = btn.dataset.unit;
        if (field === 'height') {
          document.getElementById('height-cm').style.display = unit === 'ft' ? 'none' : 'block';
          document.getElementById('height-ft').style.display = unit === 'ft' ? 'block' : 'none';
          document.getElementById('height_unit').value = unit;
        }
        if (field === 'weight') {
          document.getElementById('weight_unit').value = unit;
        }
      });
    });
  });

  // ── Fitness level chips ──────────────────────
  document.querySelectorAll('#fitnessLevel .level-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#fitnessLevel .level-chip').forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      document.getElementById('fitness_level_val').value = chip.dataset.value;
    });
  });
</script>
</body>
</html>