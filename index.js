const express = require('express');
const connectDB = require('./db');
const router = require('./routers/router');
const app = express();

connectDB();

app.use('/api',router)

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});