module.exports = app => {
    const movies = require("../Controllers/movie.controller");

    //New Movie
    app.post("/movies", movies.create);

    //All Movies
    app.get("/movies", movies.findAll);

    //Single Movie from title
    app.get("/movies/:id", movies.findOne);

    //Update a Movie from title
    app.put("/movies/:id", movies.update);

    //Delete s Movie from id
    app.delete("/movies/:id", movies.delete);
}