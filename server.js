const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas conectado');

    // Rutas — solo se cargan DESPUÉS de conectar
    app.use('/api/usuarios', require('./routes/usuarios'));
    app.use('/api/notas', require('./routes/notas'));

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error('❌ Error al conectar:', err.message));