<?php

class WorkCalendarController
{
    private $model;

    public function __construct()
    {
        $this->model = new WorkCalendarModel();
    }

    public function getCalendarByMonth($year, $month)
    {
        return $this->model->getCalendarByMonth($year, $month);
    }
}
