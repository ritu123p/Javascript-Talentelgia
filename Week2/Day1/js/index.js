const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

const saveLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

const addTodo = () => {
    const inputText = inputBox.value.trim();
    if (inputText.length < 3) {
        alert("Add at least 3 characters");
        return false;
    }

    if (addBtn.value === "Edit") {
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML, inputText);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    } else {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        // Edit button
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
    }
};

const updateTodo = (eventObj) => {
    if (eventObj.target.innerHTML === "Remove") {
        deleteLocalTodos(eventObj.target.parentElement);
        todoList.removeChild(eventObj.target.parentElement);
    }
    if (eventObj.target.innerHTML === "Edit") {
        inputBox.value = eventObj.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = eventObj;
    }
};

const getLocalTodos = () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(todo => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = todo;
        li.appendChild(p);

        
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    });
};


const deleteLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);

    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
};

const editLocalTodos = (oldTodo, newTodo) => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    let todoIndex = todos.indexOf(oldTodo);

    if (todoIndex !== -1) {
        todos[todoIndex] = newTodo;
        localStorage.setItem("todos", JSON.stringify(todos));
    }
};

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);


