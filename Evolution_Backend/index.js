require('dotenv').config();
const express = require('express');

const { dbconnetion } = require('./config/connectionDB');
const app = express();
// middware for read and parse from body
const cors = require('cors');
app.use( cors() );
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dbconnetion();

// Rotes

app.use('/login', require('./routes/login'));
app.use('/task', require('./routes/task'));
app.use('/user', require('./routes/user'));



app.listen(process.env.PORT, () => {
  console.log(
    'Server escuchando en el puerto: \x1b[32m%s\x1b[0m',
    process.env.PORT
  );
});