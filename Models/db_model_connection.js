var mysql = require('mysql');
var color = require('cli-color');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "senha",
    database: "nodebuster"
});

connection.connect(function(err){
    if(err) throw err;
    console.log(color.green("MySQL Connected!"));
});

module.exports = connection;