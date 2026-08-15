const express = require('express');
const pool = require('./config/db');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.get('/db-test', async (req, res) => {

    try {

        const resultado = await pool.query('SELECT NOW()');

        res.json({
            mensaje: 'Conexión con PostgreSQL exitosa',
            fecha_servidor: resultado.rows[0].now
        });

    } catch (error) {

        console.error('Error de conexión:', error.message);

        res.status(500).json({
            mensaje: 'Error al conectar con PostgreSQL'
        });

    }

});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});