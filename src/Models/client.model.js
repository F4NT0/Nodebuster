const sql = require('./db_model_connection');

const Client = function(client){
    this.id_client = client.id_client;
    this.client_name = client.client_name;
    this.client_pass = client.client_pass;
    this.email = client.email;
}

//Create
Client.create = (newClient,result) => {
    sql.query("insert into clients set ?",newClient,(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        console.log("Created Client ", {client_name: res.client_name, ...newClient});
        result(null,{id_client: res.insertId, ...newClient});
    });
};

//Find by ID
Client.findById = (id,result) =>{
    sql.query(`select * from clients where id_client = ${id}`,(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("Found client: ", res[0]);
            result(null,res[0]);
            return;
        }
        result({kind: 'not_found'}, null);
    });
};

//Get all 
Client.getAll = result => {
    sql.query('select * from clients',(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        console.log("Clients: ", res);
        result(null, res);
    });
};

//Update by ID
Client.updateById = (id_client,client,result) => {
    sql.query('update clients set client_name = ?, client_pass = ?, email = ?',[client.client_name,client.client_pass,client.email],(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: 'not_found'},null);
            return;
        }
        console.log("Client Updated: ",{id: id_client, ...client});
        result(null,{id: id_client, ...client});
    });
};

//Delete
Client.remove = (id,result) => {
    sql.query("delete from clients where id_client = ?", id ,(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: 'not_found'},null);
            return;
        }
        console.log("Client Deleted with id: ",id);
        result(null,res);
    });
};

module.exports = Client;