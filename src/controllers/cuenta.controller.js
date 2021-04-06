const cuentaCtrl = {};

const Cuenta = require('../models/Cuenta');
const TipoCuenta = require('../models/TipoCuenta');
const Moneda = require('../models/Moneda');
const tipoCuentaCtrl = require('./tipocuenta.controller');

cuentaCtrl.renderCuentas = async (req, res) => {
    const cuenta = await Cuenta.find().populate("tipo_cuenta").populate("moneda").lean();
    res.render('cuenta/cuenta_all.hbs', { cuenta });        
}

cuentaCtrl.renderAgregarCuentaForm = async (req, res) => {
    const tipocuenta_todas = await TipoCuenta.find().lean();
    const moneda_todas = await Moneda.find().lean();
    res.render('cuenta/cuenta_add', {tipocuenta_todas, moneda_todas});
}

cuentaCtrl.agregarCuenta = async (req, res) => {
    const { tipo_cuenta, moneda, cuenta_fisica_o_virtual, saldo } = req.body;
    const errors = [];
    if(tipo_cuenta == ''){
        errors.push({text: 'El tipo de cuenta es requerido'});
    }
    if(moneda == ''){
        errors.push({text: 'La moneda es requerida'});
    }
    if(cuenta_fisica_o_virtual == ''){
        errors.push({text: 'Seleccione si la cuenta es física o virtual'});        
    }
    if(saldo == ''){
        errors.push({text: 'El saldo inicial es requerido'});        
    }
    if(errors.length > 0){        
        const {moneda_todas, tipocuenta_todas} = await agregarValoresPrevios(tipo_cuenta, moneda);             
        res.render('cuenta/cuenta_add', {errors, tipocuenta_todas, moneda_todas, saldo, cuenta_fisica_o_virtual});       
    }
    else{
        const cuenta = await Cuenta.findOne({moneda: moneda, tipo_cuenta: tipo_cuenta, cuenta_fisica_o_virtual: cuenta_fisica_o_virtual});
        if(cuenta){
            //const {moneda_todas, tipocuenta_todas} = agregarValoresPrevios();
            errors.push({text: 'La cuenta ingresada ya existe'});
            res.render('cuenta/cuenta_add', {errors, tipo_cuenta, moneda});
        }
        else{
            const cuenta = new Cuenta({moneda: moneda, tipo_cuenta: tipo_cuenta, saldo: saldo, cuenta_fisica_o_virtual: cuenta_fisica_o_virtual})
            try{
                await cuenta.save();
                req.flash('success_msg', 'Cuenta ingresada correctamente');
                res.redirect('/cuenta/cuentas');
            }
            catch(error){
                req.flash('error_msg', 'Ha ocurrido un error inesperado, por favor intente nuevamente');
                console.error(error);
                res.redirect('/cuenta/cuentas');
            }
        }
    }
    
}

async function agregarValoresPrevios(tipo_cuenta, moneda) { //agrega los valores previos a los JSON para asi poder, en caso de error, mostrarlos en los formlularios
    
    const tipocuenta_todas = await TipoCuenta.find().lean(); //get all tipocuentas to complete the select in the front with the values
    const moneda_todas = await Moneda.find().lean(); //get all monedas to complete the select in the front with the values

    var nombre_tipo_cuenta_anterior = JSON.stringify(await TipoCuenta.findById(tipo_cuenta).select('nombre_tipo_cuenta -_id')); //Convert JSON to JSON String       
    nombre_tipo_cuenta_anterior = JSON.parse(nombre_tipo_cuenta_anterior)['nombre_tipo_cuenta']; //Convert JSON String into a Object. After the convertion, get the value through the index ['nombre_tipo_cuenta']
    
    for(var i = 0; i < tipocuenta_todas.length; i++){
        tipocuenta_todas[i]['nombre_tipo_cuenta_anterior'] = nombre_tipo_cuenta_anterior; //Add nombre_tipo_cuenta_anterior item to tipocuenta_todas JSON
    } 
    
    var nombre_moneda_anterior = JSON.stringify(await Moneda.findById(moneda).select('nombre_moneda -_id')); //Convert JSON to JSON String           
    nombre_moneda_anterior = JSON.parse(nombre_moneda_anterior)['nombre_moneda']; //Convert JSON String into a Object. After the convertion, get the value  through the index ['nombre_moneda']          
    for(var i = 0; i < moneda_todas.length; i++){
        moneda_todas[i]['nombre_moneda_anterior'] = nombre_moneda_anterior; //Add nombre_moneda_anterior item to moneda_todas JSON
    }   

    return {moneda_todas: moneda_todas, tipocuenta_todas: tipocuenta_todas};

}

module.exports = cuentaCtrl;