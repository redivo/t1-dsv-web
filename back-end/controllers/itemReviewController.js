const {dbConfig} = require('../configs/DBConfig')
const sql = require('mssql');

/**************************************************************************************************/
/**
 * \brief  Get review items
 * \param  licensePlate  License Plate related do reviews. If not given, return all
 * \return The got reviews
 */
const getItemReview =  async (licensePlate) =>
{
  try {
    // Connect to DB
    const pool = await sql.connect(dbConfig);
    const request = pool.request();

    // Initialize query
    let selectItenReview = 'SELECT * FROM maintenances ';

    // If license plate was given, select it
    if (licensePlate) {
      selectItenReview += ' WHERE licensePlate = @licensePlate';
      request.input('licensePlate', sql.VarChar, licensePlate );
    }

    // Perform request
    const result = await request.query(selectItenReview);

    // Return result
    return result.recordset;
  } catch (error) {
    throw error.message ;
  }
};

/**************************************************************************************************/
/**
 * \brief  Create an review item done
 * \param  maintenance  Maintenance data
 * \return TRUE if OK, FALSE otherwise
 */
const createItemReview =  async (maintenance) => {
  try {
    // Connect to DB
    const pool = await sql.connect(dbConfig);

    // Mount query
    const query = `
    INSERT INTO maintenances (description, date, value, licensePlate, readOdometer, referenceOdometer)
    VALUES (@description, @date, @value, @licensePlate, @readOdometer, @referenceOdometer)
    `;

    // Execute query
    await pool.request()
      .input('licensePlate', sql.VarChar, maintenance.licensePlate)
      .input('description', sql.VarChar, maintenance.description)
      .input('date', sql.Date, maintenance.date)
      .input('value', sql.Int, maintenance.value)
      .input('readOdometer', sql.Int, maintenance.readOdometer)
      .input('referenceOdometer', sql.Int, maintenance.referenceOdometer)
      .query(query);

    // Return true
    return true;
  } catch (error) {
    throw error.message ;
  }
};

/**************************************************************************************************/
/* Export modules                                                                                 */
/**************************************************************************************************/
module.exports = {getItemReview, createItemReview}
