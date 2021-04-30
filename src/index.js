// Importamos los estilos CSS
import './styles.css';
// Importamos las clases a utilizar
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

export const todoList = new TodoList();

// Reconstruccion del arreglo de Todos en el HTML
todoList.todos.forEach(crearTodoHtml);
// todoList.todos.forEach( todo => crearTodoHtml( todo ) );


// Reconstruccion de instancias de Todos (Al pasar un objeto x el stringify no se almacenan los metodos)
const newTodo = new Todo('aprender javascript');

console.log( 'todos', todoList.todos );


