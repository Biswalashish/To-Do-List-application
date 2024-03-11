  document.addEventListener('DOMContentLoaded', function () {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Function to add a new task
    function addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <button class="delete-btn fa-solid fa-trash"></button>
        `;
        taskList.appendChild(taskItem);
        // Start the reminder timer for the new task
        startReminderTimer(taskItem);
    }

    // Function to start the reminder timer for a task
    function startReminderTimer(taskItem) {
        setTimeout(() => {
            const checkbox = taskItem.querySelector('input[type="checkbox"]');
            if (!checkbox.checked) {
                alert('Please complete your task!');
                // Restart the reminder timer if the task is still not completed
                startReminderTimer(taskItem);
            }
        }, 1 * 60 * 1000); // 5 minutes in milliseconds
    }

    // Event listener for adding a task
    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        } else {
            alert('Please enter a task!');
        }
    });

    // Event listener for handling task completion and deletion
    taskList.addEventListener('click', function (event) {
        const target = event.target;
        if (target.matches('input[type="checkbox"]')) {
            const taskText = target.nextElementSibling;
            if (target.checked) {
                taskText.style.textDecoration = 'line-through';
            } else {
                taskText.style.textDecoration = 'none';
            }
        } else if (target.matches('.delete-btn')) {
            const taskItem = target.parentElement;
            taskList.removeChild(taskItem);
        }
    });
});
