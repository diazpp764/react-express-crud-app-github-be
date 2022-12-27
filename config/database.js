let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "diazp",
  password: "HmedKerxirk764#",
  database: "db_express_api",
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Successfully connected to the database.");
  }
});

module.exports = connection;
