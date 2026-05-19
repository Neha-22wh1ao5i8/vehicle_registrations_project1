const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./db");

app.use(cors());
app.use(express.json());


// ADD VEHICLE
app.post("/addVehicle", (req, res) => {

    const {
        ownerName,
        vehicleNumber,
        vehicleType,
        brand,
        model,
        registrationDate
    } = req.body;

    const sql =
    `INSERT INTO vehicles
    (ownerName, vehicleNumber, vehicleType,
    brand, model, registrationDate)
    VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [
            ownerName,
            vehicleNumber,
            vehicleType,
            brand,
            model,
            registrationDate
        ],
        (err, result) => {

            if(err){

                console.log(err);

                res.json(err);

            }
            else{

                res.json({
                    message: "Vehicle Added"
                });

            }

        }
    );

});


// GET VEHICLES
app.get("/getVehicles", (req, res) => {

    const sql = "SELECT * FROM vehicles";

    db.query(sql, (err, result) => {

        if(err){

            console.log(err);

            res.json(err);

        }
        else{

            res.json(result);

        }

    });

});


// DELETE VEHICLE
app.delete("/deleteVehicle/:id", (req, res) => {

    const id = req.params.id;

    const sql =
    "DELETE FROM vehicles WHERE id=?";

    db.query(sql, [id], (err, result) => {

        if(err){

            console.log(err);

            res.json(err);

        }
        else{

            res.json({
                message: "Vehicle Deleted"
            });

        }

    });

});

app.listen(5000, () => {

    console.log("Server Running");

});