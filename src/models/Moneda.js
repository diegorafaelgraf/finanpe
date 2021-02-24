const {Schema, model} = require('mongoose');

const MonedaSchema = new Schema({    
    nombre_moneda: {
        type: String,
        unique: true,
        required: true
    },
    simbolo: {
        type: String,
        unique: true,        
        required: true
    },
    cotizacion:{
        type: Number,
        required: true
    }
},{
    timestamps: true
});

module.exports = model('Moneda', MonedaSchema);