require('dotenv').config();
const mongoose = require('mongoose');
const Usuario = require('./models/Usuario');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Usuario.deleteMany({});
  await Usuario.insertMany([
    { usuario: 'admin', password: '1234', rol: 'admin' },
    { usuario: 'profe', password: '1234', rol: 'profesor' },
    { usuario: 'estudiante', password: '1234', rol: 'estudiante' }
  ]);
  console.log('✅ Usuarios creados');
  process.exit();
}).catch(e => console.log('❌ Error:', e.message));