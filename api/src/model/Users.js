const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
  name: {
    type: String,
  },
  nickname:{
    type:String
  },
  password:{
    type:String
  },
  articles:[{
    type:[Schema.Types.ObjectId],
    ref:'Libros'
  }]
  
});

module.exports = model("Users", usersSchema);
