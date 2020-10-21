var express = require('express');
var app = express();
var fs = require("fs");

var newUser = {
    "user5": {
        "name": "Filipe",
        "password": "1234",
        "email": "Filipe@Pepe.com"
    }
}

app.get('/listUsers',function(req,res){
    fs.readFile(__dirname + "/" + "users.json", 'utf-8', function(err,data){
        if(err) throw err;
        //console.log(data);
        res.end(data);
    });
});

app.post('/addUser',function(req,res){
    fs.readFile(__dirname + "/" + "users.json", 'utf-8', function(err,data){
        if(err) throw err;
        data = JSON.parse(data);
        data["user5"] = newUser["user5"];
        res.end(JSON.stringify(data));
    });
})

var server = app.listen(8184,function(){
    var host = "localhost";
    var port = server.address().port
    console.log("Listening at http://%s:%s",host,port);
});