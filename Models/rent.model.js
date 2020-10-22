const sql = require('./db_model_connection');
const Rent = function(rent){
    this.id_rent = rent.id_rent;
    this.numeric_movies = rent.numeric_movies;
    this.devolution_date = rent.devolution_date;
    this.id_client = rent.id_client;
    this.id_movie = rent.id_movie;
}

//Create
Rent.create = (newRent,result) => {
    sql.query("insert into rents set ?",newRent,(err,res) => {
        if(err){console.log(err);result(err,null);return;}

        console.log("Created Rent ", {id_rent: res.ir_rent, ...newRent});
        result(null,{id_rent: res.insertId, ...newRent});
    });
};

//Find by ID
Rent.findById = (id,result) =>{
    sql.query(`select * from rents where id_rent = ${id}`,(err,res) => {
        if(err){console.log(err);result(err,null);return;}
        if(res.length){
            console.log("Found Rent: ", res[0]);
            result(null,res[0]);
            return;
        }
        result({kind: 'not_found'}, null);
    });
};

//Get all 
Rent.getAll = result => {
    sql.query('select * from rents',(err,res) => {
        if(err){console.log(err);result(err,null);return;}
        console.log("Rents: ", res);
        result(null, res);
    });
};

//Update by ID
Rent.updateById = (id_rent,rent,result) => {
    sql.query('update rents set numeric_movies = ?, devolution_date = ?, id_client = ?, id_movie = ?',[rent.numeric_movies,rent.devolution_date,rent.id_client,rent.id_movie],(err,res) => {
        if(err){console.log(err);result(err,null);return;}
        if(res.affectedRows == 0){result({kind: 'not_found'},null);return;}
        console.log("Rent Updated: ",{id: id_rent, ...rent});
        result(null,{id: id_rent, ...rent});
    });
};

//Delete
Rent.remove = (id,result) => {
    sql.query("delete from rents where id_rent = ?", id ,(err,res) => {
        if(err){console.log(err);result(err,null);return;}
        if(res.affectedRows == 0){result({kind: 'not_found'},null);return;}
        console.log("Rent Deleted with id: ",id);
        result(null,res);
    });
};

module.exports = Rent;