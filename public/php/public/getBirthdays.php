<?php
header('Content-Type: application/json; charset=utf-8');

require_once '../config/Database.php';
require_once '../models/BaseModel.php';
require_once '../models/BirthdayModel.php';
require_once '../controllers/BirthdayController.php';

$date = $_GET['date'] ?? null;

if (!$date) {
    echo json_encode(['error' => 'Дата не указана']);
    exit;
}

$controller = new BirthdayController();
$birthdays = $controller->getBirthdaysByDate($date);

echo json_encode($birthdays);
