export type EstadoTarea = 'pendiente' | 'en curso' | 'terminada' | 'cancelada';

export type CriterioOrden = 'titulo' | 'vencimiento' | 'creacion' | 'dificultad';

export interface ITarea {
    id: string;
    titulo: string;
    descripcion: string;
    estado: EstadoTarea;
    fechaCreacion: Date;
    ultimaEdicion: Date;
    vencimiento: Date | null;
    dificultad: number;
    activo: boolean; // Para soft delete
}