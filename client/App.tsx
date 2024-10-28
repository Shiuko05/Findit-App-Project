import { View, Text } from "react-native";
import React from "react";
import { SafeAreaFrameContext, SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <SafeAreaProvider>

      <Navigation/>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}