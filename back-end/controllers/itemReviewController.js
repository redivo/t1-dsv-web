const {dbConfig} = require('../configs/DBConfig')
const sql = require('mssql');



const getItemReview =  async (placa) => {
    try {

      const pool = await sql.connect(dbConfig);
      const request = pool.request();

      let selectItenReview = 'SELECT I.* FROM ItensRevisao I';

      if (placa) {
        console.log('Placa:', placa); // Verifique o valor de placa
        selectItenReview += ' LEFT JOIN Veiculos v ON (V.VeiculoID=I.VeiculoID) WHERE V.placa = @placa';
        request.input('placa', sql.VarChar, placa );
        console.log('SQL:', selectItenReview); // Verifique o SQL gerado

      }

      const result = await request.query(selectItenReview);
      return result.recordset;
    } catch (error) {
        throw error.message ;
    }
  };
  

 


  const createItemReview =  async (itemReview, placa) => {

      const {Descricao, DataRevisao, Valor, VeiculoID } = itemReview;

      try {
        const pool = await sql.connect(dbConfig);
        const query = `
        DECLARE @ID INT = (SELECT VeiculoID FROM Veiculos WHERE placa = @placa )
        INSERT INTO ItensRevisao (Descricao, DataRevisao, Valor, VeiculoID)
        VALUES (@Descricao, @DataRevisao, @Valor, @ID)
        `;
        
        console.log('placaaa',placa)
        
        await pool.request()
          .input('placa', sql.VarChar, placa)
          .input('Descricao', sql.VarChar, Descricao)
          .input('DataRevisao', sql.Date, DataRevisao)
          .input('Valor', sql.Int, Valor)
          .query(query);
    
        return { message: 'Item de Revisão cadastrado com sucesso!' };

      } catch (error) {
        throw error.message ;
      }
    };
  




  //   const UpdateVehicle = async (placa, updateFields) => {
  //     try {
  //       const pool = await sql.connect(dbConfig);

  //       if (Object.keys(updateFields).length === 0) {
  //         throw new Error('Nenhum campo de atualização fornecido.');
  //       }
    
  //       let query = 'UPDATE Veiculos SET ';
  //       const params = [];
    
  //       for (const [field, value] of Object.entries(updateFields)) {
  //         // Determine o tipo correto com base no nome do campo
          
  //        // const fieldType = field === 'Ano' ? sql.Int : sql.VarChar;
  //         const fieldType = (field === 'Ano') ? sql.Int : (field === 'status') ? sql.Bit : sql.VarChar;
          
  //         query += `${field} = @${field}, `;
  //         params.push({ name: field, type: fieldType, value });
  //       }
    
  //       query = query.slice(0, -2); // Remover a última vírgula e espaço
  //       query += ' WHERE Placa = @placa';
    
  //       console.log('query com where:', query);
    
  //       // Executar a consulta SQL
  //       const request = pool.request();
  //       request.input('placa', sql.VarChar, placa);
    
  //       for (const param of params) {
  //         request.input(param.name, param.type, param.value);
  //       }
    
  //       const result = await request.query(query);
    
  //       if (result.rowsAffected[0] === 0) {
  //         throw new Error('Veículo não encontrado.');
  //       }
    
  //       return { message: 'Dados do veículo atualizados com sucesso.' };
  //     } catch (error) {
  //       throw error.message;
  //     }
  //   };






  
    module.exports = {getItemReview, createItemReview}
















