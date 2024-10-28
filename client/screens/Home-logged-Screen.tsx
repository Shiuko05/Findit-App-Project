import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import ItemCardView from "../components/ItemCardView";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const HomeLoggedScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold", padding: 10 }}>
          Objetos Perdidos
        </Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F0ECF5",
  },
});

export default HomeLoggedScreen;
