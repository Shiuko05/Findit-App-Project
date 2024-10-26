import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import ItemCardView from "../components/ItemCardView";

const HomeLoggedScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold", padding: 10 }}>
          Objetos Perdidos
        </Text>
        <ItemCardView />
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
