import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, RefreshControl } from 'react-native'
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
        const response = await fetch(`http://${config.BASE_URL}:8080/all-claims-objs`);
        const data = await response.json();
        setUsers(data);
        setRefreshing(false);
        console.log(data);
    }

  return (
    <SafeAreaView>
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={{alignItems: 'center', marginVertical: 10}}>
                <Text style={{fontFamily: 'poppins-semibold', fontSize: 18}}>Reclamos de Objetos</Text>
            </View>
            <View>
                <View style={styles.gridContainer}>
                {users.length > 0 ? (
                    users.map((item) => (
                    <TouchableOpacity style={styles.cardContainer} key={item.id}>
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
                    ))
                ) : (
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', height: height / 1.5}}>
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
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 10,
    },
    cardContainer: {
        width: '100%',
        margin: 5,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    card: {
        flexDirection: 'row',
        padding: 5,
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    title: {
        fontFamily: 'poppins-semibold',
        fontSize: 16,
        color: '#333',
    },
    place: {
        fontFamily: 'poppins-regular',
        fontSize: 12,
        color: '#B6B5B5',
    },
    description: {
        fontFamily: 'poppins-regular',
        fontSize: 12,
        color: '#888',
    },
    noDataText: {
        fontFamily: 'poppins-regular',
        fontSize: 16,
        color: '#888',
    },
})