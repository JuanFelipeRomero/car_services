require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
// Crear una instancia de la aplicación Express
const app = express();

//Habilitar cors para TODAS las solicitudes
app.use(cors());

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Configuración de la base de datos en Railway con SSL
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Configurar el middleware body-parser para analizar los cuerpos de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar express-session para manejar sesiones de usuario
app.use(
  session({
    secret: 'tu_secreto',
    resave: false,
    saveUninitialized: true,
  })
);

// Configurar Handlebars como motor de plantillas
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

// Ruta para registrar un cliente
app.post('/register/client', async (req, res) => {
  const {
    nombre,
    correo,
    contrasena,
    numeroTelefono,
    placa,
    marca,
    modelo,
    tipo,
  } = req.body;

  try {
    //Generar un salt para hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasena, saltRounds);

    // Iniciar transacción
    await pool.query('BEGIN');

    // Registrar el usuario en la tabla `usuarios`
    const usuarioQuery = `
      INSERT INTO usuarios (nombre, correo, contrasena, numeroTelefono) 
      VALUES ($1, $2, $3, $4) RETURNING id
    `;
    const usuarioResult = await pool.query(usuarioQuery, [
      nombre,
      correo,
      hashedPassword, //Guardar la contraseña hasheada en la DB
      numeroTelefono,
    ]);
    const usuarioId = usuarioResult.rows[0].id;

    // Registrar el cliente en la tabla `clientes` con el usuarioID
    const clienteQuery = `
      INSERT INTO clientes (usuarioID) 
      VALUES ($1) RETURNING id
    `;
    const clienteResult = await pool.query(clienteQuery, [usuarioId]);
    const clienteId = clienteResult.rows[0].id;

    // Registrar el vehículo en la tabla `vehiculo` con el cliente_id
    const vehiculoQuery = `
      INSERT INTO vehiculos (placa, marca, modelo, tipo, cliente_id) 
      VALUES ($1, $2, $3, $4, $5)
    `;
    await pool.query(vehiculoQuery, [placa, marca, modelo, tipo, clienteId]);

    // Confirmar la transacción si todos los pasos anteriores fueron exitosos
    await pool.query('COMMIT');
    res.send('Usuario, cliente y vehículo registrados exitosamente');
  } catch (error) {
    // Revertir la transacción en caso de error
    await pool.query('ROLLBACK');
    console.error('Error al registrar el cliente:', error);
    if (error.code === '23505') {
      res.status(400).send('El correo o la placa ya están registrados');
    } else {
      res.status(500).send('Error al registrar el cliente');
    }
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
