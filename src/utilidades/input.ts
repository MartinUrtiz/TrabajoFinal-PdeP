import * as readline from 'readline';

/**
 * Manejo de entrada/salida
 * Paradigma: Estructurada
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Leer entrada del usuario
 * Paradigma: Estructurada
 */
export function leerEntrada(pregunta: string): Promise<string> {
    return new Promise(resolve => rl.question(pregunta, (respuesta) => resolve(respuesta.trim())));
}

/**
 * Cerrar readline
 * Paradigma: Estructurada
 */
export function cerrar() {
    rl.close();
}
