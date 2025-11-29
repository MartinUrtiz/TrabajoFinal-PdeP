import * as fs from 'fs/promises';
import { Tarea } from '../models/tarea';


export class RepositorioTareas {
    private archivo: string;

    constructor(archivo: string = 'tareas.json') {
        this.archivo = archivo;
    }

// Carga tareas del archivo y las convierte en Objetos Tarea
    async cargarTodas(): Promise<Tarea[]> {
        try {
            const datos = await fs.readFile(this.archivo, 'utf-8');
            const listaCruda = JSON.parse(datos);
            return listaCruda.map((t: any) => Tarea.fromJSON(t));
        } catch (error) {
            return [];
        }
    }

    // Guarda el array actual en el archivo
    async guardarTodas(tareas: Tarea[]): Promise<void> {
        const datos = JSON.stringify(tareas, null, 2);
        await fs.writeFile(this.archivo, datos, 'utf-8');
    }
}