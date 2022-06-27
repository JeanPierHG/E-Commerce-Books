const server = require("./src/app.js");

require("./src/db");

server.listen(process.env.PORT || 3001, () => {
  console.log("%s listening at 3001");
});
