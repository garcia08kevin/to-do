import { Todo } from "../models/todo";
import { createTodoHTML } from "./index";

let element;

/**
 * 
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) => {
    if(!element){
        element = document.querySelector(elementId);
    }
    if(!element) throw new Error(`Element ${element} not found`)
    element.innerHTML = '';
    todos.forEach(todo => {
        element.append(createTodoHTML(todo));
    });
}