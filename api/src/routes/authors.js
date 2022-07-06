const { Router } = require('express')
const router = Router()
const Author = require('../model/Author')
const Books = require('../model/Books')

router.get('/', async (req, res) => {
  try {
    const author = await Author.find({}).populate('books', {
      title: 1,
      cover: 1,
      _id: 1,
    })
    if (!author) throw new Error('No author found')
    res.status(200).json(author)
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.get('/search/:name', async function (req, res) {
  let { name } = req.params
  name = name[0].toUpperCase() + name.slice(1)
  try {
    if (name) {
      const authorNameFilter = await Author.find({
        name: { $regex: name },
      }).populate('books', { title: 1, cover: 1 })
      res.status(200).json(authorNameFilter)
    } else {
      const author = await Author.find({}).populate('books')
      if (!author) throw new Error('No authors found')
      res.status(200).json(author)
    }
  } catch (err) {
    res.send(err.message)
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    if (id.length !== 24) throw new Error('The id have 24 characters')
    const author = await Author.findById(id).populate('books')
    if (!author) throw new Error('No author found')
    res.status(200).json(author)
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.get('/:id/books', async (req, res) => {
  const { id } = req.params
  try {
    const getAuthor = await Author.findById(id)
      .populate('books')
      .catch(() => {
        throw new Error('No author found')
      })
    if (getAuthor.books.length <= 0) throw new Error('No books found')
    const authorBooks = getAuthor.books
    res.status(200).json(authorBooks)
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.post('/addAuthor', async (req, res) => {
  const { name, surname, birth, country, picture, biography } = req.body

  try {
    const getAuthor = await Author.find({
      name: name,
      surname: surname,
    })

    if (getAuthor.length > 0) throw new Error('Author is already exists')

    const newAuthor = new Author({
      name,
      surname,
      birth,
      country,
      picture,
      biography,
    })
    const authorSave = await newAuthor.save()

    res.status(200).json(authorSave)
  } catch (err) {
    res.status(404).send(err.message)
  }
})
router.post('/update/:id', async (req, res) => {
  const data = req.body
  const { id } = req.params

  try {
    const authorUpDte = await Author.findByIdAndUpdate(
      { _id: id },
      data,
      () => {
        if (!data) {
          return res.json({ msg: 'no realizaste acctualizacion' })
        } else {
          return res.json({ msg: 'actualizacion exitosa' })
        }
      }
    )

    return res.json(authorUpDte)
  } catch (error) {
    console.log('FALLO EL UPDATE', error)
  }
})

router.delete('/deleteAuthor/:id', async (req, res) => {
  const { id } = req.params
  try {
    const Autor = await Author.findOne({ _id: id }).populate('books')
    const books = await Books.find({ authors: Autor })
      .populate({
        path: 'genres',
        select: 'genre',
      })
      .populate({ path: 'authors', select: 'name', select: { _id: 0 } })

    const deleteBooks = await Books.deleteMany({ authors: Autor })
      .populate({
        path: 'genres',
        select: 'genre',
      })
      .populate({ path: 'authors', select: 'name', select: { _id: 0 } })

    const deleteAutor = await Author.deleteOne({ _id: id }).populate('books')

    if (!books) {
      res.send('No hay libros de este autor')
    } else {
      res.json(deleteBooks).send('Libros del autor borrados')
    }

    if (!Autor) {
      res.send('No existe el autor')
    } else {
      res.json(deleteAutor).send('Autor borrado')
    }
  } catch {
    res.status(404)
    res.send({ error: 'ESE AUTOR NO EXISTE' })
  }
})

//
//   "name":
//   "surname":
//   "birth":
//   "country":
//   "picture":
//   "biography":

router.post('/hideAuthor/:id', async (req, res) => {
  const { id } = req.params
  try {
    if (id) {
      const Autor = await Author.findOne({ _id: id }).populate('books')
      await Author.findByIdAndUpdate(id, { isHidden: true }).populate('books')
      await Books.updateMany({ authors: Autor }, { isHidden: true })
        .populate({
          path: 'genres',
          select: 'genre',
        })
        .populate({ path: 'authors', select: 'name', select: { _id: 0 } })

      res.send('The author and his books are hidden now')
    }
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.post('/showAuthor/:id', async (req, res) => {
  const { id } = req.params
  try {
    if (id) {
      const Autor = await Author.findOne({ _id: id }).populate('books')
      await Author.findByIdAndUpdate(id, { isHidden: false }).populate('books')
      await Books.updateMany({ authors: Autor }, { isHidden: false })
        .populate({
          path: 'genres',
          select: 'genre',
        })
        .populate({ path: 'authors', select: 'name', select: { _id: 0 } })

      res.send('The author and his books can be seen now')
    }
  } catch (err) {
    res.status(404).send(err.message)
  }
})

module.exports = router
