import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [ownerName, setOwnerName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");

  const [vehicles, setVehicles] = useState([]);

  // ADD VEHICLE
  const addVehicle = () => {

    axios.post(
      "http://localhost:5000/addVehicle",
      {
        ownerName,
        vehicleNumber,
        vehicleType,
        brand,
        model,
        registrationDate
      }
    )
    .then(() => {

      getVehicles();

      setOwnerName("");
      setVehicleNumber("");
      setVehicleType("");
      setBrand("");
      setModel("");
      setRegistrationDate("");

    });

  };

  // FETCH VEHICLES
  const getVehicles = () => {

    axios.get("http://localhost:5000/getVehicles")
    .then((res) => {

      setVehicles(res.data);

    });

  };

  // DELETE VEHICLE
  const deleteVehicle = (id) => {

    axios.delete(
      `http://localhost:5000/deleteVehicle/${id}`
    )
    .then(() => {

      getVehicles();

    });

  };

  useEffect(() => {

    getVehicles();

  }, []);

  return (

    <div className="container">

      <div className="form-box">

        <h1>
          Smart Vehicle Registration
        </h1>

        <p>
          Register and manage vehicles
        </p>

        <input
          type="text"
          placeholder="Owner Name"
          value={ownerName}
          onChange={(e) =>
            setOwnerName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChange={(e) =>
            setVehicleNumber(e.target.value)}
        />

        <select
          value={vehicleType}
          onChange={(e) =>
            setVehicleType(e.target.value)}
        >

          <option value="">
            Select Vehicle Type
          </option>

          <option>
            Car
          </option>

          <option>
            Bike
          </option>

          <option>
            Truck
          </option>

        </select>

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)}
        />

        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) =>
            setModel(e.target.value)}
        />

        <input
          type="date"
          value={registrationDate}
          onChange={(e) =>
            setRegistrationDate(e.target.value)}
        />

        <button onClick={addVehicle}>
          Add Vehicle
        </button>

      </div>

      <div className="vehicle-list">

        {
          vehicles.map((v) => (

            <div className="card" key={v.id}>

              <h2>
                {v.ownerName}
              </h2>

              <p>
                Vehicle No:
                {v.vehicleNumber}
              </p>

              <p>
                Type:
                {v.vehicleType}
              </p>

              <p>
                Brand:
                {v.brand}
              </p>

              <p>
                Model:
                {v.model}
              </p>

              <p>
                Date:
                {v.registrationDate}
              </p>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteVehicle(v.id)}
              >
                Delete
              </button>

            </div>

          ))
        }

      </div>

    </div>

  );
}

export default App;