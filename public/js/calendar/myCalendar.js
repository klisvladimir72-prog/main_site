import {
	svgFixPin,
	svgKeyboardArrowLeft,
	svgKeyboardArrowRight,
	svgMenu,
} from "../svg.js";
import { addEvents } from "./addEvents.js";
import { adminAddEvents, workBirthday } from "./adminAddEvents.js";
import { scrollCalendar } from "./scrollCalendar.js";
// import { getSession } from "../main.js";

export async function createCalendar() {
	const $calendarWrap = document.createElement("div"),
		$calendarTable = document.createElement("table"),
		$fullDateThead = document.createElement("thead"),
		$fullDateTr = document.createElement("tr"),
		$fulldateTh = document.createElement("th"),
		$fulldateThWrap = document.createElement("div"),
		$dateTodayWrap = document.createElement("div"),
		$fullDateMonth = document.createElement("span"),
		$fullDateYear = document.createElement("span"),
		$calendarBody = document.createElement("tbody"),
		$daysOfWeek = document.createElement("tr"),
		$btnMenu = document.createElement("button"),
		$btnPrevMonth = document.createElement("button"),
		$btnNextMonth = document.createElement("button"),
		$btnFixHover = document.createElement('button'),
		testDiv = document.createElement("div");

	$calendarWrap.classList.add("calendar__wrap");
	$calendarTable.classList.add("calendar__table");
	$fullDateThead.classList.add("calendar__table-thead");
	$fullDateTr.classList.add("calendar__thead-th");
	$fulldateTh.classList.add("calendar__thead-fulldate");
	$calendarBody.classList.add("calendar__body");
	$daysOfWeek.classList.add("calendar__body-daysweek");
	$fullDateMonth.classList.add("calendar__month");
	$fullDateYear.classList.add("calendar__year");
	$fulldateThWrap.classList.add("thead__wrap");
	$dateTodayWrap.classList.add("thead__wrap-today");
	$btnMenu.classList.add("btn-reset", "btn-menu");
	$btnPrevMonth.classList.add("btn-reset", "btn-other-month");
	$btnNextMonth.classList.add("btn-reset", "btn-other-month");
	$btnFixHover.classList.add('btn-reset', 'btn-fix');
	testDiv.classList.add("calendar__bg");

	$btnMenu.innerHTML = svgMenu;
	$btnPrevMonth.innerHTML = svgKeyboardArrowLeft;
	$btnNextMonth.innerHTML = svgKeyboardArrowRight;
	$btnFixHover.innerHTML = svgFixPin;



	const monthArr = [
		"Январь",
		"Февраль",
		"Март",
		"Апрель",
		"Май",
		"Июнь",
		"Июль",
		"Август",
		"Сентябрь",
		"Октябрь",
		"Ноябрь",
		"Декабрь",
	];

	const monthArrwithDate = [
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

	const daysOfWeekFull = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
	const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

	let y = new Date().getFullYear();
	let m = new Date().getMonth();
	let d = new Date().getDate();
	let date = new Date(y, m, d);

	// смена месяца
	$btnPrevMonth.addEventListener("click", () => {
		m--;
		date = new Date(y, m);
		console.log(date);

		renderCalendar(date);
	});

	$btnNextMonth.addEventListener("click", () => {
		m++;
		date = new Date(y, m);
		console.log(date);

		renderCalendar(date);
	});

	$fullDateMonth.addEventListener("click", () => {
		$calendarWrap.remove();
		createCalendar();
	});

	// Отрисовка календаря
	function renderCalendar(nowDate) {
		$calendarBody.innerHTML = "";
		function createFullDate(nowDate) {
			let numberMonth = nowDate.getMonth();
			// Заставка для пор года
			switch (numberMonth) {
				case 0:
				case 1:
				case 11:
					testDiv.style.backgroundImage = "url(../images/calendar/winter-2.jpg)";
					break;
				case 2:
				case 3:
				case 4:
					testDiv.style.backgroundImage = "url(../images/calendar/spring-1.jpg)";
					break;
				case 5:
				case 6:
				case 7:
					testDiv.style.backgroundImage = "url(../images/calendar/summer_1.jpg)";
					break;
				case 8:
				case 9:
				case 10:
					testDiv.style.backgroundImage = "url(../images/calendar/autumn-1.jpeg)";
					break;

				default:
					break;
			}
			const month = monthArr[numberMonth];
			let year = nowDate.getFullYear();
			let dayOfWeek = daysOfWeekFull[new Date().getDay() - 1];

			if (new Date().getDay() === 0) {
				dayOfWeek = daysOfWeekFull[6];
			}

			$fullDateMonth.textContent = `${dayOfWeek},  ${new Date().getDate()} ${monthArrwithDate[new Date().getMonth()]}`;
			$fullDateYear.textContent = `${month} ${year}`;
			return {
				month,
				year,
				numberMonth,
			};
		}
		// записываем назавание дней недели
		function createDaysOfMonth() {
			$daysOfWeek.innerHTML = "";
			for (const nameDay of daysOfWeek) {
				let nameD = document.createElement("td");
				nameD.textContent = nameDay;
				$daysOfWeek.append(nameD);
			}
			$calendarBody.append($daysOfWeek);
		}
		createDaysOfMonth();

		// Записываем даты в календарь
		function createDateOfMonth() {
			let y = createFullDate(date).year;
			let m = createFullDate(date).numberMonth;

			const firstDayOfMonth = new Date(y, m, 7).getDay() + 1, // для аномалий с воскресеньем
				lastDayOfMonth = new Date(y, m + 1, 0).getDate(),
				lastDayOfLastMonth = m === 0 ? new Date(y - 1, 12, 0).getDate() : new Date(y, m, 0).getDate();

			let i = 1;
			do {
				let day = new Date(y, m, i).getDay();
				if (day == 1) {
					// если первый день недели понедельник
					let mondey = new Date(y, m, i).getDate();
					let week = document.createElement("tr");
					let p = 1; // для дней следующего месяца
					for (let d = 1; d <= 7; d++) {
						let dayOfWeek = document.createElement("td");
						if (mondey <= lastDayOfMonth) {
							dayOfWeek.textContent = mondey;
							dayOfWeek.classList.add("days__present");
							week.append(dayOfWeek);
							mondey++;
						} else {
							// дописываем дни следующего месяца
							dayOfWeek.textContent = p;
							dayOfWeek.classList.add("days__other-month");
							week.append(dayOfWeek);
							p++;
						}
					}
					$calendarBody.append(week);
				} else if (i == 1) {
					// если первый день месяца не понедельник
					let k = lastDayOfLastMonth - firstDayOfMonth + 2;
					const firstWeek = document.createElement("tr");
					for (let j = 0; j < firstDayOfMonth - 1; j++) {
						let dayLastMonth = document.createElement("td");
						dayLastMonth.textContent = k;
						dayLastMonth.classList.add("days__other-month");
						firstWeek.append(dayLastMonth);
						k++;
					}
					for (let nowDay = 1; nowDay <= 7 - firstDayOfMonth + 1; nowDay++) {
						let dayNowMonth = document.createElement("td");
						dayNowMonth.classList.add("days__present");
						dayNowMonth.textContent = nowDay;
						firstWeek.append(dayNowMonth);
					}
					$calendarBody.append(firstWeek);
				}

				i++;
			} while (i <= lastDayOfMonth);

			const weeks = $calendarBody.querySelectorAll("tr");
			for (const week of weeks) {
				const days = week.querySelectorAll("td");

				days[5].classList.add("holidays");
				days[6].classList.add("holidays");
			}

			// стилизация сегодняшней даты
			const presDays = $calendarBody.querySelectorAll(".days__present");
			for (const day of presDays) {
				const now = new Date(y, m, parseInt(day.textContent));
				if (
					m == new Date().getMonth() &&
					y == new Date().getFullYear() &&
					parseInt(day.textContent) === new Date().getDate()
				) {
					day.classList.add("day__now", "day__active");
				}

				// Click ПО ДАТЕ ДЛЯ ПРОСМОТРА СОБЫТИЙ И ДНЕЙ РОЖДЕНИЯ ЗА ЭТУ ДАТУ
				day.addEventListener("click", async () => {
					for (const active of presDays) {
						if (active.classList.contains("day__active")) active.classList.remove("day__active");
					}
					day.classList.add("day__active");
					// получаем полную дату по клику на календарь
					const focusDay = day.textContent;
					const focusMonth = monthArr.indexOf(document.querySelector(".calendar__year").textContent.split(/\s+/)[0]);
					const focusYear = document.querySelector(".calendar__year").textContent.split(/\s+/)[1];
					const focusDate = new Date(focusYear, focusMonth, focusDay);
					events.renderEvents(focusDate);
					// (await adminEvents).renderAdminEvents(focusDate);

					const event = document.querySelector(".calendar__events-wrap");
					if (event) {
						event.classList.add("swing-in-right");
						event.classList.remove("swing-out-right")
						$calendarTable.style.borderRadius = '0 15px 15px 0'
					}
				});
			}

			return $calendarBody;
		}
		createDateOfMonth();

		async function loadCalendarForCurrentMonth(year, month) {
			try {
				const response = await fetch(`../../php/public/getWorkCalendar.php?year=${year}&month=${month}`);
				const data = await response.json();

				// Создаем мапу: день -> тип ('work' или 'holiday')
				const calendarMap = new Map();
				data.forEach(item => {
					const date = new Date(item.calendar_date);
					calendarMap.set(date.getDate(), item.day_type);
				});

				// Находим все дни текущего месяца
				const presDays = $calendarBody.querySelectorAll(".days__present");

				for (const day of presDays) {
					const dayNum = parseInt(day.textContent);
					const dayOfWeek = new Date(year, month - 1, dayNum).getDay(); // 0=вс, 6=сб

					// УБИРАЕМ ВСЕ КЛАССЫ, СВЯЗАННЫЕ С ЦВЕТОМ
					day.classList.remove('holidays');

					// Применяем стиль по данным из БД или по умолчанию
					if (calendarMap.has(dayNum)) {
						if (calendarMap.get(dayNum) === 'holiday') {
							day.classList.add('holidays'); // красный
						}
						// Если 'work' — ничего не добавляем → черный
					} else {
						// Нет данных в БД — применяем по умолчанию:
						if (dayOfWeek === 0 || dayOfWeek === 6) {
							day.classList.add('holidays'); // суб/вск — красные
						}
						// Будни — черные (ничего не делаем)
					}
				}

			} catch (error) {
				console.error('Ошибка загрузки календаря:', error);
			}
		}

		// Вызов функции
		let year = createFullDate(date).year;
		let month = createFullDate(date).numberMonth + 1;
		loadCalendarForCurrentMonth(year, month);
	}
	renderCalendar(date);

	// Определим обработчики как отдельные функции
	function onCalendarEnter() {
		$calendarBody.classList.remove('swing-out-top-fwd');
		$calendarBody.classList.add("swing-in-top-fwd");
		testDiv.style.borderRadius = "0px";
		$calendarTable.style.borderRadius = '15px';
	}

	function onCalendarLeave() {
		$calendarBody.classList.remove("swing-in-top-fwd");
		$calendarBody.classList.add('swing-out-top-fwd');

		const event = document.querySelector(".calendar__events-wrap");
		if (event) {
			event.classList.remove("swing-in-right");
			event.classList.add("swing-out-right");
			testDiv.style.borderRadius = "15px";
			$calendarTable.style.borderRadius = '0 15px 15px 0';
		}
	}

	// Переменная для отслеживания текущего состояния
	let hoverHandlersEnabled = true;

	// Добавляем обработчики по умолчанию
	$calendarWrap.addEventListener('mouseenter', onCalendarEnter);
	$calendarWrap.addEventListener('mouseleave', onCalendarLeave);

	// Обработчик для кнопки $btnFixHover
	$btnFixHover.addEventListener('click', () => {
		if (hoverHandlersEnabled) {
			// Удаляем обработчики
			$calendarWrap.removeEventListener('mouseenter', onCalendarEnter);
			$calendarWrap.removeEventListener('mouseleave', onCalendarLeave);
			$btnFixHover.classList.toggle('btn-fix-active');
			$btnFixHover.classList.toggle('btn-fix');
			hoverHandlersEnabled = false;
		} else {
			// Добавляем обработчики обратно
			$calendarWrap.addEventListener('mouseenter', onCalendarEnter);
			$calendarWrap.addEventListener('mouseleave', onCalendarLeave);
			$btnFixHover.classList.toggle('btn-fix-active');
			$btnFixHover.classList.toggle('btn-fix');
			hoverHandlersEnabled = true;
		}
	});

	$fulldateTh.colSpan = 7;

	$dateTodayWrap.append($fullDateYear, $fullDateMonth);
	$fulldateThWrap.append($btnPrevMonth, $dateTodayWrap, $btnNextMonth, $btnMenu, $btnFixHover);
	$fulldateTh.append($fulldateThWrap, testDiv);
	$fullDateTr.append($fulldateTh);
	$fullDateThead.append($fullDateTr);
	$calendarTable.append($fullDateThead, $calendarBody);
	$calendarWrap.append($calendarTable);
	document.getElementById('home').append($calendarWrap);

	// Открытие блока для просмотра событий и дней рождения
	$btnMenu.addEventListener("click", () => {
		const events = document.querySelector(".calendar__events-wrap");
		if (events.classList.contains('swing-in-right')) {
			events.classList.remove('swing-in-right');
			events.classList.add('swing-out-right');
			$calendarTable.style.borderRadius = '15px'
		} else {
			events.classList.add('swing-in-right');
			events.classList.remove('swing-out-right');
			$calendarTable.style.borderRadius = '0 15px 15px 0'
		}
	});

	const events = await addEvents(new Date(), false);
	// const session = await getSession();
	let adminEvents;
	// if (session.role === 1) {
	// 	adminEvents = adminAddEvents(new Date());
	// }

	// scrollCalendar();

}
