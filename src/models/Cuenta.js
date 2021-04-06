const {Schema, model} = require('mongoose');

const CuentaSchema = new Schema({
    moneda: {
        type: Schema.ObjectId, 
        ref: "Moneda",
        required: true
    },
    tipo_cuenta: {
        type: Schema.ObjectId,
        ref: "TipoCuenta",
        required: true
    },
    saldo: {
        type: Number,
        required: true
    },
    cuenta_fisica_o_virtual: {
        type: String,
        required: true
    }
},
{
    timestamp: true
});

module.exports = model('Cuenta', CuentaSchema);