import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { AuthContext } from "./authContext";
import config from "../config/config";

export const setAvatarContext = createContext();

export const SetAvatarProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarInfo, setAvatarInfo] = useState(null);

  const { userInfo } = useContext(AuthContext);

  const setAvatar = (avatar, imagenType) => {
    setIsLoading(true);

    console.log("Imagen mandada: ", avatar);
    console.log("Tipo de imagen: ", imagenType);
    console.log("Avatar anterior: ", userInfo.avatarUrl);

    const data = new FormData();

    data.append("iduser", userInfo.iduser);
    data.append("avatar", {
      uri: avatar, // Ruta de la imagen
      type: imagenType || "image/jpeg", // Tipo de archivo (asegúrate de obtener el tipo correcto)
      name: "avatar", // Nombre del archivo
    });

    axios
      .post(`http://${config.BASE_URL}:8080/users/upload-avatar`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const avatarInfo = res.data;

        if (!avatarInfo) {
          console.log("Registro fallido, intenta de nuevo");
          return;
        } else {
          Alert.alert(
            "Registro exitoso",
            "Tu avatar ha sido actualizado correctamente"
          );
        }

        setAvatarInfo(avatarInfo);
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
    <setAvatarContext.Provider value={{ setAvatar, isLoading }}>
      {children}
    </setAvatarContext.Provider>
  );
};
