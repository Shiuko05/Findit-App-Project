import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetView, { BottomSheetMethods } from "./BottomSheetView";
import Navigation from "../navigation/"
import config from "../config/config";

const { height } = Dimensions.get("window");

export default function ItemCardFindView({expandHandler}) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(`http://${config.BASE_URL}:8080/all-objs`);
    const data = await response.json();
    setUsers(data);
  }

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 20,
          marginTop: -50,
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: "poppins-semibold" }}>
          Objetos Encontrados
        </Text>

        {/* Contenedor con dos columnas */}
        <View style={styles.gridContainer}>
          {users.map((item) => (
            /* condicion de si el item retorna vacio entonces se imprime un text */
            /* {users.length === 0 ? (
            <Text> No hay objetos disponibles </Text>
          ) : ( */
            <TouchableOpacity onPress={() => expandHandler(item)} style={styles.cardContainer} key={item.id}>
              <View style={styles.card}>
                <Image
                  style={styles.img}
                  source={{uri: item.imagenobj}}
                />
                <View>
                  <Text style={styles.title}>
                    {item.nombreobj || "Sin nombre"}
                  </Text>
                  <Octicons name="location" size={14} color="#B6B5B5">
                    <Text style={styles.place}>
                      {" " + (item.lugar || "Ubicación no disponible")}
                    </Text>
                  </Octicons>
                  <Text style={styles.description} numberOfLines={4}>
                    {item.descripcion || "Sin descripción"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row", // Para permitir las dos columnas
    flexWrap: "wrap", // Ajusta los elementos para que se vayan a la siguiente línea
    justifyContent: "space-between", // Espacio entre las columnas
  },
  cardContainer: {
    width: "48%", // Cada tarjeta ocupa casi la mitad del ancho
    marginBottom: 10, // Espaciado inferior para separar filas
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 0,
  },
  place: {
    fontSize: 13,
    color: "#888",
  },
  description: {
    fontSize: 12,
    color: "black",
    width: "100%",
  },
  img: {
    width: "100%",
    height: 140,
    borderRadius: 10,
    marginBottom: 10,
  },
});
