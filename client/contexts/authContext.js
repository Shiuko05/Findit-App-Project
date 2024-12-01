import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import config from "../config/config.js";
import bycript from "bcryptjs";
import { Alert, StyleSheet, Text, View } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);

    if (!email || !password) {
      Alert.alert("Todos los campos son obligatorios");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://${config.BASE_URL}:8080/users/auth-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
          timeout: 5000, // Timeout en milisegundos (5 segundos)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const userInfo = await response.json();
      console.log("User info: ", userInfo);

      const isMatch = await bycript.compare(password, userInfo.passuser);

      if (!isMatch) {
        Alert.alert("Error", "Correo o contraseña incorrectos");
        setIsLoading(false);
        return;
      }

      setUserInfo(userInfo);
      setUserToken(userInfo.iduser);

      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      await AsyncStorage.setItem("userToken", userInfo.iduser);

      console.log(userInfo);
      console.log("User token: ", userInfo.iduser);
    } catch (err) {
      console.log("Error en el registro:", err.message);
      let errorMessage = "Ha ocurrido un error.";
      if (err.message) {
        errorMessage = JSON.stringify(err.response.data);
      }
      Alert.alert("Error en el registro", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userInfo");
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged in error: ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, isLoading, userToken, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Corregir el error tipográfico y dar un fondo opaco
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Asegura que el overlay esté por encima del contenido
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
