// Tableaux des tâches
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 

const taskInput = document.getElementById('task-description');
const addTaskButton = document.getElementById('button-save');
const taskList = document.getElementById('task-list');

//CREATE (Créer une tâche)
addTaskButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if(taskText !== '') {
        const task = {
            id: Date.now(), // Identifiant unique
            text: taskText,
            completed: false
        };
        tasks.push(task);
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
            <span class="task-text">${task.text}</span>
            <button class="button-modif" onclick="editTask(${task.id})">✏️</button>
            <button class="btn" onclick="deleteTask(${task.id})">🗑️</button>
            
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