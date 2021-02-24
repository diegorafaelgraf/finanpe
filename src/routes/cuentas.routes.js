const { Router } = require('express');
const router = new Router();

const {
    renderCuentas,
    renderAgregarCuentaForm,
    agregarCuenta
} = require ('../controllers/cuenta.controller.js');

//CRUD de cuentas
router.get('/cuenta/cuentas', renderCuentas);
router.get('/cuenta/agregar_cuenta', renderAgregarCuentaForm);
router.post('/cuenta/agregar_cuenta', agragarCuenta);

module.exports = router;