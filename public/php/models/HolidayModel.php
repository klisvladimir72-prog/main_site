<?php

class HolidayModel extends BaseModel
{
    public function getHolidaysByDate($date)
    {
        // Преобразуем входящую дату в формат 'm-d' (месяц-день)
        $inputDate = new DateTime($date);
        $monthDay = $inputDate->format('m-d');

        $stmt = $this->db->prepare("
            SELECT 
                title,
                holiday_date
            FROM holidays
            WHERE DATE_FORMAT(holiday_date, '%m-%d') = :monthDay
        ");

        $stmt->execute(['monthDay' => $monthDay]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
