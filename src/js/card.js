// JavaScript for drag-and-drop functionality
const cards = document.querySelectorAll('.card');
const container = document.querySelector('.cards-container');
const statusCircles = document.querySelectorAll('.circle');

let draggedCard = null;

cards.forEach(card => {
    card.addEventListener('dragstart', () => {
        draggedCard = card;
        card.classList.add('dragging');
    });

    card.addEventListener('dragend', () => {
        draggedCard = null;
        card.classList.remove('dragging');
    });
});

container.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    if (draggedCard && afterElement == null) {
        container.appendChild(draggedCard);
    } else if (draggedCard && afterElement) {
        container.insertBefore(draggedCard, afterElement);
    }
    updateStatus();
});

const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

const updateStatus = () => {
    const currentOrder = [...container.children].map(card => card.dataset.order);
    statusCircles.forEach((circle, index) => {
        if (currentOrder[index] == circle.dataset.step) {
            circle.classList.add('filled');
        } else {
            circle.classList.remove('filled');
        }
    });
}