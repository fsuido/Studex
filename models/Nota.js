const mongoose = require('mongoose');

const NotaSchema = new mongoose.Schema({
  estudiante: { type: String, required: true },
  materia: { type: String, required: true },
  nota: { type: Number, required: true, min: 0, max: 5 }
});

module.exports = mongoose.model('Nota', NotaSchema);
