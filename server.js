// Dependencies

const express = require("express");
const app = express();
//const path = require("path");

//Setting an initial port
const PORT = 8080;

//Setting up app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
