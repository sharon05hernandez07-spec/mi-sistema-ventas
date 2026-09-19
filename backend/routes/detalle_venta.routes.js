const express = require('express');
const router = express.Router();
const conexion = require('../config/db');

// GET - Obtener todos los detalles
router.get('/detalle_venta', (req, res) => {
    const sql = `
        SELECT
            dv.id_detalle,
            dv.id_venta,
            dv.id_producto,
            dv.cantidad,
            dv.precio_unitario,
            dv.subtotal
        FROM detalle_venta dv
    `;

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al obtener los detalles'
            });
        }

        res.json(resultados);
    });
});

// GET - Obtener un detalle por ID
router.get('/detalle_venta/:id', (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT *
        FROM detalle_venta
        WHERE id_detalle = ?
    `;

    conexion.query(sql, [id], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al obtener el detalle'
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                error: 'Detalle no encontrado'
            });
        }

        res.json(resultado[0]);
    });
});

// POST - Crear un detalle
router.post('/detalle_venta', (req, res) => {
    const {
        id_venta,
        id_producto,
        cantidad,
        precio_unitario,
        subtotal
    } = req.body;

    const sql = `
        INSERT INTO detalle_venta
        (id_venta, id_producto, cantidad, precio_unitario, subtotal)
        VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [id_venta, id_producto, cantidad, precio_unitario, subtotal],
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al crear el detalle'
                });
            }

            res.status(201).json({
                mensaje: 'Detalle creado correctamente',
                id_detalle: resultado.insertId
            });
        }
    );
});

// PUT - Actualizar un detalle
router.put('/detalle_venta/:id', (req, res) => {
    const { id } = req.params;

    const {
        id_venta,
        id_producto,
        cantidad,
        precio_unitario,
        subtotal
    } = req.body;

    const sql = `
        UPDATE detalle_venta
        SET id_venta = ?,
            id_producto = ?,
            cantidad = ?,
            precio_unitario = ?,
            subtotal = ?
        WHERE id_detalle = ?
    `;

    conexion.query(
        sql,
        [
            id_venta,
            id_producto,
            cantidad,
            precio_unitario,
            subtotal,
            id
        ],
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al actualizar el detalle'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Detalle no encontrado'
                });
            }

            res.json({
                mensaje: 'Detalle actualizado correctamente'
            });
        }
    );
});

// DELETE - Eliminar un detalle
router.delete('/detalle_venta/:id', (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM detalle_venta
        WHERE id_detalle = ?
    `;

    conexion.query(sql, [id], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al eliminar el detalle'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Detalle no encontrado'
            });
        }

        res.json({
            mensaje: 'Detalle eliminado correctamente'
        });
    });
});

module.exports = router;