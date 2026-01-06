<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../models/BaseModel.php';
require_once __DIR__ . '/../models/HolidayModel.php';
require_once __DIR__ . '/../controllers/HolidayController.php';

$date = $_GET['date'] ?? null;

if (!$date) {
    echo json_encode(['error' => 'Дата не указана']);
    exit;
}

$controller = new HolidayController();
$holidays = $controller->getHolidaysByDate($date);

echo json_encode($holidays);
