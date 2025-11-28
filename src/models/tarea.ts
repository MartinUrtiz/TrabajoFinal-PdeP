import { ITarea, EstadoTarea } from '../types/tiposTarea';
import { v4 as uuidv4 } from 'uuid';

export class Tarea implements ITarea{
    public id: string;
    public titulo: string;
    public descripcion: string;
    public estado: EstadoTarea;
    public readonly fechaCreacion: Date;
    public ultimaEdicion: Date;
    public vencimiento: Date | null;
    public dificultad: number;
    public activo: boolean; 

        constructor(
        titulo: string,
        descripcion = '',
        vencimiento: Date | null = null,
        dificultad = 1
    ) {
        this.id = uuidv4();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = 'pendiente';
        this.fechaCreacion = new Date();
        this.ultimaEdicion = new Date();
        this.vencimiento = vencimiento;
        this.dificultad = dificultad;
        this.activo = true; 
    }

    //Realiza un Soft Delete .
    public eliminar(): void {
        this.activo = false;
        this.actualizarFechaEdicion();
    }

    // Reactiva una tarea eliminada.
        public restaurar(): void {
        this.activo = true;
        this.actualizarFechaEdicion();
    }
    private actualizarFechaEdicion(): void {
        this.ultimaEdicion = new Date();
    }
}
