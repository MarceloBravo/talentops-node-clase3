const { ProcesadorArchivos, demostrarSistemaArchivos } = require('./procesador-archivos');
const Busqueda = require('./busqueda');
const Backup = require('./backup');

const operacion = process.argv[2];

let procesador;
if (['contar', 'mayusculas', 'copiar-streams', 'mover-a-errores', 'procesar-dir'].includes(operacion)) {
    procesador = new ProcesadorArchivos();
    procesador.inicializar();
}

switch (operacion) {
    case 'demo':
        demostrarSistemaArchivos();
        break;
    case 'contar': //params: rutaEntrada (obligatorio)
        if (!process.argv[3]) {
            console.log('❌ Error: Se requiere la ruta del archivo de entrada.');
            console.log('Uso: node command.js contar <rutaEntrada>');
            break;
        }
        procesador.procesarArchivoTexto(process.argv[3]);
        break;
    case 'mayusculas': //params: rutaEntrada y rutaSalida (obligatorios)
        if (!process.argv[3] || !process.argv[4]) {
            console.log('❌ Error: Se requieren la ruta de entrada y de salida.');
            console.log('Uso: node command.js mayusculas <rutaEntrada> <rutaSalida>');
            break;
        }
        procesador.convertirAMayusculas(process.argv[3], process.argv[4]);
        break;
    case 'copiar-streams': //params: rutaOrigen y rutaDestino (obligatorios)
        if (!process.argv[3] || !process.argv[4]) {
            console.log('❌ Error: Se requieren la ruta de origen y de destino.');
            console.log('Uso: node command.js copiar-streams <rutaOrigen> <rutaDestino>');
            break;
        }
        procesador.copiarArchivoStreams(process.argv[3], process.argv[4]);
        break;
    case 'mover-a-errores': //params: rutaArchivo y mensajeError (obligatorios)
        if (!process.argv[3] || !process.argv[4]) {
            console.log('❌ Error: Se requieren la ruta del archivo y un mensaje de error.');
            console.log('Uso: node command.js mover-a-errores <rutaArchivo> <mensajeError>');
            break;
        }
        procesador.moverAErrores(process.argv[3], process.argv[4]);
        break;
    case 'procesar-dir': //params: rutaDirectorio (obligatorio)
        if (!process.argv[3]) {
            console.log('❌ Error: Se requiere la ruta del directorio.');
            console.log('Uso: node command.js procesar-dir <rutaDirectorio>');
            break;
        }
        procesador.procesarDirectorio(process.argv[3]);
        break;
    case 'buscar':  //params: consulta (obligatorio), ruta (opcional). Ej.: node command.js buscar palabras ./demo-archivos
        if (!process.argv[3]) {
            console.log('❌ Error: Se requiere una consulta para la búsqueda.');
            console.log('Uso: node command.js buscar <consulta> [rutaDirectorio]');
            break;
        }
        const busqueda = new Busqueda();
        busqueda.buscar(process.argv[3], process.argv[4]);
        break;
    case 'respaldar': //params: rutaDirectorioBase (obligatorio)
        if (!process.argv[3]) {
            console.log('❌ Error: Se requiere la ruta del directorio a respaldar.');
            console.log('Uso: node command.js respaldar <rutaDirectorioBase>');
            break;
        }
        const backup = new Backup();
        const directorioBase = process.argv[3];
        backup.respaldar(directorioBase);
        break;
    default:
        console.log('❌ Operación no reconocida');
}