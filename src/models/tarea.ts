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
    }
}