<?php

$host = "localhost";
$db   = "trendyp4_grind_db";
$user = "trendyp4_grinduser";
$pass = "Radha@6770";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$db;charset=utf8mb4",
        $user,
        $pass
    );

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
    die("Database Connection Failed: " . $e->getMessage());
}