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
 * \param  itemReview    Review data
 * \param  licensePlate  License Plate related do vehicle
 * \return TRUE if OK, FALSE otherwise
 */
const createItemReview =  async (itemReview, licensePlate) => {
  // Get data from input
  const {description, date, value } = itemReview;

  try {
    // Connect to DB
    const pool = await sql.connect(dbConfig);

    // Mount query
    const query = `
    DECLARE @ID INT = (SELECT licensePlate FROM vehicles WHERE placa = @licensePlate )
    INSERT INTO maintenances (description, date, value, licensePlate)
    VALUES (@description, @date, @value, @ID)
    `;

    // Execute query
    await pool.request()
      .input('licensePlate', sql.VarChar, licensePlate)
      .input('description', sql.VarChar, description)
      .input('date', sql.Date, date)
      .input('value', sql.Int, value)
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
