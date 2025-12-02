### Ejercicio: Extiende el sistema de procesamiento de archivos agregando: 
- un módulo de backup que crea copias de seguridad automáticas, 
- un sistema de búsqueda que indexa el contenido de los archivos, y 
- un comando de línea que permita procesar archivos desde la terminal.

## Puesta en marcha

No se requiere instalación de dependencias.

La aplicación se ejecuta a través de comandos de `node`.

### Comandos disponibles

*   `node command.js demo`: Muestra una demostración del sistema de archivos.
*   `node command.js contar <rutaEntrada>`: Procesa y cuenta las estadísticas de un archivo de texto.
*   `node command.js mayusculas <rutaEntrada> <rutaSalida>`: Convierte el contenido de un archivo a mayúsculas.
*   `node command.js copiar-streams <rutaOrigen> <rutaDestino>`: Copia un archivo usando streams.
*   `node command.js mover-a-errores <rutaArchivo> <mensajeError>`: Mueve un archivo a la carpeta de errores.
*   `node command.js procesar-dir <rutaDirectorio>`: Procesa todos los archivos en un directorio.
*   `node command.js buscar <consulta> [rutaDirectorio]`: Busca una palabra en los archivos.
*   `node command.js respaldar <rutaDirectorioBase>`: Crea un respaldo de un directorio.