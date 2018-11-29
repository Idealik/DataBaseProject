const express = require("express");
const app = express();

//слушаем по адресу
 //req - параметр от клиента, res - ответ сервера
 // => сокращение для function
app.route('/').get((req,res) =>{
    res.send('Hello world');
})

app.route('/:group').get((req,res) =>{
    let group = req.params["group"];
    res.send('Hello: ' + group);
})


/*app.route('/:group/:name').get((req,res) =>{
    let group = req.params["group"];
    let name = req.params["name"];
    res.send('Hello :' + name + group);
})*/

//сервер слушает по порту
//8080 серверный порт
app.listen(8080, () => {
console.log('server lisnet');


//nodemon позвоялет изменять страницу без обновления
})