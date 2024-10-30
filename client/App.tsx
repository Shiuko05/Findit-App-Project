import { View, Text } from "react-native";
import React from "react";
import { SafeAreaFrameContext, SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "./contexts/authContext";
import { AuthProviderRegister } from "./contexts/authRegisterContext";
import { PostProvider } from "./contexts/postContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthProviderRegister>
          <PostProvider>
            <Navigation/>
            <StatusBar style="auto" />
          </PostProvider>
        </AuthProviderRegister>
      </AuthProvider>
    </SafeAreaProvider>
  );
}