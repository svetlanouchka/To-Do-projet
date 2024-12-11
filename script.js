let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const openPopupButton = document.getElementById('button-create');
const closePopupButton = document.getElementById('popup-close');
const popup = document.getElementById('popup');
const overlay = document.getElementById('popup-overlay');
const taskList = document.getElementById('task-list');

const taskInput = document.getElementById('task-description');
const deadlineInput = document.getElementById('task-deadline');
const categoryInput = document.getElementById('task-category');
const priorityInput = document.getElementById('task-priority');

const filterCategory = document.getElementById('filter-category');
const filterPriority = document.getElementById('filter-priority');
const filterButton = document.getElementById('filter-button');

openPopupButton.addEventListener('click', () => {
    popup.style.display = 'block';
    overlay.style.display = 'block';
});

closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

document.getElementById('button-save').addEventListener('click', () => {
    const task = {
        id: Date.now(),
        text: taskInput.value,
        deadline: deadlineInput.value,
        category: categoryInput.value,
        priority: priorityInput.value,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

function renderTasks(filterCategoryValue = 'all', filterPriorityValue = 'all') {
    taskList.innerHTML = '';
    tasks
        .filter(task => 
            (filterCategoryValue === 'all' || task.category === filterCategoryValue) &&
            (filterPriorityValue === 'all' || task.priority === filterPriorityValue)
        )
        .forEach(task => {
            const taskEl = document.createElement('li');
            taskEl.classList.add('task');
            taskEl.innerHTML = `
                <span>${task.text} (${task.category}, priorité: ${task.priority})</span>
                <button onclick="deleteTask(${task.id})">🗑️</button>
            `;
            if (task.completed) taskEl.classList.add('completed');
            taskList.appendChild(taskEl);
        });
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

filterButton.addEventListener('click', () => {
    const categoryFilter = filterCategory.value;
    const priorityFilter = filterPriority.value;
    renderTasks(categoryFilter, priorityFilter);
});

renderTasks();