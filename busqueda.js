const fs = require('fs').promises;
const path = require('path');

class Busqueda {
    #indice = [];

    constructor(directorioBase = './archivos') {
        this.directorioBase = directorioBase;
    }

    async buscar(consulta, directorioBase = null) {
        if (directorioBase) {
            this.directorioBase = directorioBase;
        }
        try {
            //Valida que el directorio exista
            try {
                const stats = await fs.stat(this.directorioBase);
                if (!stats.isDirectory()) {
                    console.log('❌ La ruta no es un directorio');
                    return;
                }
            } catch (error) {
                console.log('❌ Directorio no encontrado');
                return;
            }

            //Leer contenido del directorio
            const archivos = await fs.readdir(this.directorioBase);

            //Construir indice
            const indice = await this.#construirIndice(archivos);

            //Implementar Busqueda
            const tokensEncontrados = Object.keys(indice).filter(token => token.toLowerCase().includes(consulta.toLowerCase()));

            const archivosEncontrados = new Set();
            tokensEncontrados.forEach(token => {
                indice[token].forEach(archivo => archivosEncontrados.add(archivo));
            });

            const resultados = Array.from(archivosEncontrados);

            //Mostrar resultados
            console.log(`Resultados de la busqueda de la palabra "${consulta}": ${resultados.length}`);
            console.log(resultados);

            //Guardar indice en archivo JSON
            const rutaIndice = path.join(this.directorioBase, `busqueda-${consulta}.json`);
            await fs.writeFile(rutaIndice, JSON.stringify(resultados, null, 2));
            console.log(`✅ Búsqueda guardada en ${rutaIndice}`);
        } catch (error) {
            console.log('❌ Error buscando archivos:', error.message);
        }
    }

    async #construirIndice(archivos) {
        let indice = {};
        for (const archivo of archivos) {
            const rutaArchivo = path.join(this.directorioBase, archivo);
            try {
                const stats = await fs.stat(rutaArchivo);
                if (stats.isDirectory()) continue;

                const contenido = await fs.readFile(rutaArchivo, 'utf8');
                //Tokenizar el contenido
                const tokens = contenido.split(/\s+/);

                //Construir indice
                tokens.forEach(token => {
                    if (!indice[token]) {
                        indice[token] = [];
                    }
                    if (!indice[token].includes(archivo)) {
                        indice[token].push(archivo);
                    }
                });
            } catch (err) {
                console.log('❌ Error construyendo indice:', err.message);
            }
        }
        return indice;
    }

}

module.exports = Busqueda;