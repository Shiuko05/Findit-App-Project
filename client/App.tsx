import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaFrameContext, SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./contexts/authContext";
import { AuthProviderRegister } from "./contexts/authRegisterContext";
import { PostProvider } from "./contexts/postContext";
import { SetAvatarProvider } from "./contexts/setAvatarContext";
import * as Font from 'expo-font';
import { SetUserPassProvider } from "./contexts/updatePassConext";
import { DeleteObjProvider } from "./contexts/deleteObjContext";
import { GetObjProvider } from "./contexts/getObjContext";

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);

  // Cargar las fuentes
  const loadFonts = async () => {
    await Font.loadAsync({
      'poppins-semibold': require('./assets/fonts/Poppins-SemiBold.ttf'),
      'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });
    setFontLoaded(true);  // Marca como cargadas las fuentes
  };

  useEffect(() => {
    loadFonts();
  }, []);


  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Mostrar un indicador de carga mientras las fuentes se están cargando */}
        <ActivityIndicator size="large" color="#1E319D" />
        <Text style={{ fontFamily: 'poppins-semibold', fontSize: 20, marginTop: 10, color: '#1E319D' }}>Cargando...</Text>
        <Text style={{ fontFamily: 'poppins-regular', fontSize: 12, color: '#666', width: '80%'}}>Esto puede tardar un poco dependiendo de tu conexión de internet</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthProviderRegister>
          <PostProvider>
            <SetAvatarProvider>
              <SetUserPassProvider>
                <DeleteObjProvider>
                  <GetObjProvider>
                    <StatusBar style="auto" />
                    <Navigation />
                  </GetObjProvider>
                </DeleteObjProvider>
              </SetUserPassProvider>
            </SetAvatarProvider>
          </PostProvider>
        </AuthProviderRegister>
      </AuthProvider>
    </SafeAreaProvider>
  );
}