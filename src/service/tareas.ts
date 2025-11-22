import { Tarea } from "../models/tarea";
import { FileSystem } from "../utils/filesystem";

const RUTA_DB = "./src/database/tareas.json";

export class TareaService {

    private cargarTareas(): Tarea[] {
        const data = FileSystem.leerJSON(RUTA_DB);
        return data.map((t: any) => Object.assign(new Tarea("", ""), t));
    }

    private guardarTareas(tareas: Tarea[]): void {
        FileSystem.guardarJSON(RUTA_DB, tareas);
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

        const tareas = this.cargarTareas();
        tareas.push(nueva);
        this.guardarTareas(tareas);

        return nueva;
    }

    public buscarPorId(id: string): Tarea | null {
        const tareas = this.cargarTareas();
        return tareas.find(t => t.id === id) || null;
    }

    public eliminarTarea(id: string): boolean {
        const tareas = this.cargarTareas();
        const tarea = tareas.find(t => t.id === id);

        if (!tarea) return false;

        tarea.eliminada = true;
        this.guardarTareas(tareas);

        return true;
    }

    public listarTareas(): Tarea[] {
        return this.cargarTareas();
    }
}