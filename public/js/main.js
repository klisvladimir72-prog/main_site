import { createCalendar } from "./calendar/myCalendar.js";
import { animateMunu } from "./home.js";
import { lazyLoading } from "./lazyLoading.js";
import { setupStructureMenu } from "./setupStructureMenu.js";


// Проверка на наличие сессии и отрисовка svg для входа
export async function getSession() {
    const response = await fetch("../script/login/request_session.php");
    const result = await response.json();
    if (result.success === "session_end") {
        alert(result.message);
    }
    return result;
}



createCalendar();
animateMunu();
lazyLoading();
setupStructureMenu();

function addLoadingClassWithAnimation(section) {
    // Убедимся, что класса нет
    section.classList.remove('loading');
    // Принудительный ререндер (force repaint)
    void section.offsetWidth;
    // Добавляем класс — анимация запустится
    section.classList.add('loading');
}

const section = document.querySelector('.section__structure');
addLoadingClassWithAnimation(section);