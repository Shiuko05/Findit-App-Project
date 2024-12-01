import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, RefreshControl, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons'
import { AuthContext } from '../contexts/authContext';
import config from '../config/config.js';

const { height } = Dimensions.get("window");

export default function GetClaimsObjsScreen({expandHandler}) {

    const { userInfo } = useContext(AuthContext);

    const [refreshing, setRefreshing] = useState(false);

    const [reclama, setReclama] = useState([]);

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
        const response = await fetch(`http://${config.BASE_URL}:8080/reclamations`);
        const data = await response.json();
        setReclama(data);
        setRefreshing(false);
    }

    const sendNotification = (idobj, iduser, updateType) => {
      let message;
      if (updateType == 2) {
          message = 'Tu reclamo ha sido aprobado, favor de acudir al Centro de objetos perdidos';
      } else if (updateType == 0) {
          message = 'Tu reclamo ha sido rechazado, favor de acudir al Centro de objetos perdidos para más información';
      } else if (updateType == 3) {
          message = 'Tu objeto ha sido entregado';
      }
      
      let fechaEnvio = new Date();
      let fechaEnvioString = new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(fechaEnvio).split('/').reverse().join('-');
      console.log(fechaEnvioString);

      fetch(`http://${config.BASE_URL}:8080/objs/send-notification`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              idobj: idobj,
              iduser: iduser,
              fechaNotificacion: fechaEnvioString,
              mensaje: message
          })
      })
      .then(response => {
          if (!response.ok) {
              return response.text().then(text => { throw new Error(text) });
          }
          return response.json();
      })
      .then(data => {
          console.log(data);
          console.log('Notificación enviada');
      })
      .catch(error => {
          console.error('Mensaje no enviado. Error:', error.message);
      })
    }

    const confirmClaim = (item) => {
      if (item.estadoReclama == 1) {
          Alert.alert(
              'Confirmar Reclamo',
              '¿Estás seguro de que deseas aprobar este reclamo?',
              [
                  { text: 'Cancelar', style: 'cancel' },
                  { 
                      text: 'Confirmar reclamo', 
                      onPress: () => sendUpdateStatus(2, item.idReclamacion, item.idobj) 
                  },
                  { 
                      text: 'Rechazar reclamo', 
                      onPress: () => sendUpdateStatus(0, item.idReclamacion, item.idobj) 
                  }
              ]
          );
      } else if (item.estadoReclama == 2) {
          Alert.alert(
              'Confirmar Reclamo',
              '¿Estás seguro de que deseas aprobar este reclamo?',
              [
                  { text: 'Cancelar', style: 'cancel' },
                  { 
                      text: 'Confirmar entregado', 
                      onPress: () => sendUpdateStatus(3, item.idReclamacion, item.idobj) 
                  }
              ]
          );
      }
    };
  
    const sendUpdateStatus = (status, idReclamacion, idobj) => {
      console.log(status, idReclamacion, idobj);
      fetch(`http://${config.BASE_URL}:8080/objs/update-reclamation`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              estadoReclama: status,
              idobj: idobj,
              idReclamacion: idReclamacion
          })
      })
      .then(response => {
          if (!response.ok) {
              return response.text().then(text => { throw new Error(text) });
          }
          return response.json();
      })
      .then(data => {
          console.log(data);
          console.log('Reclamo actualizado');

          // MODIFICAR
          sendNotification(idobj, userInfo.iduser, status);
          fetchData();
      })
      .catch(error => {
          console.error('Error:', error.message);
      });
    }

  return (
    <SafeAreaView>
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Objetos Reclamados</Text>

                <View style={styles.gridContainer}>
                {reclama.length > 0 ? (
                    reclama.map((item) => (
                    (item.estadoReclama == 1 || item.estadoReclama == 2) && (
                    <TouchableOpacity
                        style={styles.cardContainer}
                        key={item.id}
                        onPress={() => expandHandler(item)}
                        onLongPress={() => confirmClaim(item)}
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
                    )
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