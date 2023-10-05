const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
//const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const morgan = require('morgan');

const providersRoutes = require('./routes/providers.routes');
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const productsRoutes = require('./routes/products.routes');
const orders = require('./routes/orders.routes');

//configuraciones
//app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser()); 
app.use(morgan('dev'));
app.use(verifyJWT)

//archivos estaticos
app.use('/', express.static(path.join(__dirname, '/public')));


//definir rutas
app.use(providersRoutes);
app.use(authRoutes);
app.use(usersRoutes);
app.use(productsRoutes);
app.use(orders);

//manejo de errores
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts('json')){
        res.json({ "error" : "404 Not found" });
    } else {
        res.type('txt').send('404 Not found');
    }
});

app.use(errorHandler);

app.listen(8080);
console.log("servidor Node.js en funcionamiento");
console.log("servidor en el puerto 8080");