const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

class Backup {
    constructor(directorioBase = './archivos') {
        this.directorioBase = directorioBase;
    }

    async #leerDirectorio(directorioBase) {
        try {
            console.log(' Leyendo directorio...', directorioBase);
            const archivos = await fs.readdir(directorioBase);
            console.log(`${archivos.length} archivos encontrados`);
            return archivos;
        } catch (error) {
            console.log('❌ Error leyendo directorio:', error.message);
            return [];
        }
    }

    async #respaldarArchivos(archivo, directorioOrigen, nuevoDirectorio) {
        try {
            if (archivo === 'backup') return;
            const stats = await fs.stat(path.join(directorioOrigen, archivo));
            if (stats.isDirectory()) {
                console.log('Respaldando el directorio...', archivo, '-----------------------');
                const subDirectorioOrigen = path.join(directorioOrigen, archivo);
                const subDirectorioDestino = path.join(nuevoDirectorio, archivo);

                await fs.mkdir(subDirectorioDestino, { recursive: true });

                const subArchivos = await this.#leerDirectorio(subDirectorioOrigen);

                for (const subArchivo of subArchivos) {
                    await this.#respaldarArchivos(subArchivo, subDirectorioOrigen, subDirectorioDestino);
                }
                console.log('✅ Directorio respaldado:', archivo, '-----------------------');
            }
            if (stats.isFile()) {
                console.log('Respaldando el archivo...', archivo);
                const rutaOrigen = path.join(directorioOrigen, archivo);
                const rutaDestino = path.join(nuevoDirectorio, archivo);
                await fs.copyFile(rutaOrigen, rutaDestino);
                console.log('✅ Archivo respaldado:', archivo);
            }
        } catch (error) {
            console.log('❌ Error respaldando archivos:', error.message);
        }
    }

    async respaldar(directorioBase = null) {
        if (directorioBase) {
            this.directorioBase = directorioBase;
        }
        try {
            console.log('🚀 Iniciando respaldo...');
            const archivos = await this.#leerDirectorio(this.directorioBase);
            //Creando el directorio de destino de los archivos

            const nuevoDirectorio = path.join(this.directorioBase, 'backup');
            await fs.mkdir(nuevoDirectorio, { recursive: true });
            //Copiando los archivos

            for (const archivo of archivos) {
                //Valida que se trate de un directorio
                await this.#respaldarArchivos(archivo, this.directorioBase, nuevoDirectorio);
            }
            console.log('✅ Backup completado exitosamente');
        } catch (error) {
            console.log('❌ Error respaldando archivos:', error.message);
        }
    }
}

module.exports = Backup;