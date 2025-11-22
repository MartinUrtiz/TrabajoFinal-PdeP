//a cambiar
import { v4 as uuidv4 } from 'uuid';

export class Tarea{
    public id: string;
    public titulo: string;
    public descripcion: string;
    public estado: 'pendiente' | 'en curso' | 'terminada' | 'cancelada';
    public fechaCreacion: Date;
    public vencimiento: Date | null;
    public dificultad: number;
    public eliminada: boolean;
    public ultimaEdicion: Date | null;

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
        this.vencimiento = vencimiento;
        this.dificultad = dificultad;
        this.eliminada = false;
        this.ultimaEdicion = null;
    }

    public obtenerDetalles(): string{
        const titulo = this.titulo;
        const descripcion = this.descripcion.trim() === "" ? "Sin descripción" : this.descripcion;
        const estado = this.estado;
        const dificultad = this.dificultad;
        const fechaCreacion = this.fechaCreacion.toLocaleDateString();
        const vencimiento = this.vencimiento ? this.vencimiento.toLocaleString() : "Sin datos";
        const ultimaEdicion = this.ultimaEdicion ? this.ultimaEdicion.toLocaleString() : "Nunca fue editada";

    return (
    `Título: ${titulo}
    Descripción: ${descripcion}
    Estado: ${estado}
    Dificultad: ${dificultad}
    Creada: ${fechaCreacion}
    Vencimiento: ${vencimiento}
    Última edición: ${ultimaEdicion}`
    );

    }

    public editar(datos:{
        titulo?:string;
        descripcion?:string;
        estado?: 'pendiente' | 'en curso' | 'terminada' | 'cancelada';
        dificultad?: number;
        vencimiento?: Date | null;
    }): void {
        if(datos.titulo !== undefined){
            this.titulo = datos.titulo;
        }

        if(datos.descripcion !== undefined){
            this.descripcion = datos.descripcion;
        }

        if(datos.estado !== undefined){
            this.estado = datos.estado;
        }

        if(datos.dificultad !== undefined){
            this.dificultad = datos.dificultad;
        }

        if(datos.vencimiento !== undefined){
            this.vencimiento = datos.vencimiento;
        }

        this.ultimaEdicion = new Date()
    }
}