import * as readline from 'readline';
import { Tarea } from './models/tarea';
import { RepositorioTareas } from './data/repositorio';
import { ServicioTareas } from './services/servicioTareas';
import { CriterioOrden, EstadoTarea } from './types/tiposTarea';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const repositorio = new RepositorioTareas();
let servicio: ServicioTareas;

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
    console.log(`${t.titulo} [${t.estado.toUpperCase()}]`);
    console.log(`Dificultad: ${estrellas}`);
    if (t.descripcion) console.log(`Desc: ${t.descripcion}`);
    console.log(`Creada: ${t.fechaCreacion.toLocaleString()}`);
    if (t.vencimiento) console.log(`Vence: ${t.vencimiento.toLocaleString()}`);
    console.log(`Editada: ${t.ultimaEdicion.toLocaleString()}`);
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
    console.log('Tarea creada.');
}

async function listarTareasController() {
    const activas = servicio.obtenerActivas();
    if (activas.length === 0) {
        console.log('No hay tareas activas.');
        return;
    }

    console.log('\nOrdenar por: 1.Titulo, 2.Vencimiento, 3.Creación, 4.Dificultad');
    const op = await leerEntrada('Opción: ');
    let criterio: CriterioOrden = 'creacion';
    
    if (op === '1') criterio = 'titulo';
    if (op === '2') criterio = 'vencimiento';
    if (op === '3') criterio = 'creacion';
    if (op === '4') criterio = 'dificultad';

    const tareasOrdenadas = servicio.ordenarPor(criterio);
    tareasOrdenadas.forEach(mostrarTarea);
}

async function cambiarEstadoController() {
    const id = await leerEntrada('ID de la tarea: ');
    const tarea = servicio.buscarPorId(id);

    if (!tarea) {
        console.log('Tarea no encontrada.');
        return;
    }

    console.log('Estados: pendiente, en curso, terminada, cancelada');
    const estado = await leerEntrada('Nuevo estado: ') as EstadoTarea;
    
    // Validación simple
    if (['pendiente', 'en curso', 'terminada', 'cancelada'].includes(estado)) {
        tarea.cambiarEstado(estado);
        console.log('Estado actualizado.');
    } else {
        console.log('Estado inválido.');
    }
}

async function eliminarTareaController() {
    const id = await leerEntrada('Ingresa el ID de la tarea a eliminar: ');
    const tarea = servicio.buscarPorId(id);
    if (tarea) {
        // Usamos el método de la clase (OOP)
        tarea.eliminar();
        console.log(' Tarea eliminada correctamente (Soft Delete).');
        console.log(' (Puedes recuperarla editando el archivo JSON si fue un error)');
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

async function consultasAvanzadasController() {
    console.log('\n --- CONSULTAS ---');
    console.log('1. Ver Vencidas');
    console.log('2. Ver Prioridad Alta (Difíciles y no terminadas)');
    const op = await leerEntrada('Opción: ');

    let resultado: Tarea[] = [];
    if (op === '1') resultado = servicio.obtenerVencidas();
    if (op === '2') resultado = servicio.obtenerPrioridadAlta();

    if (resultado.length > 0) {
        resultado.forEach(mostrarTarea);
    } else {
        console.log('No hay resultados.');
    }
}

async function main() {

    const datos = await repositorio.cargarTodas();
    servicio = new ServicioTareas(datos);

    let salir = false;

    while (!salir) {
        console.clear();
        console.log('\nSISTEMA DE TAREAS 2.0');
        console.log('1. Crear Tarea');
        console.log('2. Listar Tareas (Con ordenamiento)');
        console.log('3. Modificar Estado');
        console.log('4. Eliminar Tarea');
        console.log('5. Estadísticas');
        console.log('6. Consultas Avanzadas');
        console.log('7. Guardar y Salir');

        const opcion = await leerEntrada('Selecciona: ');

        try {
            switch (opcion) {
                case '1': await crearNuevaTarea(); break;
                case '2': await listarTareasController(); break;
                case '3': await cambiarEstadoController(); break;
                case '4': await eliminarTareaController(); break;
                case '5': await verEstadisticasController(); break;
                case '6': await consultasAvanzadasController(); break;
                case '7':
                    console.log('Guardando cambios...');
                    await repositorio.guardarTodas(servicio.obtenerTodas());
                    salir = true;
                    break;
                default: console.log('Opción no válida');
            }
        } catch (error) {
            console.error('Ocurrió un error:', error);
        }

        if (!salir) await pausa();
    }

    rl.close();
    console.log('¡Adiós!');
}

main();

