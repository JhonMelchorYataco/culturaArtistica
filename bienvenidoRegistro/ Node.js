const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', { useNewUrlParser: true, useUnifiedTopology: true });

// Definir un esquema para el modelo de usuario
const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    correo: String,
    edad: Number,
    contrasena: String
});

// Crear el modelo de usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Middleware para analizar los cuerpos de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para manejar el registro de usuarios
app.post('/registrar', (req, res) => {
    const nuevoUsuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        edad: req.body.edad,
        contrasena: req.body.contrasena
    });

    nuevoUsuario.save((err) => {
        if (err) {
            res.send('Error al registrar el usuario.');
        } else {
            res.send('Usuario registrado exitosamente.');
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
