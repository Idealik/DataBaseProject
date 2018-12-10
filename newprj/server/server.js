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

        con.query("SELECT * FROM xidealo.orders",(error, result) => {
            if(error ) throw error;
            let str = JSON.stringify(result);
            res.send(str);
        });
        con.release();
    })
})

app.route('/post/order').post((req,res) =>{ 

   /* let _nameUser = req.body.nameUser;
    let _startPosition = req.body.startPosition;
    let _endPosition = req.body.endPosition;
    let _arriveTime = req.body.arriveTime;*/

    let _nameUser = "sa";
    let _startPosition = "sd";
    let _endPosition = "ss";
    let _arriveTime = 56;

    let query = 
    "INSERT INTO xidealo.orders (nameUser, startPosition, endPosition, arriveTime) VALUES ("
    + _nameUser + ", "
    + _startPosition + ", "
    + _endPosition + ", "
    + _arriveTime + ");";

    pool.getConnection((err,con) =>{
        if(err) throw err;
        con.query(query,(error, result) => {
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
    }
)