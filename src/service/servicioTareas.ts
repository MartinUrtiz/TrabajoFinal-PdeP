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
    }