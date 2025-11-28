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
}