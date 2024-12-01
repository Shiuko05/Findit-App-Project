import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "../contexts/authContext";
import config from "../config/config.js";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [objInfo, setObjInfo] = useState(null);

  const { userInfo } = useContext(AuthContext);

  const postPerdido = (
    imagenobj,
    imagenobjtype,
    nombreobj,
    objEstado,
    categoria,
    descripcion,
    hora,
    fecha,
    lugar
  ) => {
    setIsLoading(true);

    const data = new FormData();
    // Usar la imagen como archivo binario en FormData
    data.append("imagenobj", {
      uri: imagenobj, // Ruta de la imagen
      type: imagenobjtype || "image/jpeg", // Tipo de archivo (asegúrate de obtener el tipo correcto)
      name: "imagenobj", // Nombre del archivo
    });

    console.log("Tipo de imagen: ", imagenobjtype);

    const todaydate = new Date(); // Fecha actual en objeto Date
    const formattedDate = `${todaydate.getFullYear()}-${
      todaydate.getMonth() + 1
    }-${todaydate.getDate()}`;

    // Agregar el resto de los datos al FormData
    data.append("iduser", userInfo.iduser);
    data.append("nombreobj", nombreobj);
    data.append("objEstado", objEstado);
    data.append("categoria", categoria);
    data.append("descripcion", descripcion);
    data.append("hora", hora);
    data.append("fecha", fecha);
    data.append("lugar", lugar);
    data.append("fechaPost", formattedDate);
    data.append("objEstatus", 1); // Estatus del objeto (activo)

    axios
      .post(`http://${config.BASE_URL}:8080/objs/post-p`, data, {
        headers: {
          "Content-Type": "multipart/form-data", // Es importante establecer el encabezado correcto
        },
      })
      .then((res) => {
        const objInfo = res.data;

        if (!objInfo) {
          console.log("Registro fallido, intenta de nuevo");
          return;
        } else {
          Alert.alert(
            "Registro exitoso",
            "Objeto creado. Ahora puedes verlo en la lista de objetos perdidos"
          );
        }

        setObjInfo(objInfo);
      })
      .catch((err) => {
        console.log("Error en el registro:", err.response?.data || err.message);
        alert("Error en el registro, intenta de nuevo");
      })
      .finally(() => {
        setIsLoading(false); // Detener el indicador de carga
      });
  };

  return (
    <PostContext.Provider value={{ postPerdido, isLoading, objInfo }}>
      {children}
    </PostContext.Provider>
  );
};
