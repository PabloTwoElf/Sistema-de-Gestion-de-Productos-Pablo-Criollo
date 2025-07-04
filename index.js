const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));


const productosRouter = require('./routes/productos');
app.use('/api/productos', productosRouter);


app.listen(3000, () => console.log('🚀 Servidor corriendo en http://localhost:3000'));

// Conexión a la base de datos
const db = require('./db');
db.connect((err) => {
  if (err) {
    console.error(" Error de conexión a la BD:", err.message);
  } else {
    console.log(" Conexión establecida con la base de datos");
  }
});
