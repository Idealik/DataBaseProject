const express = require("express");
const app = express();
//подключаем файл
var pool = require('./config');

//слушаем по адресу
 //req - параметр от клиента, res - ответ сервера
 // => сокращение для function
/*app.route('/').get((req,res) =>{
    res.send('Hello world');
})*/

app.route('/hello/:group').get((req,res) =>{
    let group = req.params["group"];
    res.send('Hello: ' + group);
})

app.route('/get').get((req,res) =>{
    pool.getConnection((err,con) =>{
        if(err) throw err;

        con.query("SELECT * FROM new_table",(error, result) => {
            if(error ) throw error;
            res.send(result);

        });

        con.release();
    })
})
app.route('/get/:newname').get((req,res) =>{

    let newname = req.params["newname"];

    pool.getConnection((err,con) =>{
        if(err) throw err;

        con.query("INSERT into new_table(name) values (?)",[newname],(error, result) => {
            if(error ) throw error;
            res.send(result);

        });

        con.release();
    })
})

//сервер слушает по порту
//8080 серверный порт
app.listen(8080, () => {
console.log('server lisnet');


//nodemon позвоялет изменять страницу без обновления
})