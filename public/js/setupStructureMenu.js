export function setupStructureMenu() {
    const contentContainer = document.querySelector('.structure__content');
    const menuItems = document.querySelectorAll('.structure__menu-item');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.id;
            const template = document.querySelector(`#template-${id}`);

            if (template) {
                contentContainer.innerHTML = '';
                contentContainer.appendChild(template.content.cloneNode(true));
            }
        });
    });
}