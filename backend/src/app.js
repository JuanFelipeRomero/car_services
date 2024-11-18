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

`
console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
`;

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

    // Enviar el token con algunos datos básicos del usuario
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

// Ruta para consultar la información del cliente (perfil) ***********************************************************
app.get('/profile', async (req, res) => {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Separa la cadena y solo toma el token

  if (!token) {
    // Si no hay token, devolver un error 401 (No autorizado)
    return res
      .status(401)
      .json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Consulta para obtener solo la información del usuario
    const clienteQuery = `
      SELECT 
        nombre AS usuario_nombre,
        correo AS usuario_correo,
        numerotelefono AS usuario_telefono
      FROM usuarios
      WHERE id = $1
    `;
    const result = await pool.query(clienteQuery, [userId]);

    if (result.rows.length === 0) {
      // Si no se encuentra el usuario, devolver un error 404 (No encontrado)
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Devolver solo la información requerida del usuario
    res.json(result.rows[0]); // Utilizamos `result.rows[0]` para devolver un objeto en lugar de un array
  } catch (error) {
    console.error('Error al verificar el token o consultar el cliente:', error);
    res.status(403).json({ message: 'Token inválido o sesión expirada.' });
  }
});

//Ruta para consultar la informacion de los vehiculos de un cliente
app.get('/uservehicles', async (req, res) => {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers['authorization'];

  // Verificar si el token existe y tiene el formato correcto
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Acceso denegado. Formato de token inválido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Agregar log para depurar
    console.log('ID del usuario decodificado del token:', userId);

    // 1. Obtener el cliente_id correspondiente al userId
    const clienteQuery = `SELECT id FROM clientes WHERE usuarioID = $1`;
    const clienteResult = await pool.query(clienteQuery, [userId]);

    if (clienteResult.rows.length === 0) {
      // Si no hay un cliente correspondiente, devuelve un error 404
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    const clienteId = clienteResult.rows[0].id;

    // 2. Ahora buscar los vehículos con el cliente_id obtenido
    const vehiculosQuery = `
      SELECT * FROM vehiculos WHERE cliente_id = $1;
    `;
    const vehiculosResult = await pool.query(vehiculosQuery, [clienteId]);

    if (vehiculosResult.rows.length === 0) {
      // Si no se encuentran vehículos, devolver un error 404
      return res
        .status(404)
        .json({ message: 'No se encontraron vehículos para este cliente.' });
    }

    // 3. Devolver la información de los vehículos
    res.json(vehiculosResult.rows);
  } catch (error) {
    console.error('Error al verificar el token o consultar el cliente:', error);
    res.status(403).json({ message: 'Token inválido o sesión expirada.' });
  }
});

// Ruta para obtener todas las citas registradas en la base de datos
app.get('/citas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM citas');
    if (result.rows.length === 0) {
      res.status(200).json({ message: 'No hay citas registradas.' });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error('Error al obtener las citas:', err);
    res.status(500).json({ message: 'Error al obtener las citas.' });
  }
});

// Ruta para obtener toda la información de la tabla "papeles_polarizado"

app.get('/papeles-polarizado', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM papeles_polarizado');
    if (result.rows.length === 0) {
      res
        .status(200)
        .json({ message: 'No hay papeles polarizados registrados.' });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error('Error al obtener los papeles polarizados:', err);
    res
      .status(500)
      .json({ message: 'Error al obtener los papeles polarizados.' });
  }
});

// Ruta para obtener toda la información de la tabla "polarizados"
app.get('/polarizados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM polarizados');
    if (result.rows.length === 0) {
      res.status(200).json({ message: 'No hay registros de polarizados.' });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error('Error al obtener los polarizados:', err);
    res.status(500).json({ message: 'Error al obtener los polarizados.' });
  }
});

// Ruta para obtener toda la información de la tabla "servicios"
app.get('/servicios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servicios');
    if (result.rows.length === 0) {
      res.status(200).json({ message: 'No hay registros de servicios.' });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error('Error al obtener los servicios:', err);
    res.status(500).json({ message: 'Error al obtener los servicios.' });
  }
});

// Ruta para obtener toda la información de la tabla "zonas_polarizado"
app.get('/zonas_polarizado', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM zonas_polarizado');
    if (result.rows.length === 0) {
      res
        .status(200)
        .json({ message: 'No hay registros de zonas polarizado.' });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error('Error al obtener las zonas de polarizado:', err);
    res
      .status(500)
      .json({ message: 'Error al obtener las zonas de polarizado.' });
  }
});

