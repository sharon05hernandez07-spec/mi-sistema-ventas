const express = require('express');
const router = express.Router();
const conexion = require('../config/db');

// GET - Obtener todos los clientes
router.get('/clientes', (req, res) => {
    const sql = 'SELECT * FROM clientes';

    conexion.query(sql, (error, resultados) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al obtener los clientes'
            });
        }

        res.json(resultados);
    });
});

// GET - Obtener un cliente por ID
router.get('/clientes/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM clientes WHERE id_cliente = ?';

    conexion.query(sql, [id], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al obtener el cliente'
            });
        }

        if (resultado.length === 0) {
            return res.status(404).json({
                error: 'Cliente no encontrado'
            });
        }

        res.json(resultado[0]);
    });
});

// POST - Crear un cliente
router.post('/clientes', (req, res) => {
    const { nomCliente, contacto, departamento, ciudad } = req.body;

    const sql = `
        INSERT INTO clientes
        (nomCliente, contacto, departamento, ciudad)
        VALUES (?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [nomCliente, contacto, departamento, ciudad],
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al crear el cliente'
                });
            }

            res.status(201).json({
                mensaje: 'Cliente creado correctamente',
                id_cliente: resultado.insertId
            });
        }
    );
});

// PUT - Actualizar un cliente
router.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nomCliente, contacto, departamento, ciudad } = req.body;

    const sql = `
        UPDATE clientes
        SET nomCliente = ?,
            contacto = ?,
            departamento = ?,
            ciudad = ?
        WHERE id_cliente = ?
    `;

    conexion.query(
        sql,
        [nomCliente, contacto, departamento, ciudad, id],
        (error, resultado) => {
            if (error) {
                console.error(error);
                return res.status(500).json({
                    error: 'Error al actualizar el cliente'
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    error: 'Cliente no encontrado'
                });
            }

            res.json({
                mensaje: 'Cliente actualizado correctamente'
            });
        }
    );
});

// DELETE - Eliminar un cliente
router.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM clientes WHERE id_cliente = ?';

    conexion.query(sql, [id], (error, resultado) => {
        if (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Error al eliminar el cliente'
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                error: 'Cliente no encontrado'
            });
        }

        res.json({
            mensaje: 'Cliente eliminado correctamente'
        });
    });
});

module.exports = router;