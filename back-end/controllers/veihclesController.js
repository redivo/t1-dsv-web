const {dbConfig} = require('../configs/DBConfig')
const sql = require('mssql');



const getVehicles =  async (placa) => {
    try {

      const pool = await sql.connect(dbConfig);
      const request = pool.request();

      let selectVehicles = 'SELECT * FROM Veiculos ';
      
      if (placa) {
        selectVehicles += ' WHERE Status = 1 AND Placa = @placa';
        request.input('placa', sql.VarChar, placa );
      }
              
      const result = await request.query(selectVehicles);
      return result.recordset;
    } catch (error) {
        throw error.message ;
    }
  };
  



  const createVehicles =  async (vehicle) => {

      const { Nome, Placa, Modelo, Marca, Ano, Categoria } = vehicle;

      try {
        const pool = await sql.connect(dbConfig);
        const query = `
          INSERT INTO Veiculos (Nome, Placa, Modelo, Marca, Ano, KM, Categoria)
          VALUES (@Nome, @Placa, @Modelo, @Marca, @Ano,@KM, @Categoria)
        `;
        
        await pool.request()
          .input('Nome', sql.VarChar, Nome)
          .input('Placa', sql.VarChar, Placa)
          .input('Modelo', sql.VarChar, Modelo)
          .input('Marca', sql.VarChar, Marca)
          .input('Ano', sql.Int, Ano)
          .input('KM', sql.Int, KM)
          .input('Categoria', sql.VarChar, Categoria)
          .query(query);
    
        return { message: 'Veículo cadastrado com sucesso!' };

      } catch (error) {
        throw error.message ;
      }
    };
  




    const UpdateVehicle = async (placa, updateFields) => {
      try {
        const pool = await sql.connect(dbConfig);

        if (Object.keys(updateFields).length === 0) {
          throw new Error('Nenhum campo de atualização fornecido.');
        }
    
        let query = 'UPDATE Veiculos SET ';
        const params = [];
    
        for (const [field, value] of Object.entries(updateFields)) {
          // Determine o tipo correto com base no nome do campo
          
         // const fieldType = field === 'Ano' ? sql.Int : sql.VarChar;
          const fieldType = (field === 'Ano') ? sql.Int : (field === 'KM') ? sql.Int : (field === 'status') ? sql.Bit : sql.VarChar;
          
          query += `${field} = @${field}, `;
          params.push({ name: field, type: fieldType, value });
        }
    
        query = query.slice(0, -2); // Remover a última vírgula e espaço
        query += ' WHERE Placa = @placa';
    
        console.log('query com where:', query);
    
        // Executar a consulta SQL
        const request = pool.request();
        request.input('placa', sql.VarChar, placa);
    
        for (const param of params) {
          request.input(param.name, param.type, param.value);
        }
    
        const result = await request.query(query);
    
        if (result.rowsAffected[0] === 0) {
          throw new Error('Veículo não encontrado.');
        }
    
        return { message: 'Dados do veículo atualizados com sucesso.' };
      } catch (error) {
        throw error.message;
      }
    };






  
    module.exports = {getVehicles, createVehicles, UpdateVehicle}
    
















