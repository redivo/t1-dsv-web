const app = require('express');
const router = app.Router();
const {createVehicles, getVehicles, UpdateVehicle} = require ('../controllers/veihclesController')

/**************************************************************************************************/
/* Available Routes                                                                               */
/**************************************************************************************************/

/**************************************************************************************************/
/**
 * \brief  GET method for a specific vehicle
 * \param  req  Request data
 * \param  res  Response data
 */
router.get('/:licensePlate', async (req, res) => {
    try {
      const vehicles = await getVehicles(req.params?.licensePlate);
      res.status(200).json(vehicles[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})

/**************************************************************************************************/
/**
 * \brief  GET method for all vehicles
 * \param  req  Request data
 * \param  res  Response data
 */
router.get('/', async (req, res) => {
    try {
      const vehicles = await getVehicles();
      res.status(200).json(vehicles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
})

/**************************************************************************************************/
/**
 * \brief  POST method
 * \param  req  Request data
 * \param  res  Response data
 */
router.post('/', async (req, res) => {
  try {
    const ok = await createVehicles (req.body)
    if (ok) {
        res.status(200);
    } else {
        res.status(500).json({ error: "Error creating vehicle" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

/**************************************************************************************************/
/**
 * \brief  PUT method
 * \param  req  Request data
 * \param  res  Response data
 */
router.put('/', async (req, res) => {
  const placa = req.query.placa;
  const updateFields = req.body;

  try {
    const ok = await UpdateVehicle(placa, updateFields);
    if (ok) {
        res.status(200);
    } else {
        res.status(500).json({ error: "Error updating vehicle" });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**************************************************************************************************/
/* Export modules                                                                                 */
/**************************************************************************************************/
module.exports = {router};
