const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM productos WHERE activo = TRUE', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  db.query('INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)',
    [nombre, descripcion, precio], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId });
  });
});

router.get('/:id', (req, res) => {
  db.query('SELECT * FROM productos WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
});

router.put('/:id', (req, res) => {
  const { nombre, descripcion, precio } = req.body;
  db.query('UPDATE productos SET nombre=?, descripcion=?, precio=? WHERE id=?',
    [nombre, descripcion, precio, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.sendStatus(204);
  });
});

router.delete('/:id', (req, res) => {
  db.query('UPDATE productos SET activo = FALSE WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
});

module.exports = router;