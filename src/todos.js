let todos = [];

const loadTodos = () => {
    const localTodos = localStorage.getItem("todos");

    try {
        return localTodos ? JSON.parse(localTodos) : [];
    } catch (e) {
        return [];
    }
};

const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
    return todos;
};

const createTodo = text => {
    console.log(text);
};

const removeTodo = id => {
    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
};

const toggleTodo = id => {
    const foundTodo = todos.find(todo => todo.id === id);

    if (foundTodo) {
        foundTodo.completed = !foundTodo.completed;
    }
};

todos = loadTodos();

export { getTodos, removeTodo, createTodo, toggleTodo, saveTodos, loadTodos };
