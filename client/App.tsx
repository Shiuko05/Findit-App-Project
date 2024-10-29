import { View, Text } from "react-native";
import React from "react";
import { SafeAreaFrameContext, SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./contexts/authContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Navigation/>
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}