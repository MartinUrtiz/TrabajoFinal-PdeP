import * as fs from 'fs/promises';
import { Tarea } from '../models/tarea';


export class RepositorioTareas {
    private archivo: string;

    constructor(archivo: string = 'tareas.json') {
        this.archivo = archivo;
    }
}