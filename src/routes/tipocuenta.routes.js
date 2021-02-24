const { Router } = require('express');
const router = Router();

const {
    renderTiposDeCuenta,
    renderAgregarTipoDeCuentaForm,
    agregarTipoDeCuenta,
    renderModificarTipoCuentaForm,
    modificarTipoCuenta
 } = require('../controllers/tipocuenta.controller');

//CRUD de Tipos de Cuenta
router.get('/tipo_de_cuenta/tipos_de_cuenta', renderTiposDeCuenta);
router.get('/tipo_de_cuenta/agregar_tipo_de_cuenta', renderAgregarTipoDeCuentaForm);
router.post('/tipo_de_cuenta/agregar_tipo_de_cuenta', agregarTipoDeCuenta);
router.get('/tipo_de_cuenta/modificar_tipo_de_cuenta/:id', renderModificarTipoCuentaForm);
router.post('/tipo_de_cuenta/modificar_tipo_de_cuenta/:id', modificarTipoCuenta);

module.exports = router;