const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'profesor', 'estudiante'], required: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
