
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');
const emptyMessage = document.getElementById('empty-message');

let todos = [];
let nextId = 1;

function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';

        if (todo.completed) {
            li.classList.add('completed');
        }

        const span = document.createElement('span');
        span.textContent = todo.text;

        const completeButton = document.createElement('button');
        completeButton.textContent = todo.completed ? 'Visszaállítás' : 'Kész';
        completeButton.className = 'complete-button';

        completeButton.addEventListener('click', () => {
            todo.completed = !todo.completed;
            renderTodos();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Törlés';
        deleteButton.className = 'delete-button';

        deleteButton.addEventListener('click', () => {
            todos = todos.filter(item => item.id !== todo.id);
            renderTodos();
        });

        li.append(span, completeButton, deleteButton);
        todoList.appendChild(li);
    });

    emptyMessage.hidden = todos.length > 0;
}

form.addEventListener('submit', event => {
    event.preventDefault();

    const text = input.value.trim();

    if (!text) {
        errorMessage.textContent = 'A feladat megadása kötelező!';
        return;
    }

    errorMessage.textContent = '';

    todos.push({
        id: nextId++,
        text,
        completed: false
    });

    input.value = '';
    renderTodos();
});

renderTodos();
