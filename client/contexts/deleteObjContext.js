import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { AuthContext } from "./authContext";
import config from "../config/config";
import bycript from "bcryptjs";

export const deleteObjContext = createContext();

export const DeleteObjProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = useContext(AuthContext);

  const deleteObj = async (setIdobj) => {
    setIsLoading(true);
    console.log("Idobj: ", setIdobj);

    axios
      .post(`http://${config.BASE_URL}:8080/all-objs/delete`, {
        idobj: setIdobj,
      })
      .then((res) => {
        const userPass = res.data;

        if (!userPass) {
          console.log("Registro fallido, intenta de nuevo");
          return;
        } else {
          Alert.alert("Exito!", "El objeto ha sido eliminado correctamente");
        }
      })
      .catch((err) => {
        console.log("Error en el registro:", err.response?.data || err.message);
        alert("Error en el registro, intenta de nuevo");
        setIsLoading(false); // Detener el indicador de carga
      })
      .finally(() => {
        setIsLoading(false); // Detener el indicador de carga
      });
  };

  return (
    <deleteObjContext.Provider value={{ deleteObj, isLoading }}>
      {isLoading && (
        <View style={styles.overlay}>
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      )}
      {children}
    </deleteObjContext.Provider>
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
