const { Router } = require("express");
const Books = require("../model/Books");
const Author = require("../model/Author");
const Genres = require("../model/Genres");
const router = Router();

router.get("/", async function (req, res) {
  try {
    const books = await Books.find({})
      .populate({
        path: "genres",
        select: "genre",
      })
      .populate({ path: "authors", select: "name", select: { _id: 0 } });
    return res.json(books);
  } catch (error) {
    console.log("FALLO GET BOOKS", error);
  }
});

router.get("/genre/:genre", async function (req, res) {
  const { genre } = req.params;
  console.log(genre);
  try {
    if (genre) {
      const books = await Books.find({})
        .populate({
          path: "genres",
          select: { genre: 1, _id: 0 },
        })
        .populate({
          path: "authors",
          select: { name: 1, _id: 0, surname: 1, biography: 1 },
        });

      const booksGenres = books?.filter((e) =>
        e.genres?.find((e) => e.genre === genre)
      );

      return res.json(booksGenres);
    }
  } catch (error) {
    console.log("FALLO GENERO", error);
  }
});

router.get("/search", async function (req, res) {
  let { title, name } = req.query;
  try {
    if (title) {
      title = title[0].toUpperCase() + title.slice(1);
      const booksNameFilter = await Books.find({
        title: { $regex: title },
      }).populate(["authors", "genres"]);
      res.status(200).json(booksNameFilter);
    } else if (name) {
      name = name[0].toUpperCase() + name.slice(1);
      const authorNameFilter = await Author.find({
        name: { $regex: name },
      }).populate("books");
      res.status(200).json(authorNameFilter);
    } else {
      const books = await Books.find({}).populate(["authors", "genres"]);
      res.json(books);
    }
  } catch (err) {
    res.send(err.message);
  }
});

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
    res.send("FALLO POST BOOKS", err.message);
  }
});

router.delete("/deleteBook/:id", async (req, res) => {
	const {id} = req.params
  try {
		await Books.deleteOne({ _id: id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "ESE LIBRO NO EXISTE" })
	}
})

module.exports = router;
