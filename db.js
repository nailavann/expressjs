const mongoose = require('mongoose');
require('dotenv').config();

 function connectDB() {
    mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => {
        console.log('Bağlanıldı');
      })
      .catch((err) => {
        console.error('Err:', err);
      });
  }
  

module.exports = connectDB;