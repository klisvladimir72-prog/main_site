export function lazyLoading() {
    const lazySections = document.querySelectorAll('.lazy-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadSection(entry.target);
                observer.unobserve(entry.target); // Один раз
            }
        });
    }, {
        rootMargin: "0px 0px -50px 0px"
    });

    // Начинаем отслеживание
    lazySections.forEach(section => {
        observer.observe(section);
    });

    // Обработка якорных ссылок
    document.querySelectorAll('a[href^="#section"]').forEach(anchor => {
        console.log(anchor);
        if (anchor.contains.classList('section')) {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Прокручиваем к секции
                    targetSection.scrollIntoView({ behavior: 'smooth' });

                    // Если секция ещё не загружена — загружаем
                    if (!targetSection.classList.contains('loaded')) {
                        loadSection(targetSection);
                    }
                } 
            });
        }
    });

    function loadSection(section) {
        const placeholder = section.querySelector('.content-placeholder');

        // Имитация загрузки
        setTimeout(() => {
            section.classList.add('loaded');
            triggerAnimation(section); // Запуск анимации
        }, 500);
    }

    // Функция, которая запускает анимацию через сброс и возврат
    function triggerAnimation(section) {
        const pseudoElement = window.getComputedStyle(section, '::before');
        // Сбрасываем анимацию
        section.style.animation = 'none';
        // Принудительно обновляем DOM
        void section.offsetWidth;
        // Возвращаем анимацию
        section.style.removeProperty('animation');
    }
}