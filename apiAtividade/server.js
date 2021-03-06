const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const db = require('./models');

app.use(express.json());

const DataRoutes = require('./routes/DataRoutes');
app.use('/api/data', DataRoutes);

const StationRoutes = require('./routes/StationRoutes');
app.use('/api/station', StationRoutes);

db.sequelize.sync().then(()=> {
    app.listen(3001, () => {
        console.log('Conexão feita com sucesso!')
    });
});
