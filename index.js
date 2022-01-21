const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//conexion a DB


// Conexión a Base de datos
//const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ncdk5.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.tvjct.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
        
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))


// import routes
const authRoutes = require('./routes/auth');
const validaToken = require('./routes/verificar_token');
const admin = require('./routes/admin');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/admin', validaToken,admin);

// import routes
const dashboadRoutes = require('./routes/admin');
const verifyToken = require('./routes/verificar_token');

// route middlewares
app.use('/api/dashboard', verifyToken, dashboadRoutes);



// route middlewares
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})