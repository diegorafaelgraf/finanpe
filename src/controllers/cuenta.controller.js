const cuentaCtrl = {};

const Cuenta = require('../models/Cuenta');
const TipoCuenta = require('../models/TipoCuenta');
const Moneda = require('../models/Moneda');
const tipoCuentaCtrl = require('./tipocuenta.controller');

cuentaCtrl.renderCuentas = async (req, res) => {
    const cuenta = await Cuenta.find().lean();
    res.render('cuenta/cuenta_all.hbs', { cuenta });
}

cuentaCtrl.renderAgregarCuentaForm = async (req, res) => {
    const tipocuenta = await TipoCuenta.find().lean();
    const moneda = await Moneda.find().lean();
    res.render('cuenta/cuenta_add', {tipocuenta, moneda});
}

cuentaCtrl.agregarCuenta = async (req, res) => {
    const { tipocuenta, moneda } = req.body;
    const errors = [];
    if(tipocuenta == ''){
        errors.push({text: 'El tipo de cuenta es requerido'});
    }
    if(moneda == ''){
        errors.push({text: 'La moneda es requerida'});
    }
    if(errors.length > 0){
        res.render('cuenta/cuenta_add', {errors, tipocuenta, moneda});
    }
    else{
        const cuenta = Cuenta.findOne({moneda: moneda, tipo_cuenta: tipocuenta});
        if(cuenta){
            errors.push({text: 'La cuenta ingresada ya existe'});
            res.render('cuenta/cuenta_add', {errors, tipo_cuenta, moneda});
        }
    }
    
}

module.exports = cuentaCtrl;