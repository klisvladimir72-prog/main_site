import { getArr, saveChanges } from "../api.js";
import { svgBtnAdd, svgCancelRed, svgPencil, svgViewBirthday } from "../svg.js";
import { createModalChange, renderBirthDay, renderBirthItem } from "./adminRenderBirthday.js";

export const monthArr = [
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

// Вывод блока для админа
export async function adminAddEvents(date) {
	let focusDay = date;
	const $addEventsWrap = document.createElement("div"),
		$currentEventsBlock = document.createElement("div"),
		$currentEventsTitle = document.createElement("h4"),
		$currentEventsList = document.createElement("ul"),
		$currentEventsBtn = document.createElement("button"),
		$birthViewBtn = document.createElement("button");

	const $newEventsBlock = document.createElement("div");

	$addEventsWrap.classList.add("admin__events-wrapper");
	$currentEventsBlock.classList.add("admin__events-current-block");
	$currentEventsTitle.classList.add("current-block__title");
	$currentEventsList.classList.add("current-block__list", "list-reset");
	$currentEventsBtn.classList.add("current-block__btn", "btn-reset");
	$newEventsBlock.classList.add("admin__events-new-block", "calendar__active");
	$birthViewBtn.classList.add("admin__view-birth", "btn-reset");

	$currentEventsBlock.append($currentEventsTitle, $currentEventsList, $currentEventsBtn, $birthViewBtn);

	$addEventsWrap.append($currentEventsBlock, $newEventsBlock);

	async function renderAdminEvents(date) {
		$currentEventsBlock.classList.remove("calendar__active");
		$newEventsBlock.classList.add("calendar__active");
		const eventsArr = await getArr("../json/events.json");
		const day = date.getDate();
		const month = date.getMonth();
		const year = date.getFullYear();

		if (eventsArr && eventsArr.length > 0) {
			$currentEventsTitle.textContent = `События ${day} ${monthArr[month]}`;
			$currentEventsList.textContent = "Какие-то события";
		} else {
			$currentEventsTitle.textContent = `События на ${day} ${monthArr[month].toLowerCase()}`;
			$currentEventsList.textContent = "Пока что событий нет 😏";
		}
		$currentEventsBtn.textContent = "Добавить";
		$birthViewBtn.innerHTML = svgViewBirthday;

		document.querySelector(".calendar__wrap").append($addEventsWrap);

		function closeWindowAddEvents(event) {
			if (event.key === "Escape") {
				$currentEventsBlock.classList.remove("calendar__active");
				$newEventsBlock.classList.add("calendar__active");
				window.removeEventListener("keydown", closeWindowAddEvents);
				viewEventsForFocusDate($currentEventsList, focusDay);
			}
		}

		$currentEventsBtn.addEventListener("click", () => {
			$currentEventsBlock.classList.add("calendar__active");
			$newEventsBlock.classList.remove("calendar__active");
			if (!$newEventsBlock.classList.contains("calendar__active")) {
				window.addEventListener("keydown", closeWindowAddEvents);
			}

			const newEventsBlock = document.querySelector(".admin__events-new-block");
			newEventsBlock.innerHTML = "";

			const $newEventsTitle = document.createElement("h4"),
				$newEventsForm = document.createElement("form"),
				$formInputWrap = document.createElement("div"),
				$formTitleWrap = document.createElement("div"),
				$formTitleInput = document.createElement("input"),
				$formTitleLabel = document.createElement("label"),
				$formDescrWrap = document.createElement("div"),
				$formDescrInput = document.createElement("input"),
				$formDescrLabel = document.createElement("label"),
				$formBtnWrap = document.createElement("div"),
				$formBtnAdd = document.createElement("button"),
				$formBtnCancel = document.createElement("button");
			$newEventsTitle.classList.add("new-block__title");
			$newEventsForm.classList.add("new-block__form");
			$formInputWrap.classList.add("new-block__inputs");
			$formTitleWrap.classList.add("inputs__title-wrap");
			$formTitleInput.classList.add("inputs__title-input", "new-event__input");
			$formTitleLabel.classList.add("inputs__title-label", "new-event__label");
			$formDescrWrap.classList.add("inputs__descr-wrap");
			$formDescrInput.classList.add("inputs__descr-input", "new-event__input");
			$formDescrLabel.classList.add("inputs__descr-label", "new-event__label");
			$formBtnWrap.classList.add("new-block__btn-wrap");
			$formBtnAdd.classList.add("btn-wrap__btn-add", "btn__wrap-btn", "btn-reset");
			$formBtnCancel.classList.add("btn-wrap__btn-cancel", "btn__wrap-btn", "btn-reset");

			$newEventsTitle.textContent = "Добавление нового события";
			$formBtnAdd.textContent = "Сохранить";
			$formBtnCancel.textContent = "Отменить";

			$formTitleInput.id = "eventsTitle";
			$formDescrInput.id = "eventsDescr";
			$formTitleInput.placeholder = "";
			$formDescrInput.placeholder = "";
			$formTitleInput.setAttribute("required", "true");
			$formTitleLabel.setAttribute("for", "eventsTitle");
			$formDescrLabel.setAttribute("for", "eventsDescr");
			$formTitleLabel.textContent = "Заголовок";
			$formDescrLabel.textContent = "Описание";

			$formBtnAdd.setAttribute("type", "submit");

			$formTitleWrap.append($formTitleInput, $formTitleLabel);
			$formDescrWrap.append($formDescrInput, $formDescrLabel);
			$formInputWrap.append($formTitleWrap, $formDescrWrap);
			$formBtnWrap.append($formBtnAdd, $formBtnCancel);
			$newEventsForm.append($formInputWrap, $formBtnWrap);
			newEventsBlock.append($newEventsTitle, $newEventsForm);

			$formTitleInput.focus();

			$formBtnCancel.addEventListener("click", (e) => {
				e.preventDefault();
				$currentEventsBlock.classList.remove("calendar__active");
				$newEventsBlock.classList.add("calendar__active");
				window.removeEventListener("keydown", closeWindowAddEvents);
				viewEventsForFocusDate($currentEventsList, focusDay);
			});

			$formBtnAdd.addEventListener("click", async (e) => {
				e.preventDefault();
				const newEventsArr = await getArr("../json/events.json");

				const event = {
					date: focusDay,
					title: $formTitleInput.value,
					descr: $formDescrInput.value,
				};
				newEventsArr.push(event);
				saveChanges("../script/calendar/saveEvents.php", newEventsArr);
				$formTitleInput.value = "";
				$formDescrInput.value = "";
			});

			$newEventsForm.addEventListener("submit", async (e) => {
				e.preventDefault();
				const newEventsArr = await getArr("../json/events.json");

				const event = {
					date: focusDay,
					title: $formTitleInput.value,
					descr: $formDescrInput.value,
				};
				newEventsArr.push(event);
				saveChanges("../script/calendar/saveEvents.php", newEventsArr);
				$formTitleInput.value = "";
				$formDescrInput.value = "";
			});
		});

		focusDay = date;

		viewEventsForFocusDate($currentEventsList, focusDay);
		return {
			focusDay,
		};
	}
	await renderAdminEvents(focusDay);
	workBirthday();

	if (pageYOffset > 100) {
		const $adminEventsWrapper = document.querySelector(".admin__events-wrapper");
		if ($adminEventsWrapper) {
			$adminEventsWrapper.style.display = "none";
		}
	}

	return {
		renderAdminEvents,
	};
}

// Отображение события по клику на дату
export async function viewEventsForFocusDate(parentElement, date) {
	const viewBlock = document.querySelector(".admin__events-current-block");
	const addBlock = document.querySelector(".admin__events-new-block");
	parentElement.innerHTML = " ";

	try {
		let coincidenceArr = [];
		let count = 0;
		const focusDate = date,
			focusYear = focusDate.getFullYear(),
			focusMonth = focusDate.getMonth() + 1,
			focusDay = focusDate.getDate();

		const focusDateStr = `${focusYear}-${focusMonth}-${focusDay}`;
		const response = await fetch(`../../php/public/getHolidays.php?date=${focusDateStr}`);

		if (!response.ok) {
			throw new Error('Ошибка сети или сервера');
		}

		const arr = await response.json();
		if (arr.error) {
			parentElement.textContent = `Ошибка: ${arr.error}`;
			return;
		}

		for (const event of arr) {
			const dateEvent = new Date(event.holiday_date),
				eventYear = dateEvent.getFullYear(),
				eventMonth = dateEvent.getMonth() + 1,
				eventDay = dateEvent.getDate();
			if (focusMonth === eventMonth && focusDay === eventDay) coincidenceArr.push(event);
		}
		if (coincidenceArr.length > 0) {
			for (const item of coincidenceArr) {
				count++;
				const $eventItem = document.createElement("li"),
					$wrapEvent = document.createElement("div"),
					$eventTitle = document.createElement("span"),
					$eventDescr = document.createElement("span"),
					$eventYear = document.createElement('span'),
					$eventBtnWrap = document.createElement("div"),
					$eventChangeBtn = document.createElement("button"),
					$eventRemoveBtn = document.createElement("button");

				$eventItem.classList.add("current-block__item");
				$wrapEvent.classList.add("item-wrap");
				$eventTitle.classList.add("item-title");
				$eventDescr.classList.add("item-descr");
				$eventBtnWrap.classList.add("item-wrap-btn");
				$eventChangeBtn.classList.add("item-btn", "item-btn-change", "btn-reset");
				$eventRemoveBtn.classList.add("item-btn", "item-btn-remove", "btn-reset");
				$eventYear.classList.add('item-birth__year');

				// Вычисляем возраст события
				const eventDate = new Date(item.holiday_date);
				const eventYear = eventDate.getFullYear();
				const currentYear = new Date().getFullYear();
				const yearsSince = currentYear - eventYear;

				let titleText = `${count}. ${item.title}`;
				$eventTitle.textContent = titleText;

				// Показываем возраст, только если событие было в прошлом году или раньше

				let yearText = "лет";
				if (yearsSince % 10 === 1 && yearsSince !== 11) yearText = "год";
				else if ([2, 3, 4].includes(yearsSince % 10) && ![12, 13, 14].includes(yearsSince % 10)) yearText = "года";

				if (yearText.includes('лет')) {
					$eventYear.classList.add('birth-anniversary');
				}

				$eventYear.textContent = `${yearsSince} ${yearText}`;

				if (yearsSince > 0) {
					$wrapEvent.append($eventTitle, $eventYear);
				} else {
					$wrapEvent.append($eventTitle);
				}


				$eventChangeBtn.innerHTML = svgPencil;
				$eventRemoveBtn.innerHTML = svgCancelRed;

				$eventBtnWrap.append($eventChangeBtn, $eventRemoveBtn);
				if (parentElement.classList.contains("current-block__list")) {
					$eventItem.append($wrapEvent, $eventBtnWrap);
				} else $eventItem.append($wrapEvent);
				parentElement.append($eventItem);

				// ЛОГИКА ИЗМЕНЕНИЯ СОБЫТИЯ
				$eventChangeBtn.addEventListener("click", () => {
					function closeWindowAddEvents(event) {
						if (event.key === "Escape") {
							viewBlock.classList.remove("calendar__active");
							addBlock.classList.add("calendar__active");
							viewEventsForFocusDate(viewBlock.querySelector(".current-block__list"), date);
						}
					}
					viewBlock.classList.add("calendar__active");
					addBlock.classList.remove("calendar__active");
					if (!addBlock.classList.contains("calendar__active")) {
						window.addEventListener("keydown", closeWindowAddEvents);
					}
					addBlock.innerHTML = "";

					const $newEventsTitle = document.createElement("h4"),
						$newEventsForm = document.createElement("form"),
						$formInputWrap = document.createElement("div"),
						$formTitleWrap = document.createElement("div"),
						$formTitleInput = document.createElement("input"),
						$formTitleLabel = document.createElement("label"),
						$formDescrWrap = document.createElement("div"),
						$formDescrInput = document.createElement("input"),
						$formDescrLabel = document.createElement("label"),
						$formBtnWrap = document.createElement("div"),
						$formBtnAdd = document.createElement("button"),
						$formBtnCancel = document.createElement("button");

					$newEventsTitle.classList.add("new-block__title");
					$newEventsForm.classList.add("new-block__form");
					$formInputWrap.classList.add("new-block__inputs");
					$formTitleWrap.classList.add("inputs__title-wrap");
					$formTitleInput.classList.add("inputs__title-input", "new-event__input");
					$formTitleLabel.classList.add("inputs__title-label", "new-event__label");
					$formDescrWrap.classList.add("inputs__descr-wrap");
					$formDescrInput.classList.add("inputs__descr-input", "new-event__input");
					$formDescrLabel.classList.add("inputs__descr-label", "new-event__label");
					$formBtnWrap.classList.add("new-block__btn-wrap");
					$formBtnAdd.classList.add("btn-wrap__btn-add", "btn__wrap-btn", "btn-reset");
					$formBtnCancel.classList.add("btn-wrap__btn-cancel", "btn__wrap-btn", "btn-reset");

					$newEventsTitle.textContent = "Изменить событие";
					$formTitleInput.id = "eventsTitle";
					$formDescrInput.id = "eventsDescr";
					$formTitleInput.placeholder = "";
					$formDescrInput.placeholder = "";
					$formTitleInput.setAttribute("required", "true");
					$formTitleLabel.setAttribute("for", "eventsTitle");
					$formDescrLabel.setAttribute("for", "eventsDescr");
					$formTitleLabel.textContent = "Заголовок";
					$formDescrLabel.textContent = "Описание";
					$formBtnAdd.textContent = "Сохранить";
					$formBtnCancel.textContent = "Отменить";

					$formBtnAdd.type = "submit";

					$formTitleWrap.append($formTitleInput, $formTitleLabel);
					$formDescrWrap.append($formDescrInput, $formDescrLabel);
					$formInputWrap.append($formTitleWrap, $formDescrWrap);
					$formBtnWrap.append($formBtnAdd, $formBtnCancel);
					$newEventsForm.append($formInputWrap, $formBtnWrap);
					addBlock.append($newEventsTitle, $newEventsForm);

					$formTitleInput.focus();

					$formTitleInput.value = item.title;
					$formDescrInput.value = item.descr;
					for (const event of arr) {
						if (event.title === item.title) {
							// СОХРАНЕНИЕ ИЗМЕНЕНИЙ
							$formBtnAdd.addEventListener("click", async (e) => {
								e.preventDefault();
								event.title = $formTitleInput.value;
								event.descr = $formDescrInput.value;
								await saveChanges("../script/calendar/saveEvents.php", arr);
								viewBlock.classList.remove("calendar__active");
								addBlock.classList.add("calendar__active");
								viewEventsForFocusDate(viewBlock.querySelector(".current-block__list"), date);
							});

							$newEventsForm.addEventListener("submit", async (e) => {
								e.preventDefault();
								event.title = $formTitleInput.value;
								event.descr = $formDescrInput.value;
								await saveChanges("../script/calendar/saveEvents.php", arr);
								viewBlock.classList.remove("calendar__active");
								addBlock.classList.add("calendar__active");
								viewEventsForFocusDate(viewBlock.querySelector(".current-block__list"), date);
							});
						}
					}
					// ЗАКРЫТЬ ОКНО ДЛЯ ИЗМЕНЕНИЙ
					$formBtnCancel.addEventListener("click", (e) => {
						e.preventDefault();
						viewBlock.classList.remove("calendar__active");
						addBlock.classList.add("calendar__active");
						viewEventsForFocusDate(viewBlock.querySelector(".current-block__list"), date);
					});
				});
				// УДАЛЕНИЕ СОБЫТИЯ
				$eventRemoveBtn.addEventListener("click", async () => {
					if (confirm("Вы уверены что хотите удалить событие?")) {
						const newArr = arr.filter((i) => i.title !== item.title);
						await saveChanges("../script/calendar/saveEvents.php", newArr);
						viewEventsForFocusDate(viewBlock.querySelector(".current-block__list"), date);
					}
				});
			}
		} else {
			parentElement.textContent = "На эту дату событий нет🙄";
		}
	} catch (error) {
		parentElement.textContent = "Ошибка загрузки событий.";
	}
}

// Отображение дней рождения по клику на дату
export async function viewBirthdayForFocusDate(parentElement, date) {
	parentElement.innerHTML = "";


	try {
		let coincidenceArr = [];
		let count = 0;
		const focusDate = date,
			focusYear = focusDate.getFullYear(),
			focusMonth = focusDate.getMonth() + 1,
			focusDay = focusDate.getDate();

		const focusDateStr = `${focusYear}-${focusMonth}-${focusDay}`;
		const response = await fetch(`../../php/public/getBirthdays.php?date=${focusDateStr}`);

		if (!response.ok) {
			throw new Error('Ошибка сети или сервера');
		}

		const birthArr = await response.json();
		if (birthArr.error) {
			parentElement.textContent = `Ошибка: ${birthArr.error}`;
			return;
		}


		for (const birth of birthArr) {
			const [day, month, year] = birth.birthday.split('.');
			const dateEvent = new Date(year, month - 1, day),
				eventYear = dateEvent.getFullYear(),
				eventMonth = dateEvent.getMonth() + 1,
				eventDay = dateEvent.getDate();
			if (focusMonth === eventMonth && focusDay === eventDay) coincidenceArr.push(birth);
		}

		if (coincidenceArr.length > 0) {
			for (const item of coincidenceArr) {
				count++;
				const birthItem = document.createElement("li"),
					itemNumber = document.createElement("span"),
					itemPersonWrap = document.createElement("div"),
					itemNameWrap = document.createElement("div"),
					personTitle = document.createElement("span"),
					personName = document.createElement("span"),
					personYear = document.createElement("span"),
					personDescr = document.createElement("span");

				birthItem.classList.add("birthday-list__item-birth");
				itemNumber.classList.add("item-birth__number");
				itemPersonWrap.classList.add("item-birth__name-wrap");
				itemNameWrap.classList.add("item-birth__wrap");
				personTitle.classList.add("item-birth__title");
				personName.classList.add("item-birth__name");
				personYear.classList.add("item-birth__year");
				personDescr.classList.add("item-birth__descr");

				let rankView = "";
				switch (item.rank) {
					case "рядовой":
						rankView = "ряд.";
						break;
					case "ефрейтор":
						rankView = "ефр.";
						break;
					case "сержант":
						rankView = "с-т";
						break;
					case "старший сержант":
						rankView = "ст. с-т";
						break;
					case "старшина":
						rankView = "ст-на.";
						break;
					case "прапорщик":
						rankView = "пр-к";
						break;
					case "старший прапорщик":
						rankView = "ст. пр-к";
						break;
					case "лейтенант":
						rankView = "л-т";
						break;
					case "старший лейтенант":
						rankView = "ст. л-т";
						break;
					case "капитан":
						rankView = "к-н";
						break;
					case "майор":
						rankView = "м-р";
						break;
					case "подполковник":
						rankView = "п/п-к";
						break;
					case "полковник":
						rankView = "п-к";
						break;
					case "генерал-майор":
						rankView = "генерал-майор";
						break;
					case "генерал-лейтенант":
						rankView = "генерал-лейтенант";
						break;
					case "генерал-полковник":
						rankView = "генерал-полковник";
						break;

					default:
						rankView = item.rank;
						break;
				}

				const [day, month, year] = item.birthday.split('.');
				const oldPerson = focusYear - new Date(year, month - 1, day).getFullYear();
				let yearText = "";
				switch (oldPerson % 10) {
					case 0:
						yearText = "лет";
						personYear.classList.add("birth-anniversary");
						break;
					case 1:
						yearText = "год";
						break;
					case 2:
						yearText = "годa";
						break;
					case 3:
						yearText = "годa";
						break;
					case 4:
						yearText = "годa";
						break;
					case 5:
						yearText = "лет";
						personYear.classList.add("birth-anniversary");
						break;

					default:
						yearText = "лет";
						break;
				}

				itemNumber.textContent = `${count}.`;
				personTitle.textContent = `${rankView} ${item.surname}`;
				personName.textContent = `${item.firstname} ${item.lastname}`;
				personYear.textContent = `${oldPerson} ${yearText}`;
				personDescr.textContent = `${item.post}`;

				itemNameWrap.append(personTitle, personName);
				itemPersonWrap.append(itemNameWrap, personYear, personDescr);
				birthItem.append(itemNumber, itemPersonWrap);
				parentElement.append(birthItem);
			}
		} else {
			parentElement.textContent = "На сегодня именинников нет🙄";
		}
	} catch (error) {

	}
}

// Работа с днями рождениями
export async function workBirthday() {
	// Создание модального окна
	const modal = document.createElement("div"),
		modalContent = document.createElement("div"),
		modalHeader = document.createElement("div"),
		modalTitle = document.createElement("h4"),
		modalAddBtn = document.createElement("button"),
		modalSearchWrap = document.createElement("div"),
		modalSearchIcon = document.createElement("div"),
		modalSearchInput = document.createElement("input"),
		modalClose = document.createElement("div"),
		modalTable = document.createElement("table"),
		modalThead = document.createElement("thead"),
		theadTr = document.createElement("tr"),
		theadThNumber = document.createElement("th"),
		theadThPost = document.createElement("th"),
		theadThRank = document.createElement("th"),
		theadThName = document.createElement("th"),
		theadThBirth = document.createElement("th"),
		theadThBtn = document.createElement("th"),
		modalTbody = document.createElement("tbody");

	modal.classList.add("modal");
	modalContent.classList.add("modal-content", "modal-content__birth");
	modalHeader.classList.add("birth__header");
	modalTitle.classList.add("birth__header-title");
	modalAddBtn.classList.add("birth__header-btn-add", "btn-reset");
	modalSearchWrap.classList.add("birth__header-search-wrap");
	modalSearchIcon.classList.add("birth__header-search-icon");
	modalSearchInput.classList.add("birth__header-search-input");
	modalClose.classList.add("birth__header-close-btn", "btn-reset");
	modalTable.classList.add("birth__table");
	modalThead.classList.add("table-thead");
	theadTr.classList.add("thead-tr");
	theadThNumber.classList.add("thead-th", "th-number");
	theadThPost.classList.add("thead-th", "th-post");
	theadThRank.classList.add("thead-th", "th-rank");
	theadThName.classList.add("thead-th", "th-name");
	theadThBirth.classList.add("thead-th", "th-birth");
	theadThBtn.classList.add("thead-th", "th-btn");
	modalTbody.classList.add("table-tbody");

	modalTitle.textContent = "Дни рождения";
	modalAddBtn.innerHTML = svgBtnAdd;
	modalClose.innerHTML = svgCancelRed;

	theadThNumber.textContent = "№ п/п";
	theadThPost.textContent = "Должность";
	theadThRank.textContent = "Звание";
	theadThName.textContent = "Ф.И.О.";
	theadThBirth.textContent = "Дата рождения";
	// theadThBtn.textContent = "Прочее";

	theadThBirth.colSpan = "2";

	modalClose.addEventListener("click", () => {
		modal.style.display = "none";
		document.body.style.overflow = "auto";
	});

	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" || e.keyCode === 27) {
			modal.style.display = "none";
			document.body.style.overflow = "auto";
		}
	});

	window.addEventListener("click", (e) => {
		if (e.target == modal) {
			modal.style.display = "none";
			document.body.style.overflow = "auto";
		}
	});

	theadTr.append(theadThNumber, theadThPost, theadThRank, theadThName, theadThBirth);
	modalThead.append(theadTr);
	modalTable.append(modalThead, modalTbody);
	modalSearchWrap.append(modalSearchIcon, modalSearchInput); // На будущее😁
	modalHeader.append(modalTitle, modalAddBtn, modalClose);
	modalContent.append(modalHeader, modalTable);
	modal.append(modalContent);
	document.body.append(modal);


	// Отображение дней рождения
	const viewBirthBtn = document.querySelector(".admin__view-birth");
	viewBirthBtn.addEventListener("click", async () => {
		const birthArr = await getArr("../../json/birthdays.json");
		modal.style.display = "block";
		document.body.style.overflow = "hidden";
		renderBirthDay(birthArr, modalTbody);
	});

	// Добавление нового человека
	modalAddBtn.addEventListener("click", async () => {
		const newItem = {
			post: "Должность",
			rank: "Звание",
			surname: "Фамилия",
			firstname: "Имя",
			lastname: "Отчество",
			birthday: "2025-08-13T21:00:00.000Z",
			id: Number(new Date()),
		};
		const arrPersons = await getArr("../json/birthdays.json");
		const persons = document.querySelectorAll(".item-number"); // получение отрисованных пользователей для получения count
		const count = Number(persons[persons.length - 1].textContent) + 1;
		arrPersons.push(newItem);
		saveChanges("../script/calendar/saveBirthday.php", arrPersons);
		renderBirthItem(newItem, modalTbody, count, arrPersons);
	});
}
