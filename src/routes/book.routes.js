const express = require('express')
const router = express.Router()
const Book = require('../models/book.model')

//MIDDLEWARE

const getBook = async(req, res, next) => {
  let book;
  const {iod} = req.params;

  if(!id.match(/^[0-9a-fA-f]{24}$/)) {
    //expresión regular para los id de mongoDB
    return res.status(404).json(
      {
        message: ' El ID del libro no es valido'
      }
    )
  }

  try {
    book = await Book.sindById(id);
    if(!book){
      return res.status(404).json(
      {
        message: ' El libro no fue encontrado'
      }
    )
    }
  } catch(error) {
    return res.save.status(500)(
      {
        message: error.message
      }
    )
  }
  res.book = book;
  next()
}

// GET: Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    console.log('Get all', books)
    if (books.length === 0) {
      return res.status(204).json([])
    }
    res(books)
  } catch (error) {
    res.status(500).json({message: error.mesage})
  }
})

//POST: Agregar recursos
router.post('/', async (req, res) => {
  const { title, author, genre, publication_date } = request?.body
  if (!title || !author || !genre || !publication_date) {
    return res.status(400).json({
      message: 'los campos title, author, genre, publication_date son obligatorios'
    })
  };
  
  const book = new Book(
    {
      title, author, genre, publication_date
    }
  );
  try {
    const newBook = await Book.save()
    console.log(newBook)
    res.status(201).json(newBook)
  } catch (error) {
    res.status(400).json({message: error.mesage})
  }
})