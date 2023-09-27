const app = require('express');
const router = app.Router();
const {createVehicles, getVehicles, UpdateVehicle} = require ('../controllers/veihclesController')

/**************************************************************************************************/
/* Available Routes                                                                               */
/**************************************************************************************************/

function convertVehicleDictionary(vehicle)
{
  // VeiculoID -> id
  vehicle['id'] = vehicle['VeiculoID'];
  delete vehicle['VeiculoID'];

  // Nome -> name
  vehicle['name'] = vehicle['Nome'];
  delete vehicle['Nome'];

  // Placa -> licensePlate
  vehicle['licensePlate'] = vehicle['Placa'];
  delete vehicle['Placa'];

  // Modelo -> model
  vehicle['model'] = vehicle['Modelo'];
  delete vehicle['Modelo'];

  // Marca -> brand
  vehicle['brand'] = vehicle['Marca'];
  delete vehicle['Marca'];

  // Ano -> brand
  vehicle['brand'] = vehicle['Ano'];
  delete vehicle['Ano'];

  // Categoria -> category
  vehicle['category'] = vehicle['Categoria'];
  delete vehicle['Categoria'];

  // KM -> odometer
  vehicle['odometer'] = vehicle['KM'];
  delete vehicle['KM'];
}

function convertVehiclesDictionary(vehicles)
{
  // Iterate over vehicles
  for (let i = 0; i < vehicles.length; i++) {
    convertVehicleDictionary(vehicles[i]);
  }
}

 //GET
router.get('/', async (req, res) => {
    try {
      const vehicles = await getVehicles (req.query?.placa);
      convertVehiclesDictionary(vehicles);
      res.status(200).json(vehicles);
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

