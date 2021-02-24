const { Schema, model} = require('mongoose');

const TipoCuentaSchema = new Schema({
    nombre_tipo_cuenta: {
        type: String,
        unique: true,
        required: true        
    }    
},
{
    timestamps: true
});

module.exports = model('TipoCuenta', TipoCuentaSchema);