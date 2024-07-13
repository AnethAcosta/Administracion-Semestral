const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/financial_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB', err);
});

// Definir un esquema y un modelo para los datos financieros
const financialDataSchema = new mongoose.Schema({
  activosCorrientes: Number,
  pasivosCorrientes: Number,
  totalActivos: Number,
  totalPasivos: Number,
  patrimonio: Number,
  ingresos: Number,
  gastos: Number,
  utilidadNeta: Number,
  costoBienesVendidos: Number,
  cuentasPorCobrar: Number,
  inventario: Number,
  cuentasPorPagar: Number
});

const FinancialData = mongoose.model('FinancialData', financialDataSchema);

// Rutas
app.get('/api/financial-data', async (req, res) => {
  const data = await FinancialData.findOne();
  res.json(data);
});

app.post('/api/financial-data', async (req, res) => {
  const newData = new FinancialData(req.body);
  await newData.save();
  res.status(201).json(newData);
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
