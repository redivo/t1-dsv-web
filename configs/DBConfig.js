const dbConfig = {
    user: 'sa',
    password: 'ncssp',
    server: 'LENOVO-PATRICK', // Altere conforme seu servidor SQL Server
    database: 'PEDRAMOURA',
    options: {
      trustServerCertificate: true,
    },
};

module.exports = {dbConfig}