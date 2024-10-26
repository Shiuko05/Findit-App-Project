import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeLoggedScreen from "./screens/Home-logged-Screen";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("http://10.0.2.2:8080/all-objs");
    const data = await response.json();
    setUsers(data);
  }

  return (
    <View style={styles.container}>
      {/*<Text>{JSON.stringify(users[1].nombreobj)}</Text>
      <StatusBar style="auto" />*/}
      <HomeLoggedScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0ECF5",
    alignItems: "center",
    justifyContent: "center",
  },
});
