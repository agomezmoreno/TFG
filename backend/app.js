const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// rutas
const listaRoutes = require('./routes/listaRoutes');
const alertaRoutes = require("./routes/alertaRoutes");
const ofertaRoutes = require('./routes/ofertaRoutes');
const searchRoutes = require('./routes/searchRoutes');
const comparatorRoutes = require('./routes/comparatorRoutes');

app.use('/api/lists', listaRoutes);
app.use("/api/alerts", alertaRoutes);
app.use('/api/offers', ofertaRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/compare', comparatorRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Servidor corriendo en puerto", PORT));

