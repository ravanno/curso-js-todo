import { Todo } from '../classes';
import { todoList } from '../index';

// Referencias en el HTML
const divTodoList = document.querySelector('ul.todo-list');
const txtInput = document.querySelector('input.new-todo');
const borrarCompletados = document.querySelector('button.clear-completed');
const ulFiltros = document.querySelector('ul.filters');
const anchorFiltros = document.querySelectorAll('a.filtro');

export const crearTodoHtml = (todo) => {
    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox"${(todo.completado) ? ' checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild); // INSERTAR PRIMER HIJO
    // divTodoList.innerHTML += htmlTodo;

    return div.firstElementChild;
}

// Eventos
txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHtml(nuevoTodo);

        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');
    
    if (nombreElemento.includes('input')) { // Click en el check
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId);
        todoElemento.remove();
        // todoList.removeChild(todoElemento);
    }

    console.log(todoList);
});

borrarCompletados.addEventListener('click', (event) => {
    todoList.eliminarCompletados();

    // const completados = document.querySelectorAll('li.completed');
    // for (let completado of completados) {
    //     completado.remove();
    // }

    // MANERA WTF?
    for (let i = divTodoList.children.length-1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    console.log(event.target.text);
    const filtro = event.target.text;
    if (!filtro) { return; } 

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes': 
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados': 
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
  
    anchorFiltros.forEach((elem) => {
        elem.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    // for (const elemento of anchorFiltros) {
    //     elemento.classList.remove('selected');
    //     if (elemento.text == filtro) {
    //         elemento.classList.add('selected');
    //     }
    // }
});