const mysql = require("mysql2");

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "nehasrii@5i8",
    database: "vehicledb"

});

db.connect((err) => {

    if(err){

        console.log(err);

    }
    else{

        console.log("MySQL Connected");

    }

});

module.exports = db;