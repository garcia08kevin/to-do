
import html from './app.html?raw'
import store from '../store/todo.store'
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases/index';

const ElementIds = {
    TodoList: '.todo-list',
    NewTodoInput: '.new-todo',
    CleanCompleted: '.clear-completed',
    PendingCount: '#pending-count',
    Filters: '.filter',
}

export const App = (elementId) => {

    const displayTodos = (filter = todoStore.getCurrentFilter()) => {
        const todos = store.gerTodo(filter);
        const pendingCountStrong = document.querySelector(ElementIds.PendingCount);
        pendingCountStrong.innerText = todoStore.countPending();
        renderTodos(ElementIds.TodoList, todos);
    }
    //Cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    const newDescriptionInput = document.querySelector(ElementIds.NewTodoInput);
    const todoListUL = document.querySelector(ElementIds.TodoList);
    const cleanCompletedButton = document.querySelector(ElementIds.CleanCompleted);
    const [all, pending, completed] = document.querySelectorAll(ElementIds.Filters);

    newDescriptionInput.addEventListener('keyup', (event) => {
        if (event.target.value.trim().length === 0) return;
        if (event.code === 'Enter') {
            store.addTodo(event.target.value);
            event.target.value = '';
            displayTodos();
        }
    });

    todoListUL.addEventListener('click', ({ target }) => {
        const { dataset } = target.closest('[data-id]');
        store.toggleTodo(dataset.id);
        if (target.localName === 'button') {
            store.deleteTodo(dataset.id);
        }
        displayTodos();
    });

    cleanCompletedButton.addEventListener('click', () => {
        console.log('borrar');
        store.deletComplete();
        displayTodos();
    });

    const selectedFilter = (element, filterSelected) => {
        const filters = document.querySelectorAll('.filterClick');
        filters.forEach(filter => {
            filter.classList.remove('selected');
        });
        const [children] = element.children;
        children.classList.add('selected');
        store.setFilter(filterSelected);
        displayTodos(filterSelected);

    }

    all.addEventListener('click', () => selectedFilter(all, store.Filters.All));

    pending.addEventListener('click', () => selectedFilter(pending, store.Filters.Pending));

    completed.addEventListener('click', () => selectedFilter(completed, store.Filters.Completed));

}