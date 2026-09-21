require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando' });
});

// Carga automáticamente todos los archivos de la carpeta de rutas (routes)
// y los publica con y sin el prefijo /api (ej: /api/clientes y /clientes)
const carpetaRutas = ['routes', 'rutas']
  .map((nombre) => path.join(__dirname, nombre))
  .find((ruta) => fs.existsSync(ruta));

if (carpetaRutas) {
  fs.readdirSync(carpetaRutas)
    .filter((archivo) => archivo.endsWith('.js'))
    .forEach((archivo) => {
      const router = require(path.join(carpetaRutas, archivo));
      app.use('/api', router);
      app.use('/', router);
      console.log('Rutas cargadas:', archivo);
    });
} else {
  console.error('No se encontró la carpeta de rutas');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log('Servidor en puerto ' + PORT));
