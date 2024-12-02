import { View, Text, StyleSheet, Image, Dimensions, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../config/config.js";
import { Octicons } from "@expo/vector-icons";
import { deleteObjContext } from "../contexts/deleteObjContext";

const { height } = Dimensions.get("window");

export default function ItemCardStatus({ dataObj }) {
  const [usersData, setUsersData] = useState([]);

  const { deleteObj } = useContext(deleteObjContext)

  const [obj, setObj] = useState([]);

  useEffect(() => {
    setObj(dataObj);
    console.log("[ItemCardStatus]: Reclamos Actualizados, ", dataObj);
  }, [dataObj]);

  const confirmDelete = (idobj) => {
    // Confirmación de eliminación
    Alert.alert('Eliminar objeto', '¿Estás seguro de que deseas eliminar este objeto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => deleteObj(idobj) } // Llama a la función deleteObj pasando el id
    ]);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>

        <View style={styles.gridContainer}>
          {obj.length > 0 ? (
            obj.map((item) => (
              <TouchableOpacity
                style={styles.cardContainer}
                key={item.id}
                onLongPress={() => confirmDelete(item.idobj)}
              >
                <View style={styles.card}>
                  {/* Columna 1: Imagen del objeto */}
                  <View style={styles.imgContainer}>
                    <Image
                      style={styles.img}
                      source={{
                        uri: `${item.imagenobj}`,
                      }}
                    />
                  </View>

                  {/* Columna 2: Información del usuario y del objeto */}
                  <View style={styles.infoContainer}>
                    {/* Fila 1: Información del usuario */}
                    <View style={styles.userInfoContainer}>
                      <View>
                        <Text style={styles.userRole}>
                            {item.objEstatus == 1
                                ? "Reclamación en proceso"
                                : item.objEstatus == 2
                                ? "Objeto solicitado para entrega"
                                : item.objEstatus == 3
                                ? "Objeto devuelto"
                                : item.objEstatus == 0
                                ? "Reclamación rechazada"
                                : ""}
                            </Text>
                      </View>
                      <View style={{}}>
                        <Octicons name="dot-fill" size={15} style={{color: item.objEstatus == 1 ? 'red' : item.objEstatus == 2 ? 'orange' : 'green'}} />
                      </View>
                    </View>

                    {/* Fila 2: Información del objeto */}
                    <View style={styles.objectInfoContainer}>
                      <Text style={styles.itemName}>{item.nombreobj}</Text>
                      <Octicons name="location" size={12} color="#B6B5B5">
                        <Text style={styles.place}>
                          {" " + (item.lugar || "Ubicación no disponible")}
                        </Text>
                      </Octicons>
                      <Text style={styles.itemDescription} numberOfLines={3}>
                        {item.descripcion || "Sin descripción"}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Octicons name="info" size={25} color="#888" style={{marginRight: 10}}/>
              <Text style={styles.noDataText}>No hay información disponible</Text>
            </View>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: -50,
  },
  title: {
    fontSize: 18,
    fontFamily: "poppins-semibold",
  },
  gridContainer: {},
  cardContainer: {
    width: "100%", // Asegura que las tarjetas estén en columnas de dos
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
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
  imgContainer: {
    width: 130, // La imagen del objeto ocupa el 40% del ancho de la tarjeta
    height: 130,
    marginRight: 10,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1, // La otra columna ocupa el espacio restante
    paddingLeft: 5,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'flex-end',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 5,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 9,
    fontFamily: "poppins-semibold",
  },
  userRole: {
    fontSize: 9,
    color: "#888",
    fontFamily: "poppins-regular",
    marginHorizontal: 5,
  },
  objectInfoContainer: {
    marginTop: 5,
  },
  place: {
    fontSize: 10,
    color: "#888",
    fontFamily: "poppins-semibold",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 10,
    color: "#555",
    fontFamily: "poppins-regular",
    marginEnd: 10,
  },
  noDataText: {
    fontFamily: "poppins-semibold",
    fontSize: 16,
    marginVertical: height / 3,
    color: '#888',
  },
});
