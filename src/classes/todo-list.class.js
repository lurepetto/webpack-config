
import { Todo } from './todo.class'

export class TodoList {

    constructor() { // Creamos un arreglo vacio donde se almacenaran los todos
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ) { // Con este metodo agregaremos los nuevos todos al arreglo de arriba
        this.todos.push( todo );
        this.guardarLocalStorage();
    }
    
    eliminarTodo( id ) { // Con esto eliminaremos todos segun ID
        
        this.todos = this.todos.filter( todo => todo.id != id )
        this.guardarLocalStorage();

    }

    marcarCompletado( id ) { // Con esto cambiaremos el estado de los todos (Completados o por hacer)
        
        for ( const todo of this.todos ) { // Recorremos el arreglo de todos

            if( todo.id == id ) { // Pedimos que el id del todo del array sea igual al id entrante

                todo.completado = !todo.completado; //Le cambiamos el estado al todo
                this.guardarLocalStorage();
                break;
            }

        }


    }

    eliminarCompletados( ) { // Con este metodo eliminaremos todos los todos con estado completados

        this.todos = this.todos.filter( todo => !todo.completado )
        this.guardarLocalStorage();

    }

    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify( this.todos ) );

    }

    cargarLocalStorage(){

        this.todos = ( localStorage.getItem( 'todo' ) )
                      ? JSON.parse( localStorage.getItem('todo') ) 
                      : [] ; 

        // if( localStorage.getItem( 'todo' ) ) {
            
        //     this.todos = JSON.parse( localStorage.getItem('todo') );
        //     console.log('cargarLocal:', this.todos);

        // } else {
        //     this.todos = [];
        // }

        this.todos = this.todos.map( obj => Todo.fromJson( obj ) );

    }
}