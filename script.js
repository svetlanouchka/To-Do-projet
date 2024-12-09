document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('popup-overlay');
    const openPopupButton = document.getElementById('button-create');
    const closePopupIcon = document.getElementById('popup-close');

    // Ouvrir le popup
    openPopupButton.addEventListener('click', () => {
        popup.style.display = 'block';
        overlay.style.display = 'block';
    });

    // Fermer le popup via l'icône
    closePopupIcon.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Fermer en cliquant sur l'overlay
    overlay.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });
});


// Tableaux des tâches
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('task-description');
const addTaskButton = document.getElementById('button-save');
const taskList = document.getElementById('task-list');

//CREATE (Créer une tâche)
addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = {
            id: Date.now(), // Identifiant unique
            text: taskText,
            completed: false
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = ''; // On vide le champ input
    }
});

// READ (Afficher toutes les tâches)
function renderTasks() {
    taskList.innerHTML = ''; // On vide la liste avant de la remplir
    tasks.forEach(task => {
        const taskDiv = document.createElement('li');
        taskDiv.classList.add('task');
        taskDiv.innerHTML = `
            <span>${task.text}</span>
            <button class="button-modif" onclick="editTask(${task.id})">Modifier</button>
            
        `;
        taskList.appendChild(taskDiv);
    });
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

function editTask(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    const task = tasks[taskIndex];
    const newTaskText = prompt('Modifier la tâche:', task.text);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        tasks[taskIndex].text = newTaskText.trim();
        saveTasks();
        renderTasks();
    }
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Charger les tâches au démarrage
renderTasks()