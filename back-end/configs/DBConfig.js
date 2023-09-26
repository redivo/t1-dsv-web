const dbConfig = {
    user: 'sa',
    password: 'teste123',
    server: 'DESKTOP-RGSEMHD\\SQLEXPRESS', // Altere conforme seu servidor SQL Server
    database: 'PEDRAMOURA',
    options: {
      trustServerCertificate: true,
    },
};

module.exports = {dbConfig}