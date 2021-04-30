import { Todo } from "../classes";
import { todoList } from "../index";

// Referencia HTML de la <ul> padre
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

// Creamos una funcion para insertar el html <li> de cada tarea a traves de la concatenacion de string
export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
	</li> `;

    const div = document.createElement('div'); // Creamos un div como elemento padre 
    div.innerHTML = htmlTodo; // insertaremos el append <li>

    divTodoList.append( div.firstElementChild ); // Metodo para mostrar unicamente el hijo del elemento

    return div.firstElementChilds;
}

// Eventos
// --------------------------    Ingresar un nuevo TODO
// Cuando el usuario suelta la tecla se dispara la funcion, el arg. event muestra la tecla presionada
txtInput.addEventListener('keyup', ( event ) => {
    // Ciclo condicional de tecla enter para evitar valores vacios y cargar el txt en su interior
    if ( event.keyCode === 13 && txtInput.value.length > 0 ) {

        console.log(txtInput.value);
        const nuevoTodo = new Todo( txtInput.value ); // Genero instancia de Todo con el nuevo input
        todoList.nuevoTodo( nuevoTodo ); // Llamo al metodo nuevoTodo para que haga push

        crearTodoHtml ( nuevoTodo ); // Llamo el metodo creartodohtml e imprimo una nueva tarea en
                                     // el <ul>
        txtInput.value = ''; // Limpio el string del input
    }

});

// --------------------------    Cambiar estado del Todo
// Cuando el usuario hace click se dispara la funcion. El arg. event muestra donde hizo click
divTodoList.addEventListener('click', (event) => {
    // Referencia que muestra en que parte del <li> hizo click
    const nombreElemento = event.target.localName; // Input / Label / Button
    // Referencia que me trae el elemento padre para destruirlo cuando aprete la cruz (<li>)
    const todoElemento   = event.target.parentElement.parentElement;
    // Referencia que muestra el ID en el HTML del To-do en cuestion
    const todoId         = todoElemento.getAttribute('data-id');
    
    if ( nombreElemento.includes('input') ){// Significa que hizo click en el checkbox
        todoList.marcarCompletado( todoId ); // Cambia el estado a traves del metodo del todo-list 
        todoElemento.classList.toggle('completed'); // Cambia el estado de la clase del HTML (raya)
    } else if ( nombreElemento.includes('button') ){ // Si nE incluye boton, hay que borrar el todo

        todoList.eliminarTodo( todoId ); // Con esto eliminamos el todo del arreglo
        divTodoList.removeChild( todoElemento ); // Con esto lo eliminamos del html
    }; 

});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    for( let i = divTodoList.children.length-1; i >= 0; i-- ) {

        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild( elemento );
        }

    }

});

// --------------------------    Filtrar completados y pendientes
// Cuando el usuario hace click se dispara la funcion. El arg. event muestra donde hizo click
ulFiltros.addEventListener('click', (event) => {
    // Referencia que muestra en que parte del <li> hizo click
    const filtro = event.target.text;
    // Ciclo para retornar vacio si la referencia no trae elementos
    if( !filtro ){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    // Ciclo para mostrar o esconder el elemento del CSS .hidden
    for( const elemento of divTodoList.children ){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ){

            case 'Pendientes': 
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;
            
            case 'Completados': 
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }

    }

})