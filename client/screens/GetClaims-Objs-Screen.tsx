import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, RefreshControl, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons'
import { AuthContext } from '../contexts/authContext';
import config from '../config/config';

const { height } = Dimensions.get("window");

export default function GetClaimsObjsScreen({navigation}) {

    const { userInfo } = useContext(AuthContext);

    const [refreshing, setRefreshing] = useState(false);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    // Esta función manejará el refresco
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      // Aquí se dispara el evento de refresco
      fetchData(); 
    }, []);

    async function fetchData() {
        const response = await fetch(`http://${config.BASE_URL}:8080/objs/reclamations`);
        const data = await response.json();
        setUsers(data);
        setRefreshing(false);
        console.log(data);
    }

    const confirmClaim = (idobj) => {
        // Confirmación de reclamación
        Alert.alert('Confirmar Reclamo', '¿Estás seguro de que deseas aprobar este reclamo?', [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Confirmar' } // Llama a la función claimObj pasando el id
        ]);
    };

  return (
    <SafeAreaView>
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Objetos Reclamados</Text>

                <View style={styles.gridContainer}>
                {users.length > 0 ? (
                    users.map((item) => (
                    <TouchableOpacity
                        style={styles.cardContainer}
                        key={item.id}
                        onLongPress={() => confirmClaim(item.idobj)}
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
                            <Image
                                style={styles.userImage}
                                source={{ uri: item.avatarUrl }}
                            />
                            <View style={styles.userDetails}>
                                <Text style={styles.userName}>
                                {item.username + " " + item.userapepat}
                                </Text>
                                <Text style={styles.userRole}>
                                {item.typeuser == 1
                                    ? "Estudiante"
                                    : item.typeuser == 2
                                    ? "Civil"
                                    : item.typeuser == 3
                                    ? "Admin"
                                    : ""}
                                </Text>
                            </View>
                            </View>

                            {/* Fila 2: Información del objeto */}
                            <View style={styles.objectInfoContainer}>
                            <Text style={styles.itemName}>{item.nombreobj}</Text>
                            <Octicons name="calendar" size={12} color="#B6B5B5">
                                <Text style={styles.place}>
                                {" " + (item.fechaReclama || "Fecha no disponible")}
                                </Text>
                            </Octicons>
                            <Text style={styles.itemDescription} numberOfLines={3}>
                                {item.descripcionReclama || "Sin descripción"}
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
        </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      padding: 20
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
      marginBottom: 0,
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
      fontSize: 8,
      color: "#888",
      fontFamily: "poppins-regular",
      top: -5,
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
  