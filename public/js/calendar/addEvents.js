import {
  viewBirthdayForFocusDate,
  viewEventsForFocusDate,
} from "./adminAddEvents.js";

export async function addEvents(date, condition) {
  const $eventsWrap = document.createElement("div"),
    $eventsBlock = document.createElement("div"),
    $eventsDescr = document.createElement("span"),
    $eventsDate = document.createElement("span"),
    $eventsList = document.createElement("ul"),
    $birthdayBlock = document.createElement("div"),
    $birthdayDescr = document.createElement("h3"),
    $birthdayList = document.createElement("ul");


  $eventsWrap.classList.add("calendar__events-wrap");
  $eventsBlock.classList.add("calendar__events");
  $eventsDescr.classList.add("calendar__events-descr");
  $eventsDate.classList.add("calendar__events-date");
  $eventsList.classList.add("calendar__events-list", "list-reset");
  $birthdayBlock.classList.add("calendar__events-birthday");
  $birthdayDescr.classList.add("birthday-descr");
  $birthdayList.classList.add("birthday-list", "list-reset");

  $eventsBlock.append($eventsDescr, $eventsDate, $eventsList);
  $birthdayBlock.append($birthdayDescr, $birthdayList);
  $eventsWrap.append($eventsBlock, $birthdayBlock);
  document.querySelector(".calendar__wrap").append($eventsWrap);

  const monthArr = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];




  // Отрисовка событий\
  function renderEvents(date) {
    const currentYear = date.getFullYear(),
      currentDay = date.getDate(),
      currentMonth = monthArr[date.getMonth()];
    $eventsDescr.textContent = "События";
    $eventsDate.textContent = ` ${currentDay} ${currentMonth}`;
    // вывод событий
    viewEventsForFocusDate($eventsList, date);
    viewBirthdayForFocusDate($birthdayList, date);

    // Отрисовка дней рождения
    $birthdayDescr.textContent = "Дни рождения";

  }
  renderEvents(date);

  return { renderEvents };
}
