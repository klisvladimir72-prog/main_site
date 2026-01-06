<?php

class HolidayController
{
    private $model;

    public function __construct()
    {
        $this->model = new HolidayModel();
    }

    public function getHolidaysByDate($date)
    {
        return $this->model->getHolidaysByDate($date);
    }
}
