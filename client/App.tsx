import { View, Text } from "react-native";
import React from "react";
import { SafeAreaFrameContext, SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./contexts/authContext";
import { AuthProviderRegister } from "./contexts/authRegisterContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthProviderRegister>
          <Navigation/>
          <StatusBar style="auto" />
        </AuthProviderRegister>
      </AuthProvider>
    </SafeAreaProvider>
  );
}