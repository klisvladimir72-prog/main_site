<?php

class BirthdayModel extends BaseModel
{
    public function getBirthdaysByDate($day, $month)
    {
        $stmt = $this->db->prepare("
        SELECT
            m.Fam AS surname,
            m.Imya AS firstname,
            m.Otch AS lastname,
            `m`.`Zv` AS `rank`,
            m.Data AS birthday,
            m.kod,
            m.Tel,
            m.Kabinet,
            m.NPP,
            u.name_u AS post  -- добавляем название подразделения
        FROM main m
        LEFT JOIN upr u ON m.kod = u.kod
        WHERE STR_TO_DATE(m.Data, '%d.%m.%Y') IS NOT NULL
            AND DAY(STR_TO_DATE(m.Data, '%d.%m.%Y')) = :day
            AND MONTH(STR_TO_DATE(m.Data, '%d.%m.%Y')) = :month
        ");

        $stmt->execute([':day' => (int) $day, ':month' => (int) $month]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
