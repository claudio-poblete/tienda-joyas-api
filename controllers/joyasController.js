const pool = require('../db/pool');

const obtenerJoyas = async (req, res, next) => {
  try {
    const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;
    const [campo, direccion] = order_by.split('_');
    const offset = (page - 1) * limits;

    const consulta = `SELECT * FROM inventario ORDER BY ${campo} ${direccion} LIMIT $1 OFFSET $2;`;
    const { rows } = await pool.query(consulta, [limits, offset]);

    const enlaces = {
      self: `/joyas?limits=${limits}&page=${page}&order_by=${order_by}`,
      next: `/joyas?limits=${limits}&page=${parseInt(page) + 1}&order_by=${order_by}`,
      prev: `/joyas?limits=${limits}&page=${parseInt(page) - 1}&order_by=${order_by}`,
    };

    res.json({ joyas: rows, enlaces });
  } catch (error) {
    next(error);
  }
};

const filtrarJoyas = async (req, res, next) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;

    const consulta = `
      SELECT * FROM inventario
      WHERE (precio >= $1 OR $1 IS NULL)
      AND (precio <= $2 OR $2 IS NULL)
      AND (categoria = $3 OR $3 IS NULL)
      AND (metal = $4 OR $4 IS NULL);
    `;
    const valores = [precio_min || null, precio_max || null, categoria || null, metal || null];

    const { rows } = await pool.query(consulta, valores);
    res.json(rows);
  } catch (error) {
    next(error);
  }
};

module.exports = { obtenerJoyas, filtrarJoyas };
