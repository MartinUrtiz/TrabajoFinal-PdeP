import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

export function leerEntrada(pregunta: string): Promise<string> {
    return new Promise(resolve => rl.question(pregunta, (ans) => resolve(ans.trim())));
}

export function pausa(): Promise<string> {
    return leerEntrada('\nPresiona ENTER para continuar...');
}