// Ruta para guardar un polarizado en la tabla polarizados ******************************************
app.post('/guardar-polariado-servicio-cita', async (req, res) => {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Separa la cadena y solo toma el token

  if (!token) {
    return res.status(401).send('Token de acceso requerido');
  }

  let userId;

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.id;
  } catch (error) {
    return res.status(403).send('Token inválido o expirado');
  }

  // Datos de la solicitud
  let {
    // Datos para Polarizdos
    zona_id,
    papelpolarizado_id,
    opacidad,
    // Datos para servicios
    duracion,
    costoaproximado,
    // Datos para citas
    fecha,
    hora,
    estado,
    vehiculo_placa,
  } = req.body;

  console.log('Datos recibidos en el backend:', req.body);

  // Ajustar el formato de la fecha y hora antes de insertarlos en la base de datos

  // Ajustar la fecha para extraer solo la parte `YYYY-MM-DD`
  if (fecha && fecha.includes('T')) {
    fecha = fecha.split('T')[0];
  }

  // Asegurar que la hora tenga el formato `HH:MM:SS`
  if (hora && hora.length === 5) {
    hora += ':00';
  }

  try {
    // Iniciar transacción
    await pool.query('BEGIN');

    // Obtener el cliente_id correspondiente al userId
    const clienteQuery = `SELECT id FROM clientes WHERE usuarioID = $1`;
    const clienteResult = await pool.query(clienteQuery, [userId]);

    if (clienteResult.rows.length === 0) {
      // Si no se encuentra el cliente, devolver un error 404 (No encontrado)
      await pool.query('ROLLBACK');
      return res.status(404).json({ message: 'Cliente no encontrado.' });
    }

    const clienteId = clienteResult.rows[0].id;

    // Insertar datos en polarizados
    const polarizadosQuery = `
      INSERT INTO polarizados (zona_id, papelpolarizado_id, opacidad)
      VALUES ($1, $2, $3) RETURNING id
    `;

    const polarizadosResult = await pool.query(polarizadosQuery, [
      zona_id,
      papelpolarizado_id,
      opacidad,
    ]);

    const polarizado_id = polarizadosResult.rows[0].id;

    // Insertar datos en la tabla servicios usando "polarizaod_id"
    const serviciosQuery = `
      INSERT INTO servicios (duracion, costoaproximado, polarizado_id, aviso_id, radio_id, alarma_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;

    const serviciosResult = await pool.query(serviciosQuery, [
      duracion,
      costoaproximado,
      polarizado_id,
      null,
      null,
      null,
    ]);

    const servicio_id = serviciosResult.rows[0].id;

    // Insertar datos en la tabla citas con el id del cliente
    const citaQuery = `
      INSERT INTO citas (fecha, hora, servicio_id, estado, vehiculo_placa, cliente_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;

    await pool.query(citaQuery, [
      fecha,
      hora,
      servicio_id,
      'Activa',
      vehiculo_placa,
      clienteId, // Utilizamos el clienteId obtenido
    ]);

    // Confirmar la transacción si todos los pasos anteriores fueron exitosos
    await pool.query('COMMIT');
    res.send('Cita registrada exitosamente');
  } catch (error) {
    // Revertir la transacción en caso de error
    await pool.query('ROLLBACK');
    console.error('Error al registrar la cita:', error);
    res.status(500).send('Error al registrar la cita');
  }
});

// Ruta para obtener las citas del usuario autenticado
app.get('/api/citas/mis-citas', async (req, res) => {
  try {
    // Asumiendo que en la autenticación se obtiene un userId del token
    const userId = req.userId;

    // Consulta SQL para obtener las citas relacionadas con el cliente basado en el userId
    const citasQuery = `
      SELECT c.*
      FROM citas c
      INNER JOIN clientes cl ON cl.id = c.cliente_id
      INNER JOIN usuarios u ON u.id = cl.usuarioid
      WHERE u.id = $1
    `;

    // Ejecución de la consulta
    const result = await pool.query(citasQuery, [userId]);

    // Verificar si el usuario tiene citas
    if (result.rows.length === 0) {
      res.status(200).json({ message: 'No tienes citas programadas.' });
    } else {
      res.json(result.rows);
    }
  } catch (err) {
    console.error('Error al obtener las citas del usuario:', err);
    res
      .status(500)
      .json({ message: 'Error al obtener las citas del usuario.' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
