export function animateMunu() {
    const menuItems = document.querySelectorAll('.menu__item'),
        menuBtn = document.querySelector('.hamburger-button');

    menuBtn.addEventListener('click', () => {
        if (menuItems) {
            const isChecked = check.checked;

            if (isChecked) {
                for (let i = menuItems.length - 1; i >= 0; i--) {
                    const item = menuItems[i];
                    item.style.animationDelay = `${(menuItems.length - 1 - i) * 0.05}s`;
                    item.classList.toggle('slide-in-blurred-left');
                    item.classList.toggle('slide-out-blurred-left');
                }

            } else {
                for (let i = 0; i < menuItems.length; i++) {
                    const item = menuItems[i];
                    item.style.animationDelay = `${i * 0.05}s`;
                    item.classList.toggle('slide-out-blurred-left');
                    item.classList.toggle('slide-in-blurred-left');
                }
                setTimeout(() => {
                    overlay.classList.remove('active');
                }, 3000);
            }
        }
    });

    // Затеменение фона при наведении на меню
    const menuItemsHover = document.querySelectorAll('.home__menu li');
    const overlay = document.createElement('div');
    overlay.classList.add('menu-overlay');
    document.body.appendChild(overlay);

    menuItemsHover.forEach(item => {
        item.addEventListener('mouseenter', () => {
            overlay.classList.add('active');
        });

        item.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!isHoveredOnMenu()) {
                    overlay.classList.remove('active');
                }
            }, 50);
        });
    });

    // Вспомогательная функция: проверяет, находится ли курсор на меню
    function isHoveredOnMenu() {
        return document.querySelector('.home__menu:hover') !== null;
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', () => {
            if (check.checked) {
                check.checked = false; // Снимаем чекбокс (закрываем меню)

                // Анимация закрытия
                for (let i = 0; i < menuItems.length; i++) {
                    const item = menuItems[i];
                    item.style.animationDelay = `${i * 0.05}s`;
                    item.classList.remove('slide-in-blurred-left');
                    item.classList.add('slide-out-blurred-left');
                }

                // Убираем затемнение
                setTimeout(() => {
                    overlay.classList.remove('active');
                }, 300);
            }
        });
    });


}