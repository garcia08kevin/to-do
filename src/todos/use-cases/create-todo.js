import { Todo } from "../models/todo";

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = ({done, description, id}) => {
    if (!description) throw new Error('no se envio un toDo');

    const html = `
    <div class="view">
        <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
        <label>${description}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    `

    const todoLi = document.createElement('li');
    todoLi.setAttribute('data-id', id);
    (done) ? todoLi.classList.add('completed') : null;
    todoLi.innerHTML = html;
    return todoLi;
}