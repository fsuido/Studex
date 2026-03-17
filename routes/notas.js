const router = require('express').Router();
const Nota = require('../models/Nota');

// OBTENER TODAS
router.get('/', async (req, res) => {
  try {
    const notas = await Nota.find();
    res.json(notas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener notas' });
  }
});

// OBTENER POR ESTUDIANTE
router.get('/estudiante/:nombre', async (req, res) => {
  try {
    const notas = await Nota.find({ estudiante: req.params.nombre });
    res.json(notas);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener notas' });
  }
});

// CREAR
router.post('/', async (req, res) => {
  try {
    const nueva = new Nota(req.body);
    await nueva.save();
    res.json({ ok: true, mensaje: 'Nota guardada' });
  } catch (err) {
    res.status(400).json({ ok: false, mensaje: 'Error al guardar nota' });
  }
});

// EDITAR
router.put('/:id', async (req, res) => {
  try {
    await Nota.findByIdAndUpdate(req.params.id, req.body);
    res.json({ ok: true, mensaje: 'Nota actualizada' });
  } catch (err) {
    res.status(400).json({ ok: false, mensaje: 'Error al actualizar' });
  }
});

// ELIMINAR
router.delete('/:id', async (req, res) => {
  try {
    await Nota.findByIdAndDelete(req.params.id);
    res.json({ ok: true, mensaje: 'Nota eliminada' });
  } catch (err) {
    res.status(400).json({ ok: false, mensaje: 'Error al eliminar' });
  }
});

module.exports = router;
