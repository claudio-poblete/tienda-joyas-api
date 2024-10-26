const manejarErrores = (error, req, res, next) => {
  console.error(`Error: ${error.message}`);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
};

module.exports = { manejarErrores };
