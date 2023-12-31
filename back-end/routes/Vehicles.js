const app = require('express');
const router = app.Router();
const {createVehicles, getVehicles, UpdateVehicle} = require ('../controllers/veihclesController')
const { requireAuthentication } = require('../src/authentication.js')


/**************************************************************************************************/
/* Available Routes                                                                               */
/**************************************************************************************************/

/**************************************************************************************************/
/**
 * \brief  GET method for a specific vehicle
 * \param  req  Request data
 * \param  res  Response data
 */
router.get('/:licensePlate', requireAuthentication, async (req, res) => {
  try {
    const vehicles = await getVehicles(req.params.licensePlate);
    res.json(vehicles[0]);
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
router.get('/', requireAuthentication, async (req, res) => {
  try {
    const vehicles = await getVehicles();
    res.json(vehicles);
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
router.post('/', requireAuthentication,  async(req, res) => {
  try {
    const ok = await createVehicles(req.body)
    if (ok) {
        res.json(req.body);
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
router.put('/', requireAuthentication, async (req, res) => {
  try {
    const ok = await UpdateVehicle(req.body);
    if (ok) {
        res.json(req.body);
    } else {
      res.status(500).json({ error: "Error updating vehicle" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**************************************************************************************************/
/* Export modules                                                                                 */
/**************************************************************************************************/
module.exports = {router};
