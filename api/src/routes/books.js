const { Router } = require('express')

const Books = require('../model/Books')
const Authors = require('../model/Author')
const Genres = require('../model/Genres')
const Users = require('../model/Users')
const router = Router()

router.get('/', async function (req, res) {
  try {
    const books = await Books.find({})
      .populate({
        path: 'genres',
        select: 'genre',
      })
      .populate({ path: 'authors', select: 'name', select: { _id: 0 } })
      .populate('comments')
    return res.json(books)
  } catch (error) {
    console.log('FALLO GET BOOKS', error)
  }
})

router.get('/genre/:genre', async function (req, res) {
  const { genre } = req.params
  console.log(genre)
  try {
    if (genre) {
      const books = await Books.find({})
        .populate({
          path: 'genres',
          select: { genre: 1, _id: 0 },
        })
        .populate({
          path: 'authors',
          select: { name: 1, _id: 0, surname: 1, biography: 1 },
        })

      const booksGenres = books?.filter((e) =>
        e.genres?.find((e) => e.genre === genre)
      )

      return res.json(booksGenres)
    }
  } catch (error) {
    console.log('FALLO GENERO', error)
  }
})

router.get('/search', async function (req, res) {
  let { title, name } = req.query
  try {
    if (title) {
      title = title[0].toUpperCase() + title.slice(1)
      const booksNameFilter = await Books.find({
        title: { $regex: title },
      }).populate(['authors', 'genres'])
      res.status(200).json(booksNameFilter)
    } else if (name) {
      name = name[0].toUpperCase() + name.slice(1)
      const authorNameFilter = await Authors.find({
        name: { $regex: name },
      }).populate('books')
      res.status(200).json(authorNameFilter)
    } else {
      const books = await Books.find({}).populate(['authors', 'genres'])
      res.json(books)
    }
  } catch (err) {
    res.send(err.message)
  }
})

/* router.get("/alf/:order", async function (req, res) {
  const { order } = req.params;
  try {
    const books = await Books.find({}).populate(["authors", "genres"]);
    if (!books) throw new Error("The books not found");

    if (!order) throw new Error("The order not specified");

    const auxBooks = [...books];
    let titleBooks;
    if (order === "asc") {
      titleBooks = auxBooks.sort(sortTitle.sortAsc);
    }
    if (order === "desc") {
      titleBooks = auxBooks.sort(sortTitle.sortDesc);
    }
    res.status(200).json(titleBooks);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.get("/rating/:order", async function (req, res) {
  const { order } = req.params;
  try {
    const books = await Books.find({}).populate(["authors", "genres"]);
    if (!books) throw new Error("The books not found");

    if (!order) {
      throw new Error("The order is not specified");
    }

    const auxBooks = [...books];
    let ratingBooks;

    if (order === "asc") {
      ratingBooks = auxBooks.sort(sortRating.sortAsc);
    }
    if (order === "desc") {
      ratingBooks = auxBooks.sort(sortRating.sortDesc);
    }

    res.status(200).json(ratingBooks);
  } catch (err) {
    res.status(404).send(err.message);
  }
}); */

