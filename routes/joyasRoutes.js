const express = require('express');
const { obtenerJoyas, filtrarJoyas } = require('../controllers/joyasController');
const router = express.Router();

router.get('/', obtenerJoyas);
router.get('/filtros', filtrarJoyas);

module.exports = router;
