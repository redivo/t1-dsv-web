const app = require('express');
const router = app.Router();
const {createVehicles, getVehicles, UpdateVehicle} = require ('../controllers/veihclesController')


//######## ROTAS DISPONÍVEIS

 //GET
router.get('/', async (req, res) => {
    try {

        const vehicles = await getVehicles (req.query?.placa)

      res.json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})


 //POST
router.post('/', async (req, res) => {
  try {

      const status = await createVehicles (req.body)
    res.json(status);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


 //PUT
router.put('/', async (req, res) => {
  const placa = req.query.placa;
  const updateFields = req.body;

  try {
    const result = await UpdateVehicle(placa, updateFields);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});






module.exports = {router};




  
  
  
