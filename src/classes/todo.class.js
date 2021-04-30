
export class Todo { // Esta es la clase principal, y se hace el export porque se manejara afuera
    
    static fromJson({ id, tarea, completado, creado }){

        const tempTodo = new Todo( tarea );

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;

    }

    constructor( tarea ) { // Lo importante a recibir es la 'tarea' o la descripcion de la actividad

        this.tarea = tarea; // Recibimos la nueva instancia a traves del argumento ( tarea )

        this.id          = new Date().getTime(); // El ID de cada tarea sera la fecha con hora exacta
        this.completado  = false; // Booleano del estado de la actividad
        this.creado      = new Date(); // Fecha de creacion de la tarea

    }
}