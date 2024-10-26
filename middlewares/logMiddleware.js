const logMiddleware = (req, res, next) => {
  console.log(`Ruta consultada: ${req.method} ${req.url}`);
  next();
};

module.exports = logMiddleware;
