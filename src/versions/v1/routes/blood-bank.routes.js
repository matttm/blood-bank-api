const { Router } = require('express');
const  bloodBankController = require('../controllers/blood-bank.controller');

const bloodBankRoutes = Router();

bloodBankRoutes.route('blood-bank')
    .get(bloodBankController.getAll);

module.exports = bloodBankRoutes;
