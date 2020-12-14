/*
    api/pos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { printerInsert, printerOut } = require('../controllers/pos');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/ingreso', [
    check('placa', 'La placa es obligatorio').not().isEmpty(),
    check('time', 'El tiempo es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatorio').not().isEmpty(),
    validarCampos], printerInsert);

router.post('/salida', printerOut);


module.exports = router;
