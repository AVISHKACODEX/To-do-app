// ========================================
// TASK MANAGER APPLICATION
// ========================================

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const emptyState = document.getElementById('emptyState');
const clearAllBtn = document.getElementById('clearAllBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Stats Elements
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');

// Application State
let tasks = [];
let currentFilter = 'all';

// ========================================
// INITIALIZATION
// ========================================

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTasksFromStorage();
    renderTasks();
    updateStats();
    attachEventListeners();
});

// ========================================
// EVENT LISTENERS
// ========================================

function attachEventListeners() {
    // Add task on button click
    addTaskBtn.addEventListener('click', addTask);
    
    // Add task on Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Clear all tasks
    clearAllBtn.addEventListener('click', clearAllTasks);
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Set current filter
            currentFilter = btn.dataset.filter;
            // Render filtered tasks
            renderTasks();
        });
    });
}

// ========================================
// TASK OPERATIONS
// ========================================

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    // Validate input
    if (taskText === '') {
        taskInput.focus();
        return;
    }
    
    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    // Add to tasks array
    tasks.unshift(task); // Add to beginning of array
    
    // Clear input
    taskInput.value = '';
    taskInput.focus();
    
    // Save to localStorage
    saveTasksToStorage();
    
    // Re-render tasks
    renderTasks();
    updateStats();
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderTasks();
        updateStats();
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasksToStorage();
    renderTasks();
    updateStats();
}

// Edit task
function editTask(id) {
    const taskItem = document.querySelector(`[data-id="${id}"]`);
    const taskTextEl = taskItem.querySelector('.task-text');
    const taskActionsEl = taskItem.querySelector('.task-actions');
    const currentText = taskTextEl.textContent;
    
    // Create input for editing
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'task-edit-input';
    editInput.value = currentText;
    
    // Replace text with input
    taskTextEl.replaceWith(editInput);
    editInput.focus();
    editInput.select();
    
    // Replace action buttons
    taskActionsEl.innerHTML = `
        <button class="task-btn save-btn" onclick="saveTask(${id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </button>
        <button class="task-btn cancel-btn" onclick="cancelEdit(${id}, '${currentText.replace(/'/g, "\\'")}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;
}

// Save edited task
function saveTask(id) {
    const taskItem = document.querySelector(`[data-id="${id}"]`);
    const editInput = taskItem.querySelector('.task-edit-input');
    const newText = editInput.value.trim();
    
    if (newText === '') {
        editInput.focus();
        return;
    }
    
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.text = newText;
        saveTasksToStorage();
        renderTasks();
    }
}

// Cancel edit
function cancelEdit(id, originalText) {
    renderTasks();
}

// Clear all tasks
function clearAllTasks() {
    if (tasks.length === 0) return;
    
    if (confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
        tasks = [];
        saveTasksToStorage();
        renderTasks();
        updateStats();
    }
}

// ========================================
// RENDERING
// ========================================

// Render all tasks
function renderTasks() {
    // Clear current list
    taskList.innerHTML = '';
    
    // Filter tasks based on current filter
    const filteredTasks = getFilteredTasks();
    
    // Show/hide empty state
    if (filteredTasks.length === 0) {
        emptyState.classList.add('show');
        return;
    } else {
        emptyState.classList.remove('show');
    }
    
    // Render each task
    filteredTasks.forEach(task => {
        const taskItem = createTaskElement(task);
        taskList.appendChild(taskItem);
    });
}

// Create task HTML element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);
    
    li.innerHTML = `
        <div class="task-checkbox" onclick="toggleTask(${task.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        <div class="task-text-container">
            <div class="task-text">${escapeHtml(task.text)}</div>
        </div>
        <div class="task-actions">
            <button class="task-btn edit-btn" onclick="editTask(${task.id})" title="Edit task">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            </button>
            <button class="task-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete task">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                </svg>
            </button>
        </div>
    `;
    
    return li;
}

// ========================================
// FILTERING
// ========================================

// Get filtered tasks based on current filter
function getFilteredTasks() {
    switch (currentFilter) {
        case 'completed':
            return tasks.filter(task => task.completed);
        case 'pending':
            return tasks.filter(task => !task.completed);
        case 'all':
        default:
            return tasks;
    }
}

// ========================================
// STATISTICS
// ========================================

// Update statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
}

// ========================================
// LOCAL STORAGE
// ========================================

// Save tasks to localStorage
function saveTasksToStorage() {
    try {
        localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
    } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
    }
}

// Load tasks from localStorage
function loadTasksFromStorage() {
    try {
        const storedTasks = localStorage.getItem('taskflow_tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
    } catch (error) {
        console.error('Error loading tasks from localStorage:', error);
        tasks = [];
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Escape HTML to prevent XSS attacks
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========================================
// KEYBOARD SHORTCUTS (Optional Enhancement)
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus input
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        taskInput.focus();
    }
});
