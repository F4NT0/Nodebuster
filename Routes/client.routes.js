module.exports = app => {
    const clients = require("../Controllers/client.controller");

    //New Client
    app.post("/clients", clients.create);

    // All Clients
    app.get("/clients", clients.findAll);

    // Single Client from id
    app.get("/clients/:id", clients.findOne);

    //Update a Client from id
    app.put("/clients/:id", clients.update);

    //Delete a Client from id
    app.delete("/clients/:id", clients.delete);
}