import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import { BASE_URL } from "../config/config";
import bycript from "bcryptjs";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);

    if (!email || !password) {
      Alert.alert("Todos los campos son obligatorios");
    }

    axios
      .post(`http://10.26.0.119:8080/users/auth-login`, {
        email,
      })
      .then(async (res) => {
        let userInfo = res.data;

        console.log("User info: ", userInfo);

        const isMatch = await bycript.compare(password, userInfo.passuser);

        if (!isMatch) {
          console.log("Invalid email and password");
          return;
        }
        setUserInfo(userInfo);
        setUserToken(userInfo.userToken);

        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        AsyncStorage.setItem("userToken", userInfo.userToken);

        console.log(userInfo);
        console.log("User token: ", userInfo.userToken);
      })
      .catch((err) => {
        console.log("Error en el registro:", err.response?.data || err.message);
      });
    //setUserToken("ioiojlkad");
    //AsyncStorage.setItem("userToken", "ioiojlkad");
    setIsLoading(false);
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