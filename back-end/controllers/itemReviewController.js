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
    let selectItenReview = 'SELECT I.* FROM ItensRevisao I';

    // If license plate was given, select it
    if (licensePlate) {
      console.log('Placa:', licensePlate); // Verifique o valor de placa
      selectItenReview += ' LEFT JOIN Veiculos v ON (V.VeiculoID=I.VeiculoID) WHERE V.placa = @licensePlate';
      request.input('licensePlate', sql.VarChar, licensePlate );
      console.log('SQL:', selectItenReview); // Verifique o SQL gerado

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
  const {Descricao, DataRevisao, Valor, VeiculoID } = itemReview;

  try {
    // Connect to DB
    const pool = await sql.connect(dbConfig);

    // Mount query
    const query = `
    DECLARE @ID INT = (SELECT VeiculoID FROM Veiculos WHERE placa = @licensePlate )
    INSERT INTO ItensRevisao (Descricao, DataRevisao, Valor, VeiculoID)
    VALUES (@Descricao, @DataRevisao, @Valor, @ID)
    `;

    // Execute query
    await pool.request()
      .input('licensePlate', sql.VarChar, licensePlate)
      .input('Descricao', sql.VarChar, Descricao)
      .input('DataRevisao', sql.Date, DataRevisao)
      .input('Valor', sql.Int, Valor)
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
