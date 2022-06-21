const { Router } = require("express");
const Books = require("../model/Books");
const Author = require("../model/Author");
const Genres = require("../model/Genres");
const sortRating = require("../utils/SortsRating");
const sortTitle = require("../utils/SortTitle");
const router = Router();

router.get('/', async (req,res) => {
  const books = await Books.find({}).populate(["authors", "genres"]);
  res.json(books);
})

router.get("/search", async function (req, res) {
  const {title, name} = req.query;
  try{
    
    if (title){
      const booksNameFilter = await Books.find({title: title}).populate(["authors", "genres"]);
      res.status(200).json(booksNameFilter)
    } else if(name) {
        const authorNameFilter = await Author.find({name: name}).populate("books");
        res.status(200).json(authorNameFilter)
    } else {
      const books = await Books.find({}).populate(["authors", "genres"]);
      res.json(books);
    }
    
  } catch (err){
    res.send(err.message);  
  }
});

router.get('/search/:title', async function (req,res){
  const {title} = req.params;
  try{
    if (title){
      const booksNameFilter = await Books.find({title: title}).populate(["authors", "genres"]);
      res.status(200).json(booksNameFilter)
    } else{
      const books = await Books.find({}).populate(["authors", "genres"]);
      res.json(books);
    }
  } catch(err){
    res.send(err.message)
  }
})

router.get("/alf/:order", async function (req, res) {
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
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    if (id.length !== 24) throw new Error("The id have 24 characters");
    const book = await Books.findById(id);
    if (book === null) throw new Error("Book not found");
    res.status(200).json(book);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.post("/addBook", async function (req, res) {
  const {
    title,
    author,
    year,
    pages,
    editorial,
    cover,
    rating,
    stock,
    price,
    genres,
    review,
  } = req.body;

  const arrayGenres = genres.map(async (genre) => {
    const getGenre = await Genres.findById(genre);
    return getGenre._id;
  });

  try {
    const getAuthor = await Author.findById(author);
    if (getAuthor === null) throw new Error("Author not found");
    const newBook = new Books({
      title,
      authors: getAuthor._id,
      year,
      pages,
      editorial,
      cover,
      rating,
      stock,
      price,
      genres: await Promise.all([...arrayGenres]),
      review,
    });

    const newBookSaved = await newBook.save();
    getAuthor.books.push(newBookSaved._id);
    await getAuthor.save();

    genres.forEach(async (genre) => {
      const getGenre = await Genres.findById(genre);
      getGenre.books.push(newBookSaved._id);
      await getGenre.save();
    });

    res.send(newBookSaved);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
