import { Todo } from '../todos/models/todo';

const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending',
}

const state = {
    todos: [],
    filter: Filters.All,
}

const initStore = () => {
    loadStore();
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;
    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

const gerTodo = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos]
        case Filters.Completed:
            return [...state.todos.filter(todo => todo.done)]
        case Filters.Pending:
            return [...state.todos.filter(todo => !todo.done)]
        default:
            throw new Error(`${filter} is not valid`);
    }
}

const countPending = () => {
    const pending = gerTodo(Filters.Pending);
    return pending.length === 0 ? 0 : pending.length;
}

/**
 * 
 * @param {Todo} todo clase tarea y sus propiedades
 */
const addTodo = (description) => {
    if (!description) throw new Error('Todo not found');

    state.todos.push(new Todo(description));
    saveStateToLocalStorage();
}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map((todo) => {
        if (todoId === todo.id) {
            todo.done = !todo.done;
        }
        return todo;
    })
    saveStateToLocalStorage();
}
/**
 * 
 * @param {Todo} todo clase tarea y sus propiedades
 */
const deleteTodo = (id) => {
    state.todos = state.todos.filter(todo => todo.id !== id);
    saveStateToLocalStorage();
}

const deletComplete = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}
/**
 * 
 * @param {*} newFilter enumeracion de filtros disponibles para las tareas
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore,
    loadStore,
    gerTodo,
    addTodo,
    toggleTodo,
    deleteTodo,
    deletComplete,
    setFilter,
    getCurrentFilter,
    countPending,
    Filters
};