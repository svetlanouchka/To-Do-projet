document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("popup-overlay");
    const openPopupButton = document.getElementById("button-create");
    const closePopupButton = document.getElementById("popup-close");
    const addTaskButton = document.getElementById("button-save");
    const taskList = document.getElementById("task-list");
    const taskDescription = document.getElementById("task-description");
    const taskCategory = document.getElementById("popup-task-category");
    const taskPriority = document.getElementById("popup-task-priority");

    const filterCategory = document.getElementById("category");
    const filterPriority = document.getElementById("priority");
    const filterButton = document.getElementById("button-validate");
    const resetButton = document.getElementById("button-init");

    // Variables pour le pop-up d'erreur
    const errorPopup = document.getElementById('error-popup');
    const errorPopupOverlay = document.getElementById('error-popup-overlay');
    const errorPopupClose = document.getElementById('error-popup-close');
    const errorMessage = document.getElementById('error-message');

    // Initialisation des données
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const categories = [
        { value: "Travail", label: "Travail" },
        { value: "Personnel", label: "Personnel" },
        { value: "Famille", label: "Famille" },
    ];

    const priorities = [
        { value: "1", label: "1 - Haute priorité" },
        { value: "2", label: "2 - Moyenne priorité" },
        { value: "3", label: "3 - Faible priorité" },
    ];

    // Remplir les listes déroulantes
    const populateSelect = (selectElement, options) => {
        selectElement.innerHTML =
            '<option value="">-- Toutes les options --</option>';
        options.forEach((option) => {
            const opt = document.createElement("option");
            opt.value = option.value;
            opt.textContent = option.label;
            selectElement.appendChild(opt);
        });
    };

    populateSelect(taskCategory, categories);
    populateSelect(taskPriority, priorities);
    populateSelect(filterCategory, categories);
    populateSelect(filterPriority, priorities);

    // Ouvrir le popup de création
    openPopupButton.addEventListener("click", () => {
        popup.style.display = "block";
        overlay.style.display = "block";
    });

    // Fermer le popup de création
    const closePopup = () => {
        popup.style.display = "none";
        overlay.style.display = "none";
    };

    // Écouteurs pour fermer le pop-up d'erreur
    errorPopupClose.addEventListener('click', hideError);
    errorPopupOverlay.addEventListener('click', hideError);

    closePopupButton.addEventListener("click", closePopup);
    overlay.addEventListener("click", closePopup);

    // Sauvegarder les tâches dans le localStorage
    const saveTasks = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Afficher les tâches
    const renderTasks = (tasksToRender = tasks) => {
        taskList.innerHTML = "";
        tasksToRender.forEach((task) => {
            const taskElement = document.createElement("li");
            taskElement.className = "task";
            taskElement.innerHTML = `
            <span class="task-text">${task.text}</span>
            <span class="task-category">${task.category}</span>
            <span class="task-priority">${task.priority}</span>
            <button class="button-modif" onclick="editTask(${task.id})">Modifier</button>
            <button class="button-delete" onclick="deleteTask(${task.id})">🗑️</button>
          `;
            taskList.appendChild(taskElement);
        });
    };

    // Fonction pour afficher le pop-up d'erreur
    function showError(message) {
        errorMessage.textContent = message;
        errorPopup.style.display = 'block';
        errorPopupOverlay.style.display = 'block';
    }

    // Fonction pour masquer le pop-up d'erreur
    function hideError() {
        errorPopup.style.display = 'none';
        errorPopupOverlay.style.display = 'none';
    }

    // Ajouter une tâche
    addTaskButton.addEventListener("click", () => {
        const description = taskDescription.value.trim();
        const category = taskCategory.value;
        const priority = taskPriority.value;

        if (description && category && priority) {
            const task = {
                id: Date.now(),
                text: description,
                category,
                priority,
            };
            tasks.push(task);
            saveTasks();
            renderTasks();
            taskDescription.value = "";
            taskCategory.value = "";
            taskPriority.value = "";
            closePopup();
        } else {
            showError("Veuillez remplir tous les champs avant d'ajouter une tâche");
            // alert("Veuillez remplir tous les champs avant d'ajouter une tâche.");
        }
    });

    // Modifier une tâche
    window.editTask = (taskId) => {
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        const editPopup = document.getElementById("edit-popup");
        const editOverlay = document.getElementById("edit-popup-overlay");
        const editDescription = document.getElementById("edit-popup-task");
        const editCategory = document.getElementById("edit-task-category");
        const editPriority = document.getElementById("edit-task-priority");
        const editSaveButton = document.getElementById("edit-popup-save");

        populateSelect(editCategory, categories);
        populateSelect(editPriority, priorities);

        editDescription.value = task.text;
        editCategory.value = task.category;
        editPriority.value = task.priority;

        editPopup.style.display = "block";
        editOverlay.style.display = "block";

        const closeEditPopup = () => {
            editPopup.style.display = "none";
            editOverlay.style.display = "none";
        };

        document
            .getElementById("edit-popup-close")
            .addEventListener("click", closeEditPopup);
        editOverlay.addEventListener("click", closeEditPopup);

        editSaveButton.onclick = () => {
            task.text = editDescription.value;
            task.category = editCategory.value;
            task.priority = editPriority.value;

            saveTasks();
            renderTasks();
            closeEditPopup();
        };
    };

    // Supprimer une tâche
    window.deleteTask = (taskId) => {
        tasks = tasks.filter((task) => task.id !== taskId);
        saveTasks();
        renderTasks();
    };



    // Filtrer les tâches
    const filterTasks = () => {
        const selectedCategory = filterCategory.value;
        const selectedPriority = filterPriority.value;

        const filteredTasks = tasks.filter((task) => {
            const categoryMatches =
                selectedCategory === "" || task.category === selectedCategory;
            const priorityMatches =
                selectedPriority === "" || task.priority === selectedPriority;
            return categoryMatches && priorityMatches;
        });

        renderTasks(filteredTasks);
    };

    filterButton.addEventListener("click", filterTasks);

    // Réinitialiser les filtres
    resetButton.addEventListener("click", () => {
        filterCategory.value = "";
        filterPriority.value = "";
        renderTasks();
    });

    // Afficher toutes les tâches au démarrage
    renderTasks();
});
