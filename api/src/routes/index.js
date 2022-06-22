const { Router } = require("express");
const router = Router();

const books = require("./books");
const authors = require("./authors");
const genres = require("./genres");
router.use("/books", books);
router.use("/authors", authors);
router.use("/genres", genres);

module.exports = router;
