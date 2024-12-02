import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import bycript from "bcryptjs";
import { Alert } from "react-native";
import config from "../config/config.js";

export const AuthContextRegister = createContext();

export const AuthProviderRegister = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const register = (
    username,
    userapepat,
    userapemat,
    email,
    password,
    confirmPass,
    typeuser
  ) => {
    setIsLoading(true);

    if (
      !username ||
      !userapepat ||
      !userapemat ||
      !email ||
      !password ||
      !confirmPass ||
      !typeuser
    ) {
      Alert.alert("Alerta!", "Todos los campos son obligatorios");
      return;
    }

    /* Condicion que verifique que no contenta numeros o caracteres especiales */
    if (!/^[a-zA-Z]+$/.test(username)) {
      Alert.alert("Alerta!", "El nombre solo puede contener letras");
      return;
    }

    /* Permitir ascentos en el apellido */

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(userapepat)) {
      Alert.alert("Alerta!", "El apellido paterno solo puede contener letras");
      return;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/.test(userapemat)) {
      Alert.alert("Alerta!", "El apellido materno solo puede contener letras");
      return;
    }

    /* Condicion que verifique que el correo sea valido */
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Alerta!", "El correo no es válido");
      return;
    }

    if (password !== confirmPass) {
      Alert.alert("Alerta!", "Las contraseñas no coinciden");
      return;
    }

    axios
      .post(`https://${config.BASE_URL}/users/register`, {
        username,
        userapepat,
        userapemat,
        email,
        passuser: password,
        typeuser,
      })
      .then((res) => {
        let userInfo = res.data;

        if (!userInfo) {
          console.log("Registro fallido, intenta de nuevo");
          return;
        } else {
          Alert.alert(
            "Registro exitoso",
            "Cuenta creada. Inicia sesión para continuar."
          );
        }

        // Mensaje en caso de que el registro haya sido exitoso
        if (!userInfo.isActiveUser == 0) {
          console.log(
            "Ya existe una cuenta con este correo, por favor inicia sesión o usa otro correo"
          );
        }

        setUserInfo(userInfo);
      })
      .catch((err) => {
        console.log("Error en el registro:", err.response?.data || err.message);
        alert(
          "Error:",
          err.response.data.message || JSON.stringify(err.response.data)
        );
      })
      .finally(() => {
        setIsLoading(false); // Detener el indicador de carga
      });
  };

  return (
    <AuthContextRegister.Provider value={{ register, isLoading, userInfo }}>
      {children}
    </AuthContextRegister.Provider>
  );
};
