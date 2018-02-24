const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// Require controllers
const book = require('./app/controllers/bookController');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://drihup:password@ds247178.mlab.com:47178/reto3-web-backend');
mongoose.connection.on('error', () => {
  console.log('No se ha podido conectar a la BD, Saliendo...');
  process.exit();
});
mongoose.connection.once('open', () => {
    console.log("Conectado exitosamente a la BD!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/books', book.create);

app.get('/books', book.findAll);

app.get('/books/:bookId', book.findOne);

app.put('/books/:bookId', book.update);

app.delete('/books/:bookId', book.deleteBook);

app.listen(3000, () => {
  console.log('Web server in port 3000');
});
