import React, { useState, useEffect } from "react";
import styles from "../styles/Modal.module.scss";

function Modal({ onConfirm, onClose, wash }) {
  const [selectedVehicle, setSelectedVehicle] = useState(wash ? wash.type : "");
  const [price, setPrice] = useState(wash ? wash.price : "");
  const [details, setDetails] = useState(wash ? wash.details : "");

  useEffect(() => {
    if (!wash) {
      // Actualiza el precio basado en el vehículo seleccionado solo si no es un lavado existente
      const getPrice = (vehicle) => {
        if (vehicle === "Car") return 10000;
        if (vehicle === "Pickup") return 12000;
        if (vehicle === "Moto") return 6000;
        return "";
      };
      setPrice(getPrice(selectedVehicle));
    }
  }, [selectedVehicle, wash]);

  const handleConfirm = () => {
    if (selectedVehicle) {
      const newWash = {
        type: selectedVehicle,
        price: price.toLocaleString("en-US"),
        details,
        datetime: wash ? wash.datetime : new Date().toISOString(), // Usar la fecha existente o crear una nueva
      };
      onConfirm(newWash); // Pasa los datos al componente `Washes`
    }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h1>{wash ? "Editar Lavado" : "Seleccione el tipo de vehículo"}</h1>

          <div className={styles.vehicles}>
            <button
              className={`${styles.btn_vehicle} ${
                selectedVehicle === "Car" ? styles.selected : ""
              }`}
              onClick={() => setSelectedVehicle("Car")}
            >
              <img src="src/assets/images/logo_car.png" alt="car" />
            </button>

            <button
              className={`${styles.btn_vehicle} ${
                selectedVehicle === "Pickup" ? styles.selected : ""
              }`}
              onClick={() => setSelectedVehicle("Pickup")}
            >
              <img src="src/assets/images/logo_pickup.png" alt="pickup" />
            </button>

            <button
              className={`${styles.btn_vehicle} ${
                selectedVehicle === "Moto" ? styles.selected : ""
              }`}
              onClick={() => setSelectedVehicle("Moto")}
            >
              <img
                className={styles.img_moto}
                src="src/assets/images/logo_moto.png"
                alt="moto"
              />
            </button>
          </div>

          <input
            type="text"
            placeholder="Precio.."
            required
            className={styles.price}
            value={price.toLocaleString("en-US")}
            onChange={(e) => setPrice(e.target.value)
            }
          />

          <div className={styles.details}>
            <textarea
              name="details"
              className={styles.textarea}
              placeholder="Detalles.."
              value={details} 
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>

            <button
              className={styles.add_img}
              onClick={() => console.log("open cam")}
            >
              <span className="material-symbols-outlined">add_a_photo</span>
            </button>
          </div>

          <div className={styles.buttons}>
            <button className={styles.btn_confirm} onClick={handleConfirm}>
              Confirmar
            </button>
            <button className={styles.btn_cancel} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
