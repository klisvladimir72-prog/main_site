export function scrollCalendar() {
	const $wrapCalendar = document.querySelector(".calendar__wrap");

	window.addEventListener(
		"scroll",
		() => {
			const $adminEventsWrapper = document.querySelector(".admin__events-wrapper");
			if (pageYOffset > 100) {
				$wrapCalendar.classList.add("scroll");
				if ($adminEventsWrapper) {
					$adminEventsWrapper.style.display = "none";
				}
				document.querySelector(".calendar__year").style.display = "none";
				document.querySelector(".calendar__events-wrap").style.display = "none";

			} else {
				$wrapCalendar.classList.remove("scroll");
				if ($adminEventsWrapper) {
					$adminEventsWrapper.style.display = "block";
				}
				document.querySelector(".calendar__year").style.display = "block";
				document.querySelector(".calendar__events-wrap").style.display = "block";
			}
		},
		{ passive: true }
	);

	document.querySelector(".calendar__month").addEventListener("click", () => {
		$wrapCalendar.classList.toggle("scroll");
	});
}
