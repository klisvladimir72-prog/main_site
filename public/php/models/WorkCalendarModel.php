<?php

class WorkCalendarModel extends BaseModel
{
    public function getCalendarByMonth($year, $month)
    {
        $stmt = $this->db->prepare("
            SELECT 
                calendar_date,
                day_type,
                description
            FROM work_calendar
            WHERE YEAR(calendar_date) = :year AND MONTH(calendar_date) = :month
            ORDER BY calendar_date ASC
        ");

        $stmt->execute([
            'year' => $year,
            'month' => $month
        ]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
