//подклчюение 
const mysql = require("mysql");

var pool = mysql.createPool({
connectionLimit: 100,
host: 'unidb.ru',
port: 3306,
user: 'Mark',
password: '18036237f75a41d68596de954bd05269',
database: 'xidealo'
})

module.exports = pool