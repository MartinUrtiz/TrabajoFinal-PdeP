import { Tarea } from "../models/tarea";

const RUTA_DB = "./src/database/tareas.json";

export class ServicioTareas {
    private tareas: Tarea[] = [];

    constructor(tareasIniciales: Tarea[] = []) {
        this.tareas = tareasIniciales;
    }

    public crearTarea(
        titulo: string,
        descripcion: string,
        estado: "pendiente" | "en curso" | "terminada" | "cancelada",
        vencimiento: Date | null,
        dificultad: number
    ): Tarea {
        const nueva = new Tarea(titulo, descripcion, vencimiento, dificultad);
        nueva.estado = estado;
        return nueva;
    }

    public buscarPorId(id: string): Tarea[]{
    }

    public eliminarTarea(id: string): boolean {

        return true;
    }

    public listarTareas(): Tarea[] {
    }

    public obtenerActivas(): Tarea[] {
        return this.tareas.filter(t => t.activo);
    }

    public ordenarPor(criterio: CriterioOrden): Tarea[] {
        const copia = [...this.obtenerActivas()]; // Inmutabilidad
        
        // Diccionario de funciones comparadoras
        const comparadores: Record<CriterioOrden, (a: Tarea, b: Tarea) => number> = {
            titulo: (a, b) => a.titulo.localeCompare(b.titulo),
            dificultad: (a, b) => b.dificultad - a.dificultad, // Mayor a menor
            creacion: (a, b) => a.fechaCreacion.getTime() - b.fechaCreacion.getTime(),
            vencimiento: (a, b) => {
                if (!a.vencimiento) return 1;
                if (!b.vencimiento) return -1;
                return a.vencimiento.getTime() - b.vencimiento.getTime();
            }
        };

        return copia.sort(comparadores[criterio]);
    }

public obtenerEstadisticas() {
        // Solo contamos las tareas activas 
        const activas = this.obtenerActivas();
        const total = activas.length;
        // 1. Conteo por Estado usando Reduce
        const porEstado = activas.reduce((acumulador, tarea) => {
            const estado = tarea.estado;
            // Si ya existe la clave, suma 1, sino inicializa en 1
            acumulador[estado] = (acumulador[estado] || 0) + 1;
            return acumulador;
        }, {} as Record<string, number>); 
// 2. Conteo por Dificultad usando 
        const porDificultad = activas.reduce((acumulador, tarea) => {
            const nivel = `Nivel ${tarea.dificultad}`; // Ej: "Nivel 1"
            acumulador[nivel] = (acumulador[nivel] || 0) + 1;
            return acumulador;
        }, {} as Record<string, number>);

        return { 
            total, 
            porEstado, 
            porDificultad 
        };
    }