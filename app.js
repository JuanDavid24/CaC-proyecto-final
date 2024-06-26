const express = require ('express');
const app = express();
const path = require ('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const { initSession } = require('./src/middlewares/session');

// Import routes
const mainRoutes = require ('./src/routes/mainRoutes');
const shopRoutes = require ('./src/routes/shopRoutes');
const adminRoutes = require('./src/routes/adminRoutes')
const authRoutes = require('./src/routes/authRoutes')

const PORT = 4000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

/* Para traducir los body que llegan a json: */
app.use(express.urlencoded());
app.use(express.json());

app.use(methodOverride('_method'));  //sobrescribir métodos para usar PUT y PATCH en los form
app.use(express.static('public'));  //servidor estático
app.use('/ext/toasty', express.static(__dirname + '/node_modules/egalink-toasty.js/dist'));

// Crear sesion de usuario
app.use(initSession());

// flash messages
app.use(flash());

app.use('/', mainRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));