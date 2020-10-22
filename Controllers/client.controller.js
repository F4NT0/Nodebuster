const Client = require("../Models/client.model");

//Create
exports.create = (req,res) => {
    if(!req.body){res.status(400).send({message: "Content are empty!"});};

    //new
    const client = new Client({
        id_client: req.body.id_client,
        client_name: req.body.client_name,
        client_pass: req.body.client_pass,
        email: req.body.email
    });

    //save on db
    Client.create(client,(err,data) => {
        if(err){res.status(500).send({message: err.message || "Error on client creation!"});};
        res.send(data);
    });
};

//Find All
exports.findAll = (req,res) => {
    Client.getAll((err,data) => {
        if(err){res.status(500).send({message: err.message || "Error on getting all clients!"});};
        res.send(data);
    });
};

//Find One
exports.findOne = (req,res) => {
    Client.findById(req.params.id, (err,data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({message: `No client with id ${req.params.id}`});
            }else{
                res.status(505).send({message: `Error getting client with id ${req.params.id}`});
            }
        } else res.send(data);
    });
};

//Update
exports.update = (req,res) => {
    if(!req.body){res.status(400).send({message: "Content are Empty!"});};

    Client.updateById(req.params.id_client,new Client(req.body),(err,data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({message: `No client with title ${req.params.id_client}`});
            }else{
                res.status(505).send({message: `Error updating client with ID ${req.params.id_client}`});
            }
        } else res.send(data);
    })
};

//Delete
exports.delete = (req,res) => {
    Client.remove(req.params.id,(err,data) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({message: `No client with id ${req.params.id}`});
            }else{
                res.status(505).send({message: `Error deleting client with id ${req.params.id} `});
            }
        } else res.send({message: `Client was deleted Sucessfully!`});
    })
};