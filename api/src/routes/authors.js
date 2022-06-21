const { Router } = require("express");
const router = Router();
const Author = require("../model/Author");
const Books = require("../model/Books");

router.get("/", async (req, res) => {
  try {
    const author = await Author.find({}).populate("books");
    if (!author) throw new Error("No author found");
    res.status(200).json(author);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.get("/:id/books", async (req, res) => {
  const { id } = req.params;
  try {
    const getAuthor = await Author.findById(id)
      .populate("books")
      .catch(() => {
        throw new Error("No author found");
      });
    if (getAuthor.books.length <= 0) throw new Error("No books found");
    const authorBooks = getAuthor.books;
    res.status(200).json(authorBooks);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.post("/addAuthor", async (req, res) => {
  const { name, surname, birth, country, picture, biography } = req.body;

  try {
    const getAuthor = await Author.find({
      name: name,
      surname: surname,
    });

    if (getAuthor.length > 0) throw new Error("Author is already exists");

    const newAuthor = new Author({
      name,
      surname,
      birth,
      country,
      picture,
      biography,
    });
    await newAuthor.save();
    res.status(200).json(newAuthor);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
