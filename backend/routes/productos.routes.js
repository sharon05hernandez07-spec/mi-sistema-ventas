const express = require('express');
const router = express.Router();
const conexion = require('../config/db');

// GET - Obtener todos los productos
router.get('/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al obtener los productos'
            });
        }

        res.json(resultados);
    });
});

// GET - Obtener un producto por ID
router.get('/productos/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM productos WHERE id_producto = ?';

    conexion.query(sql, [id], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al obtener el producto'
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        res.json(resultado[0]);
    });
});

// POST - Crear un producto
router.post('/productos', (req, res) => {
    const { nomProducto, cantidad, precio } = req.body;

    const sql = `
        INSERT INTO productos
        (nomProducto, cantidad, precio)
        VALUES (?, ?, ?)
    `;

    conexion.query(
        sql,
        [nomProducto, cantidad, precio],
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al crear el producto'
                });
            }

            res.status(201).json({
                mensaje: 'Producto creado correctamente',
                id_producto: resultado.insertId
            });
        }
    );
});

// PUT - Actualizar un producto
router.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nomProducto, cantidad, precio } = req.body;

    const sql = `
        UPDATE productos
        SET nomProducto = ?,
            cantidad = ?,
            precio = ?
        WHERE id_producto = ?
    `;

    conexion.query(
        sql,
        [nomProducto, cantidad, precio, id],
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al actualizar el producto'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Producto no encontrado'
                });
            }

            res.json({
                mensaje: 'Producto actualizado correctamente'
            });
        }
    );
});

// DELETE - Eliminar un producto
router.delete('/productos/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM productos WHERE id_producto = ?';

    conexion.query(sql, [id], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al eliminar el producto'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto eliminado correctamente'
        });
    });
});

module.exports = router;