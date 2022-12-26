const mysql2 = require('mysql2')

const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password : 'jayesh@974',
  database: 'ecommerce2',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port : 3306
})

module.exports = pool