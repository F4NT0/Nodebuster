module.exports = app => {
    const movies = require("../Controllers/movie.controller");

    //New Movie
    app.post("/movies", movies.create);

    //All Movies
    app.get("/movies", movies.findAll);

    //Single Movie from id
    app.get("/movies/:id", movies.findOne);

    //Update a Movie from id
    app.put("/movies/:id", movies.update);

    //Delete a Movie from id
    app.delete("/movies/:id", movies.delete);
}