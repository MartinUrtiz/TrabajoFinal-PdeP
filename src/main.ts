import * as readline from 'readline';
import { Tarea } from './models/tarea';
import { RepositorioTareas } from './data/repositorio';
import { ServicioTareas } from './services/servicioTareas';
import { CriterioOrden, EstadoTarea } from './types/tiposTarea';

const repositorio = new RepositorioTareas();
let servicio = new ServicioTareas;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

export function leerEntrada(pregunta: string): Promise<string> {
    return new Promise(resolve => rl.question(pregunta, (ans) => resolve(ans.trim())));
}

export function pausa(): Promise<string> {
    return leerEntrada('\nPresiona ENTER para continuar...');
}