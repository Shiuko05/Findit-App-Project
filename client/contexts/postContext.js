import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import bycript from "bcryptjs";
import { Alert } from "react-native";
import { AuthContext } from "../contexts/authContext";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [objInfo, setObjInfo] = useState(null);

  const { userInfo } = useContext(AuthContext);

  const postPerdido = (nombreobj, lugar, descripcion, fecha, hora) => {
    setIsLoading(true);

    console.log(nombreobj, lugar, descripcion, fecha, hora);

    axios
      .post(`http://10.26.0.119:8080/objs/post-p`, {
        iduser: userInfo.iduser,
        nombreobj,
        descripcion,
        hora,
        fecha,
        lugar,
      })
      .then((res) => {
        let objInfo = res.data;

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
