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
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthProviderRegister>
          <PostProvider>
            <SetAvatarProvider>
              <Navigation/>
              <StatusBar style="auto" />
            </SetAvatarProvider>
          </PostProvider>
        </AuthProviderRegister>
      </AuthProvider>
    </SafeAreaProvider>
  );
}