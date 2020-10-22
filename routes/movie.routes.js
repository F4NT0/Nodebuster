module.exports = app => {
    const movies = require("../controllers/movie.controller");

    //New Movie
    app.post("/movies", movies.create);

    //All Movies
    app.get("/movies", movies.findAll);

    //Single Movie from title
    app.get("/movies/:movieTitle", movies.findOne);

    //Update a Movie from title
    app.put("/movies/:movieTitle", movies.update);

    //Delete s Movie from id
    app.delete("/movies/:movieId", movies.delete);
}