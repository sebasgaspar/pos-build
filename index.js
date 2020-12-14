const express = require('express');
const path = require('path');
require('dotenv').config();
let port = process.env.PORT || 3000

// App de Express
const app = express();

// //Lectura y parseo del body
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.use('/api/pos', require('./routes/pos'));

app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log('Qubit-parking en funcionamiento', port);

});