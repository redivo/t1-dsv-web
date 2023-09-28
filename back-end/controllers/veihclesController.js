const {dbConfig} = require('../configs/DBConfig')
const sql = require('mssql');

/**************************************************************************************************/
/**
 * \brief  Convert vehicles dictionary from PT labels to EN labels
 * \param  vehicles  JSON containing vehicles to be translated
 */
function convertVehiclesDictionary(vehicles)
{
  // Iterate over vehicles
  for (let i = 0; i < vehicles.length; i++) {
    // VeiculoID -> id
    vehicles[i]['id'] = vehicles[i]['VeiculoID'];
    delete vehicles[i]['VeiculoID'];

    // Nome -> name
    vehicles[i]['name'] = vehicles[i]['Nome'];
    delete vehicles[i]['Nome'];

    // Placa -> licensePlate
    vehicles[i]['licensePlate'] = vehicles[i]['Placa'];
    delete vehicles[i]['Placa'];

    // Modelo -> model
    vehicles[i]['model'] = vehicles[i]['Modelo'];
    delete vehicles[i]['Modelo'];

    // Marca -> brand
    vehicles[i]['brand'] = vehicles[i]['Marca'];
    delete vehicles[i]['Marca'];

    // Ano -> year
    vehicles[i]['year'] = vehicles[i]['Ano'];
    delete vehicles[i]['Ano'];

    // Categoria -> category
    vehicles[i]['category'] = vehicles[i]['Categoria'];
    delete vehicles[i]['Categoria'];

    // KM -> odometer
    vehicles[i]['odometer'] = vehicles[i]['KM'];
    delete vehicles[i]['KM'];
  }
}

/**************************************************************************************************/
/**
 * \brief  Get vehicle(s) from DB
 * \param  licensePlate  License Plate related do vehicle to be get. If not given, return all
 * \return The requested vehicle if licensePlate is given, all vehicles if not
 */
const getVehicles =  async (licensePlate) =>
{
  try {
    // Connect do DB
    const pool = await sql.connect(dbConfig);
    const request = pool.request();

    // Create basic request
    let selectVehicles = 'SELECT * FROM Veiculos ';

    // Select only license plate if it was given
    if (licensePlate) {
      selectVehicles += ' WHERE Status = 1 AND Placa = @licensePlate';
      request.input('licensePlate', sql.VarChar, licensePlate );
    }

    // Get result
    const result = await request.query(selectVehicles);

    // Convert vehicles dictionary from PT to EN
    convertVehiclesDictionary(result.recordset);

    // Return value
    return result.recordset;
  } catch (error) {
      throw error.message ;
  }
};

/**************************************************************************************************/
/**
 * \brief  Create a vehicle
 * \param  vehicle  Vehicle data to be created
 * \return TRUE if OK, FALSE otherwise
 */
const createVehicles =  async (vehicle) =>
{
  // Get data from input
  const { name, licensePlate, model, brand, year, category } = vehicle;

  try {
    // Connect to DB
    const pool = await sql.connect(dbConfig);

    // Mount query
    const query = `
      INSERT INTO Veiculos (Nome, Placa, Modelo, Marca, Ano, KM, Categoria)
      VALUES (@name, @licensePlate, @model, @brand, @year, @KM, @category)
    `;

    // Perform operation
    await pool.request()
      .input('Nome', sql.VarChar, Nome)
      .input('Placa', sql.VarChar, Placa)
      .input('Modelo', sql.VarChar, Modelo)
      .input('Marca', sql.VarChar, Marca)
      .input('Ano', sql.Int, Ano)
      .input('KM', sql.Int, KM)
      .input('Categoria', sql.VarChar, Categoria)
      .query(query);

    // Return TRUE
    return true;

  } catch (error) {
    throw error.message;
  }
};

/**************************************************************************************************/
/**
 * \brief  Update a vehicle
 * \param  licensePlate  License plate of vehicle to be updated
 * \param  updateFields  Fields to be updated
 * \return TRUE if OK, FALSE otherwise
 */
const UpdateVehicle = async (licensePlate, updateFields) => {
  try {
    // Connect to DB
    const pool = await sql.connect(dbConfig);

    // If updateFields is empty, thow error
    if (Object.keys(updateFields).length === 0) {
      throw new Error('Empty fields');
    }

    // Mount initial query
    let query = 'UPDATE Veiculos SET ';
    const params = [];

    // Iterate over fields filling query
    for (const [field, value] of Object.entries(updateFields)) {
      const fieldType = (field === 'Ano') ? sql.Int : (field === 'KM') ?
          sql.Int
        :
          (field === 'status') ? sql.Bit : sql.VarChar;

      query += `${field} = @${field}, `;
      params.push({ name: field, type: fieldType, value });
    }

    // Remove last comma and space
    query = query.slice(0, -2);

    // Filter by licensePlate
    query += ' WHERE Placa = @licensePlate';

    // Run query
    const request = pool.request();
    request.input('licensePlate', sql.VarChar, licensePlate);
    for (const param of params) {
      request.input(param.name, param.type, param.value);
    }
    const result = await request.query(query);

    // If no one row affected, throw error
    if (result.rowsAffected[0] === 0) {
      throw new Error('No vehicle modified');
    }

    // Return TRUE
    return true;
  } catch (error) {
    throw error.message;
  }
};

/**************************************************************************************************/
/* Export modules                                                                                 */
/**************************************************************************************************/
module.exports = {getVehicles, createVehicles, UpdateVehicle};
