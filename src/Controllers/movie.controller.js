const Movie = require("../Models/movie.model");

//Create
exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content are empty!"
        });
    };

    //new
    const movie = new Movie({
        id_movie: req.body.id_movie,
        title: req.body.title,
        director: req.body.director,
        copies: req.body.copies
    });

    //save on db
    Movie.create(movie,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Error on movie creation!"
            });
        };
        res.send(data);
    });
};

//Find All
exports.findAll = (req,res) => {
    Movie.getAll((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Error on getting all movies!"
            });
        };
        res.send(data);
    });
};

//Find One
exports.findOne = (req,res) => {
    Movie.findById(req.params.id, (err,data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `No movie with id ${req.params.id}`
                });
            }else{
                res.status(505).send({
                    message: `Error getting movie with id ${req.params.id}`
                });
            }
        }else{ 
            res.send(data);
        }
    });
};

//Update
exports.update = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content are Empty!"
        });
    };

    Movie.updateById(req.params.id_movie,new Movie(req.body),(err,data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `No movie with title ${req.params.id_movie}`
                });
            }else{
                res.status(505).send({
                    message: `Error updating movie with ID ${req.params.id_movie}`
                });
            }
        }else{ 
            res.send(data);
        }
    });
};

//Delete
exports.delete = (req,res) => {
    Movie.remove(req.params.id,(err,data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `No movie with id ${req.params.id}`
                });
            }else{
                res.status(505).send({
                    message: `Error deleting movie with id ${req.params.id}`
                });
            }
        }else{ 
            res.send({message: `Movie was deleted Sucessfully!`});
        }
    });
};