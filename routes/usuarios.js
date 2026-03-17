const router = require('express').Router();
const Usuario = require('../models/Usuario');

// // Inicializar usuarios por defecto si no existen
// async function inicializarUsuarios() {
//   const count = await Usuario.countDocuments();
//   if (count === 0) {
//     await Usuario.insertMany([
//       { usuario: 'admin', password: '1234', rol: 'admin' },
//       { usuario: 'profe', password: '1234', rol: 'profesor' },
//       { usuario: 'estudiante', password: '1234', rol: 'estudiante' }
//     ]);
//     console.log('✅ Usuarios por defecto creados');
//   }
// }
// inicializarUsuarios();

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const user = await Usuario.findOne({ usuario, password });
    if (user) {
      res.json({ ok: true, rol: user.rol, usuario: user.usuario });
    } else {
      res.json({ ok: false, mensaje: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    res.status(500).json({ ok: false, mensaje: 'Error en el servidor' });
  }
});

// OBTENER TODOS
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-password');
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
});

// CREAR
router.post('/', async (req, res) => {
  try {
    const nuevo = new Usuario(req.body);
    await nuevo.save();
    res.json({ ok: true, mensaje: 'Usuario creado' });
  } catch (err) {
    res.status(400).json({ ok: false, mensaje: 'Error al crear usuario' });
  }
});

// EDITAR
router.put('/:id', async (req, res) => {
  try {
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.json({ ok: true, mensaje: 'Usuario actualizado' });
  } catch (err) {
    res.status(400).json({ ok: false, mensaje: 'Error al actualizar' });
  }
});

// ELIMINAR
router.delete('/:id', async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.json({ ok: true, mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(400).json({ ok: false, mensaje: 'Error al eliminar' });
  }
});

module.exports = router;