router.get('/:id', async function (req, res) {
  const { id } = req.params
  try {
    if (id.length !== 24) throw new Error('The id have 24 characters')
    const book = await Books.findById(id).populate(['authors', 'genres'])
    if (book === null) throw new Error('Book not found')
    res.status(200).json(book)
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.post('/addBook', async function (req, res) {
  const {
    title,
    authors,
    year,
    pages,
    editorial,
    cover,
    rating,
    stock,
    price,
    genres,
    review,
  } = req.body

  const arrayGenres = await genres.map(async (e) => {
    const getGenre = await Genres.find({ genre: e }, { genre: 1 })
    return getGenre
  })
  const genre = await Promise.all(arrayGenres)
  const aux = genre?.map((e) => e?.find((e) => e._id))
  const genreId = aux.map((e) => e._id)

  const authorDb = await Authors.find({
    name: authors.name,
    surname: authors.surname,
  })

  try {
    if (!authorDb) throw new Error('Author not found')
    const newBook = new Books({
      title,
      authors: authorDb[0]._id,
      year,
      pages,
      editorial,
      cover,
      rating,
      stock,
      price,
      genres: genreId,
      review,
    })
    await newBook.save()
    const saveBook = await Books.find({ title: title })
      .populate({
        path: 'genres',
        select: { genre: 1, _id: 0 },
      })
      .populate({
        path: 'authors',
        select: { name: 1, _id: 0, surname: 1, biography: 1 },
      })
    authorDb[0].books.push(saveBook[0]._id)
    await authorDb[0].save()

    return res.json(saveBook)
  } catch (err) {
    console.log('FALLO POST BOOKS', err.message)
  }
})

router.post('/update/:id', async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    await Books.findByIdAndUpdate(id, data, () => {
      if (!data) {
        throw new Error('Failed to update books')
      } else {
        return res.status(200).send('Success update')
      }
    })
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.delete('/deleteBook/:id', async (req, res) => {
  const { id } = req.params
  try {
    await Books.deleteOne({ _id: id })
      .populate({
        path: 'genres',
        select: 'genre',
      })
      .populate({ path: 'authors', select: 'name', select: { _id: 0 } })

    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: 'ESE LIBRO NO EXISTE' })
  }
})

router.post('/updateRating/:idBook/:rating/:userId', async (req, res) => {
  try {
    let { idBook, rating, userId } = req.params
    const book = await Books.findById(idBook)

    if (!book) return res.status(404).send('Book not found')
    const user = await Users.findById(userId)

    if (!user) return res.status(404).send('Usuario no encontrado')

    book.ratingUsers.push({ rating, user: user._id })
    user.ratingBooks.push(book._id)

    book.rating = Math.trunc(
      (book.rating + Number(rating)) / book.ratingUsers.length
    )

    const userUpdate = await user.save()
    const bookUpdate = await book.save()

    res.json({
      user: userUpdate,
      book: bookUpdate,
    })
  } catch (error) {
    res.send(error.message)
  }
})

router.get('/rating/getRating', async (req, res) => {
  try {
    const book = await Books.find()
    if (book.length === 0) throw new Error('no hay books')
    const arrayRating = book.map((b) => {
      return { book: b.title, rating: b.rating }
    })
    res.send(arrayRating)
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/hideBook/:id', async (req, res) => {
  const { id } = req.params
  try {
    if (id) {
      await Books.findByIdAndUpdate(id, { isHidden: true })
      res.send('The book is hidden now')
    }
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.post('/showBook/:id', async (req, res) => {
  const { id } = req.params
  try {
    if (id) {
      await Books.findByIdAndUpdate(id, { isHidden: false })
      res.send('The book can be seen now')
    }
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.post('/update/updateStockUp', async (req, res) => {
  const booksUpdate = req.body
  console.log('DATA', booksUpdate)
  try {
    const idsSinRepetirse = []

    booksUpdate.forEach((book) => {
      if (!idsSinRepetirse.includes(book.id)) idsSinRepetirse.push(book.id)
    })

    console.log('IDS SIN REPETIRSE', idsSinRepetirse)

    const stockSinRepetirse = []

    idsSinRepetirse.forEach((id) => {
      const array = booksUpdate.filter((e) => e.id === id)
      stockSinRepetirse.push(array[array.length - 1])
    })

    console.log('STOCK SIN REPETIRSE', stockSinRepetirse)

    stockSinRepetirse.forEach(async (data) => {
      console.log(data.id)
      console.log(data.stock)

      const book = await Books.findById(data.id)

      console.log(book)

      book.stock = book.stock + Number(data.stock)

      await book.save()
    })
    res.send('Stock agregado')
  } catch (error) {
    res.status(404).send(error.message)
  }
})
module.exports = router
