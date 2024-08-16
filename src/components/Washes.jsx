import React, { useState, useEffect } from "react";
import ModalNewWash from "./ModalNewWash";
import styles from "../styles/Washes.module.scss";
import car from "../assets/images/logo_car_w.png";
import pickup from "../assets/images/logo_pickup_w.png";
import moto from "../assets/images/logo_moto_w.png";

function Washes() {
  const [washes, setWashes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Estado para saber si estamos editando
  const [currentWash, setCurrentWash] = useState(null); // Estado para los datos del lavado actual

  useEffect(() => {
    const storedWashes = localStorage.getItem("washes");
    if (storedWashes) {
      setWashes(JSON.parse(storedWashes));
    }
  }, []);

  const saveWashesToLocalStorage = (washes) => {
    localStorage.setItem("washes", JSON.stringify(washes));
  };

  const handleAddOrEditWash = (newWash) => {
    let updatedWashes;

    if (editIndex !== null) {
      // Editar el lavado existente
      updatedWashes = washes.map((wash, index) =>
        index === editIndex ? newWash : wash
      );
      setEditIndex(null); // Reiniciar el índice de edición
    } else {
      // Añadir un nuevo lavado
      updatedWashes = [...washes, newWash];
    }

    setWashes(updatedWashes);
    saveWashesToLocalStorage(updatedWashes);
    setIsModalOpen(false); // Cierra el modal después de añadir/editar el lavado
  };

  const handleEditWash = (index) => {
    setEditIndex(index);
    setCurrentWash(washes[index]); // Cargar el lavado existente en el estado actual
    setIsModalOpen(true);
  };

  const handleDeleteWash = (index) => {
    const updatedWashes = washes.filter((_, i) => i !== index);
    setWashes(updatedWashes);
    saveWashesToLocalStorage(updatedWashes);
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  // Lavados almacenados

  let sum = 0;

  for (let i = 0; i < washes.length; i++) {
    sum += parseInt(washes[i].price.replace(/,/g, ""));
  }

  const washesSum = sum.toLocaleString("en-US");

  // iconos dinámicos

  const images = {
    Car: car,
    Pickup: pickup,
    Moto: moto,
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <div className={styles.container}>
        <h1>Lavados</h1>
        <div className={styles.washesContainer}>
          <div className={styles.washes}>
            {washes.map((wash, index) => {
              const imageSrc = images[wash.type];
              return (
                  <div key={index} className={styles.itemWash}>
                    <img src={imageSrc} className={styles.washTypeImg} />
                    <div className={styles.washText}>
                      <p>${wash.price}</p>
                      <p style={{ fontSize: "1em" }}>{wash.details}</p>
                      <p> </p>
                      {formatDateTime(wash.datetime)}
                    </div>
                    <div className={styles.buttons}>
                      <button onClick={() => handleEditWash(index)}>
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button onClick={() => handleDeleteWash(index)}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
              );
            })}
          </div>
          <p>Total: ${washesSum}</p>
        </div>

        <button className={styles.btn_add} onClick={() => setIsModalOpen(true)}>
          Añadir Lavado
        </button>

        {isModalOpen && (
          <ModalNewWash
            onConfirm={handleAddOrEditWash}
            onClose={() => {
              setIsModalOpen(false);
              setEditIndex(null); // Reinicia el estado de edición si cierras el modal
            }}
            wash={currentWash} // Pasar el lavado actual al modal
          />
        )}
      </div>
    </>
  );
}

export default Washes;
