const { Router } = require("express");
const Genres = require("../model/Genres");
const router = Router();

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
