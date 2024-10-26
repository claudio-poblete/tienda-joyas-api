const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

app.use((req, res, next) => {
  console.log(`Ruta consultada: ${req.method} ${req.url}`);
  next();
});

const manejarErrores = (error, req, res, next) => {
  console.error(error);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
};

app.use(manejarErrores);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
