import { svgArrowSingleDown } from "../svg.js";

export function renderBirthDay(array, y, m, nowDate, place) {
	const $birthWrap = document.createElement("div"),
		$birthDescrWrap = document.createElement("div"),
		$birthDescrWrapTitle = document.createElement("span"),
		$divBirthDescr = document.createElement("div"),
		$divBirthDescrTitle = document.createElement("div"),
		// $divSvgArrowDown = document.createElement("div"),
		$ulBirthPeriod = document.createElement("ul"),
		$liBirthDay = document.createElement("li"),
		$liBirthWeek = document.createElement("li"),
		$liBirthMonth = document.createElement("li"),
		$liBirthThreeMonth = document.createElement("li"),
		$liBirthYear = document.createElement("li"),
		$birthPeoples = document.createElement("div");

	$birthWrap.classList.add("calendar__birth-wrap");
	$birthDescrWrap.classList.add("birth-descr");
	$birthDescrWrapTitle.classList.add("birth-descr-title");
	$birthPeoples.classList.add("birth-peoples");
	$divBirthDescr.classList.add("birth-select");
	$divBirthDescrTitle.classList.add("birth-select-title");
	$ulBirthPeriod.classList.add("birth-ul", "list-reset");
	$liBirthDay.classList.add("birth-li");
	$liBirthWeek.classList.add("birth-li");
	$liBirthMonth.classList.add("birth-li");
	$liBirthThreeMonth.classList.add("birth-li");
	$liBirthYear.classList.add("birth-li");

	$birthDescrWrapTitle.textContent = "Дни рождения  ";
	$divBirthDescrTitle.innerHTML = `<span class="birth-select-text">сегодня </span>  ` + svgArrowSingleDown;
	$liBirthDay.textContent = "сегодня";
	$liBirthWeek.textContent = "на неделю";
	$liBirthMonth.textContent = "на месяц";
	$liBirthThreeMonth.textContent = "на три месяца";
	$liBirthYear.textContent = "на год";

	const monthArrBirth = [
		"января",
		"февраля",
		"марта",
		"аперля",
		"мая",
		"июня",
		"июля",
		"августа",
		"сентября",
		"октября",
		"ноября",
		"декабря",
	];
	let period = 0;
	// выбор периода и показ дней рождения за период
	let countValue = $divBirthDescrTitle.querySelector(".birth-select-text");
	$divBirthDescrTitle.addEventListener("click", () => {
		$ulBirthPeriod.classList.toggle("birth-ul-active");
		$divBirthDescrTitle.classList.toggle("birth-select-title-active");

		if ($ulBirthPeriod.classList.contains("birth-ul-active")) {
			const periods = $ulBirthPeriod.querySelectorAll(".birth-li");
			for (const count of periods) {
				count.addEventListener("click", () => {
					let value = count.textContent;
					countValue.textContent = value;
					$ulBirthPeriod.classList.remove("birth-ul-active");
					$divBirthDescrTitle.classList.remove("birth-select-title-active");
					switch (countValue.textContent) {
						case $liBirthDay.textContent:
							period = 0;
							break;
						case $liBirthWeek.textContent:
							period = 7;
							break;
						case $liBirthMonth.textContent:
							period = 31;
							break;
						case $liBirthThreeMonth.textContent:
							period = 93;
							break;
						case $liBirthYear.textContent:
							period = 360;
							break;
					}
					$birthPeoples.innerHTML = "";
					renderBirthDayPeriod(period);
				});
			}
		}
	});

	function renderBirthDayPeriod(period) {
		const searchDate = new Date(y, m, nowDate.getDate() + period);

		for (const item of array) {
			let searchMonth = searchDate.getMonth() + 1;
			let searchDay = searchDate.getDate();
			let nowDay = nowDate.getDate();
			let birthMonth = item.birthMonth;

			// проверка при переходе на след год
			if (nowDate.getFullYear() < searchDate.getFullYear()) {
				searchMonth = searchMonth + 12;
				// console.log(new Date(y, searchMonth, searchDay));
			} else searchMonth = searchDate.getMonth() + 1;

			// проверка на след месяц

			if (nowDate.getMonth() + 1 == birthMonth && item.birthDay > nowDay) {
				searchDay = item.birthDay + period;
			} else searchDay = nowDay;

			if (nowDate.getMonth() + 1 > birthMonth) {
				birthMonth = birthMonth + 12;
				nowDay = 0;
				searchDay = 31;
			}

			if (
				(searchMonth >= birthMonth &&
					searchDay > item.birthDay &&
					birthMonth >= nowDate.getMonth() + 1 &&
					item.birthDay > nowDay) ||
				(nowDate.getMonth() + 1 == birthMonth && nowDay == item.birthDay && searchDay == item.birthDay)
			) {
				const $itemWrpap = document.createElement("div"),
					$itemName = document.createElement("span"),
					$itemBirth = document.createElement("span");

				$itemWrpap.classList.add("birth__item-wrap");
				$itemName.classList.add("birth__item-name");
				$itemBirth.classList.add("birth__item-day");

				$itemName.textContent = `${item.lastName} ${item.name} \u2014 `;
				$itemBirth.textContent = `${item.birthDay}  ${monthArrBirth[item.birthMonth - 1]}`;

				let yearOld = searchDate.getFullYear() - item.birthYear;
				if (yearOld % 5 == 0 || (nowDate.getFullYear() - item.birthYear) % 5 == 0) {
					$itemWrpap.classList.add("birth__item-jubilei");
				}
				if (
					nowDate.getDate() >= item.birthDay &&
					nowDate.getMonth() + 1 >= item.birthMonth &&
					searchDate.getFullYear() !== nowDate.getFullYear() &&
					(yearOld - 1) % 5 !== 0
				) {
					$itemWrpap.classList.remove("birth__item-jubilei");
				}

				$itemWrpap.append($itemName, $itemBirth);

				$birthPeoples.append($itemWrpap);
			}
		}

		const searchPeoplesBth = $birthPeoples.querySelectorAll(".birth__item-wrap");
		let i = 1;
		for (const item of searchPeoplesBth) {
			const $numberSpan = document.createElement("span");
			$numberSpan.classList.add(".birth__item-number");
			$numberSpan.textContent = `${i++}. `;
			item.prepend($numberSpan);
		}
	}
	renderBirthDayPeriod(period);

	const $btnBirthDay = document.querySelector(".btn-birthday");
	$btnBirthDay.addEventListener("click", () => {
		$birthWrap.classList.toggle("calendar__birth-wrap-active");
		$btnBirthDay.classList.toggle("btn-birthday-active");
	});

	$ulBirthPeriod.append($liBirthDay, $liBirthWeek, $liBirthMonth, $liBirthThreeMonth, $liBirthYear);
	$divBirthDescr.append($divBirthDescrTitle, $ulBirthPeriod);
	$birthDescrWrap.append($birthDescrWrapTitle, $divBirthDescr);
	$birthWrap.append($birthDescrWrap, $birthPeoples);
	place.append($birthWrap);

	return { $birthWrap };
}
