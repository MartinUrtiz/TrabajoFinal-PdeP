import { Tarea } from "../models/tarea";
import { CriterioOrden } from '../types/tiposTarea';


export class ServicioTareas {
    private tareas: Tarea[] = [];

    constructor(tareasIniciales: Tarea[] = []) {
        this.tareas = tareasIniciales;
    }

    public obtenerTodas(): Tarea[] {
        return this.tareas;
    }

    public agregarTarea(tarea: Tarea): void {
        this.tareas.push(tarea);
    }

    public obtenerActivas(): Tarea[] {
        return this.tareas.filter(t => t.activo);
    }

public obtenerEstadisticas() {
        // Solo contamos las tareas activas 
        const activas = this.obtenerActivas();
        const total = activas.length;
        
        const porEstado = activas.reduce((acumulador, tarea) => {
            const estado = tarea.estado;
            // Si ya existe la clave, suma 1, sino inicializa en 1
            acumulador[estado] = (acumulador[estado] || 0) + 1;
            return acumulador;
        }, {} as Record<string, number>); 

        const porDificultad = activas.reduce((acumulador, tarea) => {
            const nivel = `Nivel ${tarea.dificultad}`; 
            acumulador[nivel] = (acumulador[nivel] || 0) + 1;
            return acumulador;
        }, {} as Record<string, number>);

        return { 
            total, 
            porEstado, 
            porDificultad 
        };
    }

    public obtenerVencidas(): Tarea[] {
        const hoy = new Date();
        return this.obtenerActivas().filter(t => 
            t.vencimiento !== null && 
            t.vencimiento < hoy && 
            t.estado !== 'terminada'
        );
    }

    public obtenerPrioridadAlta(): Tarea[] {
        // Asumimos que Dificultad 3 es "Alta Prioridad"
        return this.obtenerActivas().filter(t => 
            t.dificultad === 3 && 
            t.estado !== 'terminada'
        );
    }

    public obtenerRelacionadas(tareaBase: Tarea): Tarea[] {
        const palabrasClave = tareaBase.titulo.split(' ').filter(p => p.length > 3);
        return this.obtenerActivas().filter(t => 
            t.id !== tareaBase.id && 
            palabrasClave.some(palabra => t.titulo.includes(palabra))
        );
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

}