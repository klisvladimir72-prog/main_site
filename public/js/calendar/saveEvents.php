<?php

// Получаем JSON-строку 
$jsonString = file_get_contents("php://input");
if (!$jsonString) {
    echo "Не удалось полчуить данные из запроса" . PHP_EOL;
    exit;
}

// Выводим полученную JSON-строку для отладки 
echo "Полученная JSON-строка: " . PHP_EOL;
echo htmlspecialchars($jsonString) . PHP_EOL;

// Преобразуем JSON-строку в объект PHP 
$data  = json_decode($jsonString, true);
if (!$data) {
    echo "Ошибка при декодировании JSON: " . json_last_error_msg() . PHP_EOL;
    exit();
}

// Преобразуем объект PHP обратно в строку JSON с опциями для читаемости и корректного отображения 
$jsonData = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
if (!$jsonData) {
    echo "Ошибка при преобразовании в JSON: " . json_last_error_msg() . PHP_EOL;
    exit();
}

// Путь к файлу для сохранения JSON 
$outputFileName = '../../json/events.json';

// Сохраняем JSON файл 
if (file_put_contents($outputFileName, $jsonData)) {
    echo 'Данные успешно сохранены в файл events.json' .  PHP_EOL;
} else {
    echo 'Не удалось сохранить данные в файл events.json' .  PHP_EOL;
}
