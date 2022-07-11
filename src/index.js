import './styles.css';

import { Todo, TodoList } from './classes'; // Busca index.js por defecto si no se le indica archivo
import { crearTodoHtml } from './js/componentes';
// import { Todo } from './classes/todo.class';
// import { TodoList } from './classes/todo-list.class';

export const todoList = new TodoList();

// const tarea = new Todo('Aprender JavaScript');
// todoList.nuevoTodo(tarea);

// const tarea2 = new Todo('Comprar un unicornio');
// todoList.nuevoTodo(tarea2);

// console.log(todoList);

// crearTodoHtml(tarea);


// localStorage.setItem('mi-key', 'ABC1234');
// sessionStorage.setItem('mi-key', 'ABC1234');


// setTimeout(() => {
//     localStorage.removeItem('mi-key');
// }, 1500);

todoList.todos.forEach(todo => {
    crearTodoHtml(todo);
});
// todoList.todos.forEach( crearTodoHtml ); // Misma manera simplificada, solo con un argumento

// const newTodo = new Todo('Aprender Javascript');
// todoList.nuevoTodo(newTodo);

console.log('todos', todoList.todos);