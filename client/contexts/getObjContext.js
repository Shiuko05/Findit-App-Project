import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../contexts/authContext";
import config from "../config/config.js";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const GetObjContext = createContext();

export const GetObjProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useContext(AuthContext);

  const [inputText, setInputText] = useState(""); // Estado para inputText
  const [nombreobj, setNombreobj] = useState("");

  const getObj = (getInfo) => {
    setIsLoading(true);

    const {
      iduser, // iduser ya está en getInfo
      idobj,
      nombreobj,
      descripcion,
      lugar,
      hora,
      fecha,
      imagenobj,
    } = getInfo.item;

    // Metodo para obtener la fecha de hoy en formato yyyy-mm-dd

    const todaydate = new Date(); // Fecha actual en objeto Date
    const formattedDate = `${todaydate.getFullYear()}-${
      todaydate.getMonth() + 1
    }-${todaydate.getDate()}`;

    console.log("Fecha de hoy: ", formattedDate);

    console.log("Nombre del objeto: ", nombreobj);
    console.log("Usuario que publicó: ", iduser);
    console.log("ID del objeto: ", getInfo.item.idobj);
    console.log("Usuario que reclama: ", userInfo.iduser);
    console.log("InputText: ", getInfo.inputText);

    axios
      .post(`https://${config.BASE_URL}/objs-p/claim`, {
        idobj: idobj,
        iduser: userInfo.iduser,
        fechaReclama: formattedDate,
        descripcionReclama: getInfo.inputText,
        estadoReclama: 1,
      })
      .then((response) => {
        // Manejo de la respuesta
        console.log("Objeto insertado correctamente", response.data);
        Alert.alert("Éxito", "Objeto reclamado correctamente");
      })
      .catch((error) => {
        // Manejo de errores
        console.error("Error al insertar el objeto", error);
        Alert.alert("Error", "Hubo un problema al reclamar el objeto");
      });

    setIsLoading(false); // Detener el estado de carga
  };

  return (
    <GetObjContext.Provider value={{ getObj, isLoading }}>
      {children}
    </GetObjContext.Provider>
  );
};
