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

async function eliminarTareaController() {
    const id = await leerEntrada('Ingresa el ID de la tarea a eliminar: ');
    const tarea = servicio.buscarPorId(id);
    if (tarea) {
        // Usamos el método de la clase (OOP)
        tarea.eliminar();
        console.log(' Tarea eliminada correctamente (Soft Delete).');
        console.log('   (Puedes recuperarla editando el archivo JSON si fue un error)');
    } else {
        console.log(' Tarea no encontrada o ya eliminada.');
    }
  }
 async function verEstadisticasController() { 
    console.log(' --- REPORTES Y ESTADÍSTICAS ---');
    const stats = servicio.obtenerEstadisticas();
    
    console.log(`Total de Tareas Activas: ${stats.total}`);
    
    console.log('\n--- Por Estado ---');
    console.table(stats.porEstado);
    
    console.log('\n--- Por Dificultad ---');
    console.table(stats.porDificultad);
     }
      