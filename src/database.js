const mongoose = require('mongoose');

const { HOST, DATABASE } = process.env;
const URI = `mongodb://${HOST}/${DATABASE}`;

console.log(URI);

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(db => console.log('Conectado a la Base de Datos')).catch(err => console.log(err));