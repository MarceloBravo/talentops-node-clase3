const { demostrarSistemaArchivos } = require('./procesador-archivos');


// Ejecutar demostración
demostrarSistemaArchivos().catch(error => {
    console.error('❌ Error en la demostración:', error.message);
});
