const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Main Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Nodebuster, the last Blockbuster alive!"});
});

//Route movie import
require("./Routes/movie.routes")(app);
require("./Routes/client.routes")(app);
require("./Routes/rent.routes")(app);
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
