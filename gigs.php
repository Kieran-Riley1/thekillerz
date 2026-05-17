<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');


$host = 'cloud731.thundercloud.uk';
$db   = 'thekillerz_db';
$user = 'thekillerz_riley';
$pass = 'Sp4c3m4n!!';
$charset = 'utf8mb4';

$dsn = "mysql:host=cloud731.thundercloud.uk;port=3306;dbname=thekillerz_db;charset=utf8mb4";


try {
    $pdo = new PDO($dsn, $user, $pass, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Could not connect to database']);
    exit;
}

$sql = "
  SELECT
    DATE_FORMAT(`date`, '%d-%m-%Y') AS date,
    venue,
    city,
    location,
    ticket_link
  FROM gigs
  ORDER BY `date` ASC
";

try {
    $stmt = $pdo->query($sql);
    $gigs = $stmt->fetchAll();
    echo json_encode($gigs);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Query failed']);
}
?>