const sql = require('./db_model_connection');
const Movie = function(movie){
    this.id_movie = movie.id_movie;
    this.title = movie.title;
    this.director = movie.director;
    this.copies = movie.copies;
}

//Create
Movie.create = (newMovie,result) => {
    sql.query("insert into movies set ?",newMovie,(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        console.log("Created movie ", {title: res.title, ...newMovie});
        result(null,{id_movie: res.insertId, ...newMovie});
    });
};

//Find by id
Movie.findById = (id,result) =>{
    sql.query(`select * from movies where id_movie = ${id}`,(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        if(res.length){
            console.log("Found movie: ", res[0]);
            result(null,res[0]);
            return;
        }
        result({kind: 'not_found'}, null);
    });
};

//Get all Movies
Movie.getAll = result => {
    sql.query('select * from movies',(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        console.log("Movies: ", res);
        result(null, res);
    });
};

//Update by ID
Movie.updateById = (id_movie,movie,result) => {
    sql.query('update movies set title = ?, director = ?, copies = ?',[movie.title,movie.director,movie.copies],(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: 'not_found'},null);
            return;
        }
        console.log("Movie Updated: ",{id: id_movie, ...movie});
        result(null,{id: id_movie, ...movie});
    });
};

//Delete
Movie.remove = (id,result) => {
    sql.query("delete from movies where id_movie = ?", id ,(err,res) => {
        if(err){
            console.log(err);
            result(err,null);
            return;
        }
        if(res.affectedRows == 0){
            result({kind: 'not_found'},null);
            return;
        }
        console.log("Movie Deleted with id: ",id);
        result(null,res);
    });
};

module.exports = Movie;