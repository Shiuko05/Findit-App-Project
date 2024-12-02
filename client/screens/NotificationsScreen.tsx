import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { AuthContext } from '../contexts/authContext';
import Config from '../config/config.js';
import { Octicons } from '@expo/vector-icons';

const { height } = Dimensions.get("screen");

export default function NotificationsScreen({navigation}) {

    const [refreshing, setRefreshing] = useState(false);
    const { userInfo } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const [ obj , setObj ] = useState([]);

    useEffect(() => {
        fetchNotifyUser();
    }, []);

    const fetchNotifyUser = async () => {
        try {
            const response = await fetch(`https://${Config.BASE_URL}/notifications/${userInfo.iduser}`);
            const data = await response.json();
    
            // Obtener los nombres de objetos para cada notificación
            const enrichedNotifications = await Promise.all(
                data.map(async (notification) => {
                    if (notification.idobj) {
                        console.log("Fetching obj:", notification.idobj);
                        const objResponse = await fetch(`https://${Config.BASE_URL}/objs/${notification.idobj}`);
                        const objData = await objResponse.json();
    
                        // Aquí estamos asegurándonos de retornar la notificación enriquecida con el nombre del objeto
                        const nombreobj = objData.length > 0 ? objData[0].nombreobj : "Desconocido"; // Verificar si hay objetos en objData
    
                        return {
                            ...notification,
                            nombreobj: nombreobj // Añadir nombre del objeto
                        };
                    }
                    return notification; // Si no tiene idobj, lo deja como está
                })
            );
    
            // Ahora sí, estableces las notificaciones enriquecidas
            setNotifications(enrichedNotifications);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };
    


    const onRefresh = () => {
        fetchNotifyUser();
    }

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son base 0
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

  return (
    <SafeAreaView>
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            } 
        >
            <View>
                <Text style={{fontFamily: 'poppins-semibold', fontSize: 18, padding: 20}}>Notificaciones</Text>
                {(notifications.length > 0) ? (
                    notifications.reverse().map((item, index) => (
                        <View style={styles.cardNotification} key={index}>
                            <View style={{backgroundColor: '#f1f4ff', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 30, marginRight: 5}}>
                                <Octicons name='gear' color={'#1E319D'} size={30}/>
                            </View>
                            <View style={{width: height / 3}}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{fontFamily: 'poppins-bold', fontSize: 13}}>Reclamaciones</Text>
                                    <Text style={{fontFamily: 'poppins-regular', justifyContent: 'flex-end'}}>{formatDate(item.fechaNotificacion)}</Text>
                                </View>
                                <View style={{flexDirection: 'row', width: '90%', alignItems: 'center'}}>
                                    <Octicons name='note' size={15} color={'#1E319D'}/>
                                    <Text style={{fontFamily: 'poppins-regular', fontSize: 11}}> {item.nombreobj}</Text>
                                </View>
                                
                                <Text style={{fontFamily: 'poppins-regular', fontSize: 12}}>{item.mensaje}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Octicons name="info" size={25} color="#888" style={{marginRight: 10}}/>
                    <Text style={styles.noDataText}>No hay información disponible</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    noDataText: {
        fontFamily: "poppins-semibold",
        fontSize: 16,
        marginVertical: height / 3,
        color: '#888',
    },
    cardNotification: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
});