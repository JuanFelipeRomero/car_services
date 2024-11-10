require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const handlebars = require('express-handlebars');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Crear una instancia de la aplicación Express
const app = express('jsonwebtoken');

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

// Ruta para registrar un cliente ************************************************************
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

// Ruta para iniciar sesion ***********************************************************
app.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  console.log('Datos recibidos en el backend:', req.body);
  try {
    // Asegúrate de que los valores recibidos no sean undefined
    console.log('Correo recibido:', correo);
    console.log('Contraseña recibida:', contrasena);

    // Buscar usuario por el correo, utilizando "$1" para parametrizar la consulta
    const usuarioQuery = 'SELECT * FROM usuarios WHERE correo = $1';
    const usuarioResult = await pool.query(usuarioQuery, [correo]);

    if (usuarioResult.rows.length === 0) {
      return res.status(400).send('Correo o contraseña incorrectos');
    }

    // Información del usuario obtenida
    const usuario = usuarioResult.rows[0];

    // Asegúrate de que el hash de la contraseña no sea undefined
    console.log('Contraseña hasheada en la base de datos:', usuario.contrasena);

    if (!usuario.contrasena) {
      return res
        .status(500)
        .send('Contraseña no encontrada en la base de datos');
    }

    // Verificar la contraseña ingresada por el usuario
    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );

    if (!contrasenaValida) {
      return res.status(400).send('Correo o contraseña incorrectos');
    }

    // Generar el token JWT si las credenciales son válidas
    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      },
      process.env.JWT_SECRET, // La clave secreta para firmar el token
      { expiresIn: '1h' } // Nota: corregido `expires` a `expiresIn`
    );

    // Enviar el token y algunos datos básicos del usuario
    res.json({
      token,
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).send('Error en el servidor al intentar iniciar sesión');
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
