import * as fs from "fs";

export class FileSystem {

    static leerJSON(ruta: string): any[] {
        try {
            if (!fs.existsSync(ruta)) {
                return [];
            }

            const contenido = fs.readFileSync(ruta, "utf8");

            if (!contenido.trim()) return [];

            return JSON.parse(contenido);
        } catch (error) {
            console.error("Error leyendo JSON:", error);
            return [];
        }
    }

    // Guarda cualquier dato como JSON con formato
    static guardarJSON(ruta: string, data: any): void {
        try {
            const json = JSON.stringify(data, null, 2);
            fs.writeFileSync(ruta, json, "utf8");
        } catch (error) {
            console.error("Error guardando JSON:", error);
        }
    }
}
