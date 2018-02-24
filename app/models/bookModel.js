const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  numberOfPages: Number,
  loanDate: Date,
  returnDate: Date,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Book', BookSchema);
