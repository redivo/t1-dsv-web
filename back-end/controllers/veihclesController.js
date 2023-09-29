const {dbConfig} = require('../configs/DBConfig')
const sql = require('mssql');

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
    let selectVehicles = 'SELECT * FROM vehicles ';

    // Select only license plate if it was given
    if (licensePlate) {
      selectVehicles += ' WHERE Status = 1 AND licensePlate = @licensePlate';
      request.input('licensePlate', sql.VarChar, licensePlate );
    }

    // Get result
    const result = await request.query(selectVehicles);

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
      INSERT INTO vehicles (name, licensePlate, model, brand, year, odometer, category)
      VALUES (@name, @licensePlate, @model, @brand, @year, @odometer, @category)
    `;

    // Perform operation
    await pool.request()
      .input('name', sql.VarChar, name)
      .input('licensePlate', sql.VarChar, licensePlate)
      .input('model', sql.VarChar, model)
      .input('brand', sql.VarChar, brand)
      .input('year', sql.Int, year)
      .input('odometer', sql.Int, odometer)
      .input('category', sql.VarChar, category)
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
    let query = 'UPDATE vehicles SET ';
    const params = [];

    // Iterate over fields filling query
    for (const [field, value] of Object.entries(updateFields)) {
      const fieldType = (field === 'year') ? sql.Int : (field === 'odometer') ?
          sql.Int
        :
          (field === 'status') ? sql.Bit : sql.VarChar;

      query += `${field} = @${field}, `;
      params.push({ name: field, type: fieldType, value });
    }

    // Remove last comma and space
    query = query.slice(0, -2);

    // Filter by licensePlate
    query += ' WHERE licenseplate = @licenseplate';

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
