const Book = require('../models/bookModel');

function create(req, res) {
  if (!req.body.loanDate || !req.body.returnDate) {
    res.status(400).send({ message: 'Es necesario una fecha de préstamo y devolución.' });
  }

  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    numberOfPages: req.body.numberOfPages,
    loanDate: req.body.loanDate,
    returnDate: req.body.returnDate,
  });

  book.save((err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Ha ocurrido un error al guardar el libro.' });
    } else {
      res.send(data);
    }
  });
};

function findAll(req, res) {
  Book.find((err, books) => {
    if (err) {
      res.status(500).send({ message: 'Ha ocurrido un error al obtener los libros.' });
    } else {
      res.send(books);
    }
  });
};

function findOne(req, res) {
  Book.findById(req.params.bookId, (err, data) => {
    if (err) {
      res.status(500).send({ message: `No se ha podido obtener el libro con id ${req.params.bookId}.` });
    } else {
      res.send(data);
    }
  });
};

function update(req, res) {
  Book.findById(req.params.bookId, (err, book) => {
    if (err) {
      res.status(500).send({ message: `No se pudo encontrar un libro con id ${req.params.bookId}.` });
    }

    book.name = req.body.name,
    book.author = req.body.author,
    book.numberOfPages = req.body.numberOfPages,
    book.loanDate = req.body.loanDate,
    book.returnDate = req.body.returnDate,

    book.save((err, data) => {
      if (err) {
        res.status(500).send({ message: `No se pudo actualizar el libro con id ${req.params.bookId}.` });
      } else {
        res.send(data);
      }
    });
  });
};

function deleteBook(req, res) {
  Book.remove({ _id: req.params.bookId }, (err, data) => {
    if (err) {
      res.status(500).send({ message: `No se puede eliminar el libro con id ${req.params.bookId}.` });
    } else {
      res.send({ message: 'El libro ha sido eliminado exitosamente.' });
    }
  });
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteBook,
};
