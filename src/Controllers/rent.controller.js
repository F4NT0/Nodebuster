const Rent = require("../Models/rent.model");

//Create
exports.create = (req,res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content are empty!"
        });
    };

    //new
    const rent = new Rent({
        id_rent: req.body.id_rent,
        numeric_movies: req.body.numeric_movies,
        devolution_date: req.body.devolution_date,
        id_client: req.body.id_client,
        id_movie: req.body.id_movie
    });

    //save on db
    Rent.create(rent,(err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Error on rent creation!"
            });
        }
        res.send(data);
    });
};

//Find All
exports.findAll = (req,res) => {
    Rent.getAll((err,data) => {
        if(err){
            res.status(500).send({
                message: err.message || "Error on getting all rents!"
            });
        }
        res.send(data);
    });
};

//Find One
exports.findOne = (req,res) => {
    Rent.findById(req.params.id, (err,data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `No rent with id ${req.params.id}`
                });
            }else{
                res.status(505).send({
                    message: `Error getting rent with id ${req.params.id}`
                });
            }
        }else {
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

    Rent.updateById(req.params.id_rent,new Rent(req.body),(err,data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `No rent with title ${req.params.id_rent}`
                });
            }else{
                res.status(505).send({
                    message: `Error updating rent with ID ${req.params.id_rent}`
                });
            }
        }else{ 
            res.send(data);
        }
    })
};

//Delete
exports.delete = (req,res) => {
    Rent.remove(req.params.id,(err,data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `No rent with id ${req.params.id}`
                });
            }else{
                res.status(505).send({
                    message: `Error deleting rent with id ${req.params.id} `
                });
            }
        } else{
            res.send({
                message: `Rent was deleted Sucessfully!`
            });
        }
    });
};