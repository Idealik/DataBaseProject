const express = require("express");
const cors  = require('cors')
const bodyParser = require('body-parser')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//подключаем файл
var pool = require('./config');

//слушаем по адресу
 //req - параметр от клиента, res - ответ сервера
 // => сокращение для function

app.route('/').get((req,res) =>{
    res.send("hi");
})

app.route('/get').get((req,res) =>{
    pool.getConnection((err,con) =>{
        if(err) throw err;

        con.query("SELECT * FROM users",(error, result) => {
            if(error ) throw error;
            let str = JSON.stringify(result);
            res.send(str);
        });
        con.release();
    })
})



app.route('/get/:newname').get((req,res) =>{

    let newname = req.params["newname"];

    pool.getConnection((err,con) =>{
        if(err) throw err;
        con.query("INSERT into users(name) values (?)",[newname],(error, result) => {
            if(error ) throw error;
            let str = JSON.stringify(result);
            res.send(str);
        });

        con.release();
    })
})

    //сервер слушает по порту
    //8080 серверный порт
    app.listen(8080, () => {
    console.log('server lisnet');
    //nodemon позвоялет изменять страницу без обновления
    }
)