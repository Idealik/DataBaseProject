const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//подключаем файл
var pool = require("./config");

//слушаем по адресу
//req - параметр от клиента, res - ответ сервера
// => сокращение для function

app.route("/").get((req, res) => {
  res.send("hi");
});

app.route("/get/orders").get((req, res) => {
  pool.getConnection((err, con) => {
    if (err) throw err;

    con.query("SELECT * FROM xidealo.orders", (error, result) => {
      if (error) throw error;
      let str = JSON.stringify(result);
      res.send(str);
    });
    con.release();
    //con.query("SELECT * FROM ?? where id = ? or name = ?", [table, id, name] ,(error, result) => {
  });
});

app.route("/post/order").post((req, res) => {
  let phoneUser = req.body.phoneUser;
  let startPosition = req.body.startPosition;
  let endPosition = req.body.endPosition;
  let arriveTime = req.body.arriveTime;

  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(
      "INSERT INTO `xidealo`.`orders` (`phoneUser`, `startPosition`, `endPosition`, `arriveTime`) VALUES (?, ?, ?, ?)",
      [phoneUser, startPosition, endPosition, arriveTime],
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
    con.release();
  });
});

app.route("/post/acceptOrder").post((req, res) => {
  let idOrder = req.body.idOrder;
  let idTaxiDriver = req.body.idTaxiDriver;
  let status = req.body.status;
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(
      "INSERT INTO `xidealo`.`acceptOrders` (`idOrder`, `idTaxiDriver`, `status`) VALUES (?, ?, ?)",
      [idOrder, idTaxiDriver, status],
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
    con.release();
  });
});

app.route("/put/startMove").put((req, res) => {
  let status = req.body.status;
  let idTaxiDriver = req.body.idTaxiDriver;
  // где стату равен 0 и такое же айди таксита, получается что запрос в обработке и не будет путаницы
  pool.getConnection((err, con) => {
    if (err) throw err;
    con.query(
      "UPDATE `xidealo`.`acceptOrders` SET `status` = ? WHERE `status` = '0' and (`idTaxiDriver` = ?)",
      [status, idTaxiDriver],
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
    con.release();
  });
});

app.route("/get/checkMyStatus").get((req, res) => {
  pool.getConnection((err, con) => {
    if (err) throw err;

    con.query(
      "SELECT status, idOrder FROM xidealo.acceptOrders",
      (error, result) => {
        if (error) throw error;
        res.send(result);
      }
    );
    con.release();
  });
});

//сервер слушает по порту
//8080 серверный порт
app.listen(8080, () => {
  console.log("server lisnet");
  //nodemon позвоялет изменять страницу без обновления
});
