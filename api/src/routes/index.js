const { Router } = require('express');
const { getDogs, getDogId, newDog, getTemperaments } = require('../controllers/routes Controllers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', getDogs);
router.get('/dogs/:id', getDogId);
router.get('/temperaments', getTemperaments);
router.post('/dogs', newDog);


module.exports = router;
