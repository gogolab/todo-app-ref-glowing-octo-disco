import { getTodos, toggleTodo, saveTodos, removeTodo } from "./todos";
import { getFilters } from "./filters";

const renderTodos = () => {
    const todos = getTodos();
    const filters = getFilters();

    const filteredTodos = todos.filter(todo => {
        const searchTextMatch = todo.text
            .toLowerCase()
            .includes(filters.searchText.toLowerCase());

        if (filters.hideCompleted) {
            return searchTextMatch && !todo.completed;
        }

        return searchTextMatch;
    });

    removeAllTodos();

    const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

    document
        .querySelector("#todos")
        .appendChild(generateSummaryDOM(incompleteTodos));

    if (filteredTodos.length > 0) {
        filteredTodos.forEach(todo => {
            document.querySelector("#todos").appendChild(generateTodoDOM(todo));
        });
    } else {
        const messageEl = document.createElement("p");
        messageEl.textContent = "No to-dos to show.";
        messageEl.classList.add("empty-message");
        document.querySelector("#todos").appendChild(messageEl);
    }
};

const removeAllTodos = () => {
    document.querySelector("#todos").innerHTML = "";
};

const generateTodoDOM = function(todo) {
    const todoEl = document.createElement("label");
    const containerEl = document.createElement("div");
    const title = document.createElement("span");
    const checkbox = document.createElement("input");
    const removeTodoBtn = document.createElement("button");

    todoEl.classList.add("todo");

    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = todo.completed;
    containerEl.appendChild(checkbox);
    checkbox.addEventListener("change", () => {
        toggleTodo(todo.id);
        saveTodos();
        renderTodos();
    });

    title.textContent = todo.text;
    containerEl.appendChild(title);

    todoEl.classList.add("list-item");
    containerEl.classList.add("list-item__container");
    todoEl.appendChild(containerEl);

    removeTodoBtn.textContent = "remove";
    removeTodoBtn.classList.add("button", "button--text");
    todoEl.appendChild(removeTodoBtn);
    removeTodoBtn.addEventListener("click", () => {
        removeTodo(todo.id);
        saveTodos();
        renderTodos();
    });

    return todoEl;
};

const generateSummaryDOM = filteredTodos => {
    const summary = document.createElement("p");
    const plural = filteredTodos.length === 1 ? "" : "s";

    summary.classList.add("list-title");
    summary.textContent = `You have ${
        filteredTodos.length
    } todo${plural} left.`;

    return summary;
};

export { renderTodos };
