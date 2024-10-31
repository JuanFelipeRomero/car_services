const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');  // Cambiado a 'mysql2'
const myconnection = require('express-myconnection');
const session = require('express-session');
const handlebars = require('express-handlebars');

// Crear una instancia de la aplicación Express
const app = express();

// Configuración de la base de datos en Railway
const dbOptions = {
    host: 'junction.proxy.rlwy.net',
    user: 'root',
    password: 'cEOQyguIDcKfGqNiEchbKZDQtdJJONvW',
    port: 43819,
    database: 'railway'
};

// Configurar la conexión a la base de datos con `express-myconnection`
app.use(myconnection(mysql, dbOptions, 'single'));

// Configurar el middleware body-parser para analizar los cuerpos de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar express-session para manejar sesiones de usuario
app.use(session({
    secret: 'tu_secreto',
    resave: false,
    saveUninitialized: true
}));

// Configurar Handlebars como motor de plantillas
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

// Ruta principal para verificar si el servidor funciona
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Definir una ruta para registrar información personal y el vehículo
app.post('/register/personal-info', (req, res) => {
    // Recibir datos del formulario
    const { nombre, apellido, email, telefono, placa, marca, modelo, tipo } = req.body;

    // Obtener la conexión a la base de datos
    req.getConnection((err, connection) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            res.status(500).send('Error al conectar a la base de datos');
            return;
        }

        // Iniciar una transacción para asegurar consistencia
        connection.beginTransaction((err) => {
            if (err) {
                console.error('Error al iniciar la transacción:', err);
                res.status(500).send('Error al iniciar la transacción');
                return;
            }

            // Primero registrar el cliente
            const clienteQuery = `INSERT INTO clientes (nombre, correo, numeroTelefono) VALUES (?, ?, ?)`;
            connection.query(clienteQuery, [nombre, email, telefono], (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        // Manejar el error cuando el correo ya está registrado
                        res.status(400).send('El correo ya está registrado');
                    } else {
                        console.error('Error al registrar cliente:', err);
                        res.status(500).send('Error al registrar cliente');
                    }
                    // Revertir la transacción si hubo un error al insertar el cliente
                    return connection.rollback(() => {});
                }

                // Obtener el ID del cliente recién insertado
                const clienteId = result.insertId;

                // Registrar el vehículo asociado al cliente
                const vehiculoQuery = `INSERT INTO vehiculo (placa, marca, modelo, tipo, cliente_id) VALUES (?, ?, ?, ?, ?)`;
                connection.query(vehiculoQuery, [placa, marca, modelo, tipo, clienteId], (err, result) => {
                    if (err) {
                        if (err.code === 'ER_DUP_ENTRY') {
                            // Manejar el error cuando la placa ya está registrada
                            res.status(400).send('La placa del vehículo ya está registrada');
                        } else {
                            console.error('Error al registrar vehículo:', err);
                            res.status(500).send('Error al registrar vehículo');
                        }
                        // Revertir la transacción si hubo un error al insertar el vehículo
                        return connection.rollback(() => {});
                    }

                    // Confirmar la transacción si ambos registros fueron exitosos
                    connection.commit((err) => {
                        if (err) {
                            console.error('Error al confirmar la transacción:', err);
                            // Revertir la transacción si hubo un error al confirmar
                            return connection.rollback(() => {
                                res.status(500).send('Error al confirmar la transacción');
                            });
                        }
                        res.send('Cliente y vehículo registrados exitosamente');
                    });
                });
            });
        });
    });
});

app.use(session({
    secret: 'tu_secreto',
    resave: false,
    saveUninitialized: true
}));

// Rutas existentes
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.post('/register/personal-info', (req, res) => {
    // Aquí está el código de la ruta POST para registrar personal-info
});

// === Nueva Ruta GET para Ver Información del Cliente ===
app.get('/profile', (req, res) => {
    // Verificar si el cliente está autenticado y tiene sesión abierta
    if (!req.session || !req.session.clienteId) {
        return res.status(401).send('No has iniciado sesión');
    }

    const clienteId = req.session.clienteId;

    // Obtener la conexión a la base de datos
    req.getConnection((err, connection) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            res.status(500).send('Error al conectar a la base de datos');
            return;
        }

        // Consultar la información del cliente basado en el id de la sesión
        const query = 'SELECT nombre, correo, numeroTelefono FROM clientes WHERE id = ?';
        connection.query(query, [clienteId], (err, results) => {
            if (err) {
                console.error('Error al obtener la información del cliente:', err);
                res.status(500).send('Error al obtener la información del cliente');
                return;
            }

            if (results.length === 0) {
                return res.status(404).send('Cliente no encontrado');
            }

            // Enviar la información del cliente al frontend
            res.json(results[0]);
        });
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});