const express = require('express');
const router = express.Router();
const conexion = require('../config/db');

// GET - Obtener todas las ventas
router.get('/ventas', (req, res) => {
    const sql = 'SELECT * FROM ventas';

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al obtener las ventas'
            });
        }

        res.json(resultados);
    });
});

// GET - Obtener una venta por ID
router.get('/ventas/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM ventas WHERE id_venta = ?';

    conexion.query(sql, [id], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al obtener la venta'
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                error: 'Venta no encontrada'
            });
        }

        res.json(resultado[0]);
    });
});

// POST - Crear una venta
router.post('/ventas', (req, res) => {
    const { id_cliente, fecha_venta, total, estado } = req.body;

    const sql = `
        INSERT INTO ventas
        (id_cliente, fecha_venta, total, estado)
        VALUES (?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [id_cliente, fecha_venta, total, estado],
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al crear la venta'
                });
            }

            res.status(201).json({
                mensaje: 'Venta creada correctamente',
                id_venta: resultado.insertId
            });
        }
    );
});

// PUT - Actualizar una venta
router.put('/ventas/:id', (req, res) => {
    const { id } = req.params;
    const { id_cliente, fecha_venta, total, estado } = req.body;

    const sql = `
        UPDATE ventas
        SET id_cliente = ?,
            fecha_venta = ?,
            total = ?,
            estado = ?
        WHERE id_venta = ?
    `;

    conexion.query(
        sql,
        [id_cliente, fecha_venta, total, estado, id],
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al actualizar la venta'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Venta no encontrada'
                });
            }

            res.json({
                mensaje: 'Venta actualizada correctamente'
            });
        }
    );
});

// DELETE - Eliminar una venta
router.delete('/ventas/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM ventas WHERE id_venta = ?';

    conexion.query(sql, [id], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al eliminar la venta'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Venta no encontrada'
            });
        }

        res.json({
            mensaje: 'Venta eliminada correctamente'
        });
    });
});

module.exports = router;