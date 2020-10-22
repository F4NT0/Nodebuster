var mysql = require('mysql');
var color = require('cli-color');
var fs = require('fs');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "senha",
    database: "nodebuster"
});

connection.connect(function(err){
    if(err) throw err;
    console.log(color.green("MySQL Connected!"));

    //Create database from file
    fs.readFile(__dirname + "/" + "db_build.sql",'utf-8',function(err,data){
        if(err) throw err;
        var lines = data.split("\n");
        for(var i = 0 ; i < lines.length ; i++){
            connection.query(lines[i],function(err,res){
                if(err) throw err;
            });
            console.log(color.yellow(lines[i]));
        }
    });
    console.log(color.blue("Database created!"));
});

connection.end();

