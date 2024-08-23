import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/Modal.module.scss";
import car from "../assets/images/logo_car.png";
import pickup from "../assets/images/logo_pickup.png";
import moto from "../assets/images/logo_moto.png";

function Modal({ onConfirm, onClose, wash }) {
  const [selectedVehicle, setSelectedVehicle] = useState(wash ? wash.type : "");
  const [price, setPrice] = useState(wash ? wash.price : "");
  const [details, setDetails] = useState(wash ? wash.details : "");
  const [image, setImage] = useState(wash ? wash.image : null); // Estado para la imagen seleccionada
  const fileInputRef = useRef(null); // Referencia al input de archivo

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
        image, // Incluye la imagen en el objeto de lavado
      };
      onConfirm(newWash); // Pasa los datos al componente `Washes`
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openCamera = () => {
    fileInputRef.current.click(); // Abre el selector de archivos
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h1 className={styles.title}>{wash ? "Editar Lavado" : "Seleccione el tipo de vehículo"}</h1>

          <div className={styles.vehicles}>
            <button
              className={`${styles.btn_vehicle} ${
                selectedVehicle === "Car" ? styles.selected : ""
              }`}
              onClick={() => setSelectedVehicle("Car")}
            >
              <img src={car} alt="car" />
            </button>

            <button
              className={`${styles.btn_vehicle} ${
                selectedVehicle === "Pickup" ? styles.selected : ""
              }`}
              onClick={() => setSelectedVehicle("Pickup")}
            >
              <img src={pickup} alt="pickup" />
            </button>

            <button
              className={`${styles.btn_vehicle} ${
                selectedVehicle === "Moto" ? styles.selected : ""
              }`}
              onClick={() => setSelectedVehicle("Moto")}
            >
              <img className={styles.img_moto} src={moto} alt="moto" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Precio.."
            required
            className={styles.price}
            value={price.toLocaleString("en-US")}
            onChange={(e) => setPrice(e.target.value)}
          />

          <div className={styles.details}>
            <textarea
              name="details"
              className={styles.textarea}
              placeholder="Detalles.."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            ></textarea>

            <button className={styles.add_img} onClick={openCamera}>
              <span className="material-symbols-outlined">add_a_photo</span>
            </button>
          </div>
          {image && (
            <img
              src={image}
              alt="preview"
              className={styles.imagePreview}
            />
          )}

          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />

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
