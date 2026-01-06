<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../config/Database.php';
require_once __DIR__ . '/../models/BaseModel.php';
require_once __DIR__ . '/../models/WorkCalendarModel.php';
require_once __DIR__ . '/../controllers/WorkCalendarController.php';

$year = $_GET['year'] ?? date('Y');
$month = $_GET['month'] ?? date('m');

$controller = new WorkCalendarController();
$calendar = $controller->getCalendarByMonth($year, $month);

echo json_encode($calendar, JSON_UNESCAPED_UNICODE);
