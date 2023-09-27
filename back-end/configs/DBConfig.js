// You can create a new credential block if you want
const selectableDbConfig = {
  "George": {
    user: 'sa',
    password: 'Boldo@666',
    server: 'localhost',
    database: 'PEDRAMOURA',
    options: {
      trustServerCertificate: true,
    },
  },
  "Patrck" : {
    user: 'sa',
    password: 'teste123',
    server: 'DESKTOP-RGSEMHD\\SQLEXPRESS',
    database: 'PEDRAMOURA',
    options: {
      trustServerCertificate: true,
    },
  },
};

// Select DB Config
const dbConfig = selectableDbConfig["George"];
module.exports = {dbConfig};
