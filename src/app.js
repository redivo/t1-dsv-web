const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // Escolha uma porta disponível
app.use(bodyParser.json());



const vehicles = require ('../routes/Vehicles')
app.use('/veiculos', vehicles.router);


const itemReview = require ('../routes/ItemReview')
app.use('/revisao', itemReview.router);



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

