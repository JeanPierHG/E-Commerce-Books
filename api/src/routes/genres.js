const { Router } = require("express");
const Genres = require("../model/Genres");
const router = Router();

router.get("/", async function (req, res) {
  try {
    const genres = await Genres.find({}).populate("books");
    if (genres.length < 0) throw new Error("Genres not found");
    res.status(200).json(genres);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const genre = await Genres.findById(req.params.id).populate("books");
    if (genre.length < 0) throw new Error("Genres not found");
    res.status(200).json(genre);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/addGenre", async function (req, res) {
  const { genre } = req.body;
  try {
    if (genre === undefined) throw new Error("Genre must be defined");
    const newGenre = new Genres({
      genre,
    });
    await newGenre.save();
    res.status(200).send(newGenre);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
