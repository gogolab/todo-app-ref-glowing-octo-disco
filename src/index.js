import { renderTodos } from "./views";
import { setFilters } from "./filters";
import { createTodo, saveTodos } from "./todos";

renderTodos();

document.querySelector("#filter-todos").addEventListener("input", event => {
    setFilters({
        searchText: event.target.value
    });
    renderTodos();
});

document
    .querySelector("#hideCompleted")
    .addEventListener("change", function(e) {
        e.preventDefault();

        console.log(e.target);

        setFilters({
            hideCompleted: e.target.checked
        });

        renderTodos();
    });

document.querySelector("#addTodo").addEventListener("submit", event => {
    event.preventDefault();

    const text = event.target.elements.addTodo__text.value.trim();

    if (text.length === 0) {
        return;
    }

    createTodo(text);

    event.target.elements.addTodo__text.value = "";

    saveTodos();
    renderTodos();
});
