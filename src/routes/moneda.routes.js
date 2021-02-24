const { Router } = require('express');
const router = Router();

const {     
    renderTiposDeMoneda, 
    renderAgregarMonedaForm,
    agregarMoneda, 
    renderModificarMonedaForm,
    modificarMoneda } = require('../controllers/moneda.controller');

//CRUD de Tipos de Moneda
router.get('/moneda/tipos_de_moneda', renderTiposDeMoneda);                   //Index Tipo de Monedas
router.get('/moneda/agregar_moneda', renderAgregarMonedaForm);                //Formulario para dar de alta una moneda
router.post('/moneda/agregar_moneda', agregarMoneda);                        //Alta de la Moneda
router.get('/moneda/modificar_moneda/:id', renderModificarMonedaForm);       //Formulario para modificar una moneda
router.post('/moneda/modificar_moneda/:id', modificarMoneda);                 //Modificacion de la moneda


module.exports = router;