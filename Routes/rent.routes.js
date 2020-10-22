module.exports = app => {
    const rents = require("../Controllers/rent.controller");

    //New Rent
    app.post("/rents", rents.create);

    //All Rents
    app.get("/rents", rents.findAll);

    // Single Rent from id
    app.get("/rents/:id", rents.findOne);

    //Update a Rent from id
    app.put("/rents/:id", rents.update);

     //Delete a Rent from id
     app.delete("/rents/:id", rents.delete);    
}