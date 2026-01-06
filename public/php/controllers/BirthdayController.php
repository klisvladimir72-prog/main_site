<?php 

class BirthdayController {
    private $model;

    public function __construct(){
        $this->model = new BirthdayModel();
    }

    public function getBirthdaysByDate($date){
        $dateObj = DateTime::createFromFormat('Y-m-d', $date);
        if(!$dateObj){
            return ['error' => 'Неверный формат даты'];
        }

        $day = $dateObj->format('d');
        $month = $dateObj->format('m');

        return $this->model->getBirthdaysByDate($day, $month);
    }
}