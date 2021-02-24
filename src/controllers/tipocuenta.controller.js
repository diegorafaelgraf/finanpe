const tipoCuentaCtrl = {};

const TipoCuenta = require('../models/TipoCuenta');

tipoCuentaCtrl.renderTiposDeCuenta = async (req, res) => { //Renderiza la página que muestra los tipos de cuenta
    const tiposcuenta = await TipoCuenta.find().lean();
    res.render('tipocuenta/tipo_cuenta_all', { tiposcuenta });
}

tipoCuentaCtrl.renderAgregarTipoDeCuentaForm = (req, res) => { //Renderiza el formulario para agregar un Tipo de Cuenta
    res.render('tipocuenta/tipo_de_cuenta_add');
}

tipoCuentaCtrl.agregarTipoDeCuenta = async (req, res) => { //Agrega un Tipo de Cuenta
    const { nombre_tipo_cuenta } = req.body;
    const errors = [];
    if(nombre_tipo_cuenta == ''){
        errors.push({text: 'El nombre es requerido'});
    }
    if(errors.length > 0){
        res.render('tipocuenta/tipo_de_cuenta_add', {errors, nombre_tipo_cuenta});
    }
    else{
        const nombreTipoCuenta = await TipoCuenta.findOne({nombre_tipo_cuenta: nombre_tipo_cuenta});
        if(nombreTipoCuenta){
            errors.push({text: 'El tipo de cuenta ingresado ya existe'});
            res.render('tipocuenta/tipo_de_cuenta_add', {errors, nombre_tipo_cuenta})            ;
        }
        else{
            const tipo_de_cuenta = new TipoCuenta({nombre_tipo_cuenta: nombre_tipo_cuenta});
            try{
                await tipo_de_cuenta.save();
                req.flash('success_msg', 'Tipo de Cuenta Ingresado Correctamente');
                res.redirect('/tipo_de_cuenta/tipos_de_cuenta');
            }
            catch (err){
                req.flash('error_msg', 'Ha ocurrido un error inesperado, por favor intente nuevamente');
                console.error(err);
                res.redirect('/tipo_de_cuenta/tipos_de_cuenta');
            }
        }

    }   
}

tipoCuentaCtrl.renderModificarTipoCuentaForm = async (req, res) => {//Renderiza el formulario para editar el tipo de cuenta        
    const tipo_de_cuenta = await TipoCuenta.findById(req.params.id).lean();    
    res.render('tipocuenta/tipo_de_cuenta_edit', { tipo_de_cuenta});
}

tipoCuentaCtrl.modificarTipoCuenta = async (req, res) => {//Modifica un tipo de cuenta
    const { nombre_tipo_cuenta, nombre_tipo_cuenta_anterior } = req.body;
    const errors = [];
    if(nombre_tipo_cuenta == ''){
        errors.push({text: 'El nombre es requerido'});        
    }
    if(errors.length > 0){
        res.render('tipocuenta/tipo_de_cuenta_edit', { errors, nombre_tipo_cuenta});
    }
    else{
        if(nombre_tipo_cuenta != nombre_tipo_cuenta_anterior){
            const nombreTipoCuenta = await TipoCuenta.findOne({nombre_tipo_cuenta: nombre_tipo_cuenta});
            if(nombreTipoCuenta){
                errors.push({ text: 'El Tipo de Cuenta ingresado ya existe' });
            }            
        }
        if(errors.length >0){
            const tipo_de_cuenta = {_id: req.params.id, nombre_tipo_cuenta: nombre_tipo_cuenta};
            res.render('tipocuenta/tipo_de_cuenta_edit', {errors, tipo_de_cuenta});     
        }
        else{
            try{
                await TipoCuenta.findByIdAndUpdate(req.params.id, {nombre_tipo_cuenta: nombre_tipo_cuenta});
                req.flash('success_msg', 'El Tipo de Cuenta se actualizó correctamente');
                res.redirect('/tipo_de_cuenta/tipos_de_cuenta');
            }catch (error){
                req.flash('error_msg', 'Ha ocurrido un error inesperado, por favor intente nuevamente');
                console.error(error);
                res.redirect('/tipo_de_cuenta/tipos_de_cuenta');
            }
        }
    }
}

module.exports = tipoCuentaCtrl;