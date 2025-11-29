import * as readline from 'readline';
import { Tarea } from './models/tarea';
import { RepositorioTareas } from './data/repositorio';
import { ServicioTareas } from './services/servicioTareas';
import { CriterioOrden, EstadoTarea } from './types/tiposTarea';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const repositorio = new RepositorioTareas();

function leerEntrada(pregunta: string): Promise<string> {
    return new Promise(resolve => rl.question(pregunta, (ans) => resolve(ans.trim())));
}

function pausa(): Promise<string> {
    return leerEntrada('\nPresiona ENTER para continuar...');
}

function mostrarTarea(t: Tarea) {
    const estrellas = '⭐'.repeat(t.dificultad);
    console.log(`--------------------------------------------------`);
    console.log(`ID: ${t.id}`);
    console.log(`📌 ${t.titulo} [${t.estado.toUpperCase()}]`);
    console.log(`📊 Dificultad: ${estrellas}`);
    if (t.descripcion) console.log(`📝 Desc: ${t.descripcion}`);
    console.log(`📅 Creada: ${t.fechaCreacion.toLocaleString()}`);
    if (t.vencimiento) console.log(`⏰ Vence: ${t.vencimiento.toLocaleString()}`);
    console.log(`✏️  Editada: ${t.ultimaEdicion.toLocaleString()}`);
}

async function crearNuevaTarea() {
    console.log('\n--- NUEVA TAREA ---');
    const titulo = await leerEntrada('Título: ');
    const desc = await leerEntrada('Descripción: ');
    const vencStr = await leerEntrada('Vencimiento (YYYY-MM-DD HH:MM): ');
    const difStr = await leerEntrada('Dificultad (1-3): ');

    const vencimiento = vencStr ? new Date(vencStr) : null;
    const dificultad = difStr ? parseInt(difStr) : 1;

    const nuevaTarea = new Tarea(titulo, desc, vencimiento, dificultad);
    servicio.agregarTarea(nuevaTarea);
    console.log('✅ Tarea creada.');
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
//bonus
    const completadas = stats.porEstado['terminada'] || 0;
    const porcentaje = stats.total > 0 ? ((completadas / stats.total) * 100).toFixed(1) : 0;
    console.log(`Progreso Global: ${porcentaje}% completado`);
}


