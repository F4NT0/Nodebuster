const sql = require('../Database/mysql_connection');

const Movie = function(movie){
    this.id_movie = movie.id_movie;
    this.title = movie.title;
    this.director = movie.director;
    this.copies = movie.copies;
}

//Create
Movie.create = (newMovie,res) => {
    sql.query("insert into movies set ?",newMovie,(err,res) => {
        if(err){console.log(err);result(err,null);return;}

        console.log("Created movie ", {title: res.title, ...newMovie});
        result(null,{id_movie: res.insertId, ...newMovie});
    });
};

//Find by Name
Movie.findByName = (title,res) =>{
    sql.query(`select * from movies where title = ${title}`,(err,res) => {
        if(err){console.log(err);result(err,null);return;}
        if(res.length){
            console.log("Found movie: ", res[0]);
            result(null,res);
            return;
        }
        result({kind: 'not_found'}, null);
    });
};

//Get all Movies
Movie.getAll = res => {
    sql.query('select * from customers',(err,res) => {
        if(err){console.log(err);result(err,null);return;}
        console.log("Movies: ", res);
        result(null, res);
    });
};

//Update
Movie.updateByName = (title,movie,res) => {
    sql.query('update customers set id_movie = ?, title = ?, director = ?, copies = ?',[movie.id_movie,movie.title,movie.director,movie.copies],(err,res) => {
        if(err){console.log(err);result(err,null);return;}
        if(res.affectedRows == 0){result({kind: 'not_found'},null);return;}
        console.log("Movie Updated: ",{title: title, ...movie});
        result(null,{title: title, ...movie});
    });
};

//Delete
Movie.remove = (id,result) => {
    sql.query("delete from movies where id = ?", id ,(err,res) => {
        if(err){console.log(err);result(err,null);return;}
        if(res.affectedRows == 0){result({kind: 'not_found'},null);return;}
        console.log("Movie Deleted with id: ",id);
        result(null,res);
    });
};

module.exports = Movie;