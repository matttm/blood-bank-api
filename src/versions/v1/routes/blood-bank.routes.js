import {Router} from "express";

const bloodBankRoutes = Router();

bloodBankRoutes.path('blood-bank')
    .get();

module.exports = bloodBankRoutes;
