const monedaCtrl = {};

const Moneda = require('../models/Moneda');
const Cuenta = require('../models/Cuenta');

monedaCtrl.renderTiposDeMoneda = async (req, res) => { //Renderiza la pagina que muestra todos los tipos de moneda
    const moneda = await Moneda.find().lean();
    res.render('moneda/tipo_de_moneda_all', { moneda });
};

monedaCtrl.renderAgregarMonedaForm = (req, res) => { //Renderiza el formulario para agregar una moneda
    res.render('moneda/tipo_de_moneda_add');
}

monedaCtrl.agregarMoneda = async (req, res) => { //Realiza el Alta de la Moneda
    const { nombre_moneda, simbolo, cotizacion } = req.body;
    const errors = [];
    if (nombre_moneda == '') {
        errors.push({ text: "El nombre es requerido" });
    }
    if (simbolo == '') {
        errors.push({ text: "El símbolo es requerido" });
    }
    if (cotizacion == '') {
        errors.push({ text: "La cotización es requerida" });
    }
    if (errors.length > 0) {
        res.render('moneda/tipo_de_moneda_add', { errors, nombre_moneda, simbolo, cotizacion });
    }
    else {
        const nombreMoneda = await Moneda.findOne({ nombre_moneda: nombre_moneda });
        const simb = await Moneda.findOne({ simbolo: simbolo });
        if (nombreMoneda) {
            errors.push({ text: "La moneda ingresada ya existe" });
            res.render('moneda/tipo_de_moneda_add', { errors, nombre_moneda, simbolo, cotizacion });
        } else if (simb) {
            errors.push({ text: "El símbolo ingresado ya existe" });
            res.render('moneda/tipo_de_moneda_add', { errors, nombre_moneda, simbolo, cotizacion });
        }
        else {
            const moneda = new Moneda({ nombre_moneda, simbolo, cotizacion });
            try {
                await moneda.save();
                req.flash('success_msg', 'Moneda ingresada correctamente');
                res.redirect('/moneda/tipos_de_moneda');
            }
            catch (err) {
                req.flash('error_msg', 'Ha ocurrido un error inesperado, intente nuevamente');
                console.error(err);
                res.render('moneda/tipo_de_moneda_add', nombre_moneda, simbolo, cotizacion);
            }
        }
    }
}

monedaCtrl.renderModificarMonedaForm = async (req, res) => { //Renderiza el formulario para modificar una moneda
    const moneda = await Moneda.findById(req.params.id).lean();
    res.render('moneda/tipo_de_moneda_edit', { moneda });
}

monedaCtrl.modificarMoneda = async (req, res) => { //Modifica la moneda
    const { nombre_moneda, simbolo, cotizacion, nombre_moneda_anterior, simbolo_anterior, cotizacion_anterior } = req.body;
    const errors = [];
    if (nombre_moneda == '') {
        errors.push({ text: "El nombre es requerido" });        
    }
    if (simbolo == '') {
        errors.push({ text: "El símbolo es requerido" });        
    }
    if (cotizacion == '') {
        errors.push({ text: "La cotización es requerida" });        
    }
    if (errors.length > 0) {
        const moneda = {_id: req.params.id, nombre_moneda: nombre_moneda, simbolo: simbolo, cotizacion: cotizacion};
        res.render('moneda/tipo_de_moneda_edit', { errors, moneda });
    }
    else {
        if (nombre_moneda != nombre_moneda_anterior) {
            const nombreMoneda = await Moneda.findOne({ nombre_moneda: nombre_moneda });            
            if (nombreMoneda) {
                errors.push({ text: "La moneda ingresada ya existe" })                
            }
        }
        if(simbolo != simbolo_anterior){            
            const simb = await Moneda.findOne({ simbolo: simbolo });
            if (simb) {                
                errors.push({ text: "El símbolo ingresado ya existe" });               
            }
        }
        if (errors.length > 0){
            const moneda = {_id: req.params.id, nombre_moneda: nombre_moneda, simbolo: simbolo, cotizacion: cotizacion};
            res.render('moneda/tipo_de_moneda_edit', { errors, moneda });
        }
        else {
            try {
                await Moneda.findByIdAndUpdate(req.params.id, { nombre_moneda, simbolo, cotizacion });
                req.flash('success_msg', 'La moneda se actualizó correctamente');
                res.redirect('/moneda/tipos_de_moneda');
            }
            catch(err) {
                req.flash('error_msg', 'Ha ocurrido un error inesperado, por favor intente nuevamente');
                console.error(err);
                res.redirect('/moneda/tipos_de_moneda');
            }
        }
    }    
}

monedaCtrl.borrarMoneda = async (req, res) => {//Elimina una moneda    
    const cuenta = await Cuenta.findOne({moneda: req.params.id}); //find if exist a Cuenta that utilize this moneda    
    if(cuenta){
        req.flash('error_msg', 'La moneda no se puede eliminar ya que está siendo utilizada en una cuenta')
        res.redirect("/moneda/tipos_de_moneda");        
    }
    else{
        await Moneda.findByIdAndDelete(req.params.id);    
        req.flash('success_msg', 'La moneda se eliminó correctamente');
        res.redirect("/moneda/tipos_de_moneda");    
    }
}


module.exports = monedaCtrl;