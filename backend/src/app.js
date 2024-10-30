const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const myconnection = require('express-myconnection');
const session = require('express-session');
const handlebars = require('express-handlebars');

// Crear una instancia de la aplicación Express
const app = express();

// Configuración de la base de datos
const dbOptions = {
    host: 'localhost',      // Conectado localmente a XAMPP
    user: 'root',           // Usuario predeterminado de XAMPP para MySQL
    password: '',           // Contraseña vacía, a menos que hayas cambiado la contraseña de root
    database: 'CarServices' // Nombre de la base de datos que acabas de crear
};

// Configurar la conexión a la base de datos con `express-myconnection`
app.use(myconnection(mysql, dbOptions, 'single'));

// Configurar el middleware body-parser para analizar los cuerpos de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar express-session para manejar sesiones de usuario (si deseas usarlas)
app.use(session({
    secret: 'tu_secreto',
    resave: false,
    saveUninitialized: true
}));

// Configurar Handlebars como motor de plantillas (opcional si planeas renderizar vistas en el servidor)
app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

// Ruta principal para verificar si el servidor funciona
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Definir una ruta para registrar información personal
app.post('/register/personal-info', (req, res) => {
    // Recibir datos del formulario
    const { nombre, apellido, email, telefono, direccion, ciudad, pais } = req.body;

    // Obtener la conexión a la base de datos
    req.getConnection((err, connection) => {
        if (err) {
            console.error('Error al conectar a la base de datos:', err);
            res.status(500).send('Error al conectar a la base de datos');
            return;
        }

        // Ejecutar consulta para insertar el registro
        const query = `INSERT INTO clientes (nombre, correo, numeroTelefono) VALUES (?, ?, ?)`;
        connection.query(query, [nombre, email, telefono], (err, results) => {
            if (err) {
                console.error('Error al registrar cliente:', err);
                res.status(500).send('Error al registrar cliente');
                return;
            }
            res.send('Cliente registrado exitosamente');
        });
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});