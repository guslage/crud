const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const db = require('./models');

app.use(express.json());

const dadoRoutes = require('./routes/dados-routes');
app.use('/api/dados', dadoRoutes);

const estacaoRoutes = require('./routes/estacoes-routes');
app.use('/api/estacoes', estacaoRoutes);

db.sequelize.sync().then(()=> {
    app.listen(3001, () => {
        console.log('Conexão feita com sucesso!')
    });
});
