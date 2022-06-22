require("dotenv").config();
const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD } = process.env;

console.log(DB_USER, DB_PASSWORD);

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@proyectodb.dhicigr.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri).catch((err) => {
  console.log("ERROR AL CONECTAR", err);
});

const db = mongoose.connection;

db.on("open", (_) => {
  console.log("conectado a ", uri);
});
db.on("error", (err) => {
  console.log("error en db", err);
});
