import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Octicons } from '@expo/vector-icons'
import config from '../config/config'
import { set } from 'date-fns'

export default function PanelAdminView({ navigation }) {

    const [ usersCount, setUsersCount ] = useState(0);
    const [ objectsCount, setObjectsCount ] = useState(0);
    const [ claimsCount, setClaimsCount ] = useState(0);
    const [ foundCount, setFoundCount ] = useState(0);
    const [ lostCount, setLostCount ] = useState(0);

    const fetchUsers = async () => {
        const response = await fetch(`https://${config.BASE_URL}/users`);
        const data = await response.json();

        // Contabilizar la cantidad de usuarios y almacenarla en una variable
        const usersCount = data.length;
        setUsersCount(usersCount);
        console.log(usersCount);
    }

    const fetchObjects = async () => {
        const response = await fetch(`https://${config.BASE_URL}/all-objs`);
        const data = await response.json();

        // Contabilizar la cantidad de objetos y almacenarla en una variable
        const objectsCount = data.length;

        // Contabilidar la cantidad de objetos encontrados
        const foundCount = data.filter((item) => item.objEstado == 2).length;

        // Contabilizar la cantidad de objetos perdidos
        const lostCount = data.filter((item) => item.objEstado == 1).length;
        setLostCount(lostCount);
        setFoundCount(foundCount);
        setObjectsCount(objectsCount);
        console.log(objectsCount);
    }

    const fetchClaims = async () => {
        const response = await fetch(`https://${config.BASE_URL}/reclamations`);
        const data = await response.json();

        // Contabilizar la cantidad de reclamos y almacenarla en una variable
        const claimsCount = data.length;
        setClaimsCount(claimsCount);
        console.log(claimsCount);
    }

    useEffect(() => {
        fetchUsers();
        fetchObjects();
        fetchClaims();
    }, []);

    const onRefresh = () => {
        fetchUsers();
        fetchObjects();
        fetchClaims();
    }

    // Formatear números a dos dígitos
    const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <SafeAreaView>
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }

        >
            <View style={{padding: 20}}>
                <TouchableOpacity style={{marginBottom: 10}} onPress={() => navigation.navigate('ProfileUserScreen')}>
                    <Octicons name='arrow-left' color={'black'} size={26}/>
                </TouchableOpacity>
                <Text style={{fontFamily: 'poppins-semibold', fontSize: 18}}>Panel de Control</Text>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={styles.cardPanel}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Octicons name='person' color={'black'} size={16}/>
                            <Text style={{fontFamily: 'poppins-regular', fontSize: 12}}> Usuarios</Text>
                        </View>
                        <Text style={{fontFamily: 'poppins-semibold', fontSize: 32}}> {formatNumber(usersCount)}</Text>
                        <Text style={{fontFamily: 'poppins-regular', fontSize: 10, color: 'gray'}}>Usuarios registrados en la plataforma</Text>
                    </View>
                    <View style={styles.cardPanel}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Octicons name='archive' color={'black'} size={16}/>
                            <Text style={{fontFamily: 'poppins-regular', fontSize: 12}}> Objetos</Text>
                        </View>
                        <Text style={{fontFamily: 'poppins-semibold', fontSize: 32}}> {formatNumber(objectsCount)}</Text>
                        <Text style={{fontFamily: 'poppins-regular', fontSize: 10, color: 'gray'}}>Objetos registrados en la plataforma</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={styles.cardPanel}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Octicons name='sidebar-collapse' color={'black'} size={16}/>
                            <Text style={{fontFamily: 'poppins-regular', fontSize: 12}}> Reclamos</Text>
                        </View>
                        <Text style={{fontFamily: 'poppins-semibold', fontSize: 32}}> {formatNumber(claimsCount)}</Text>
                        <Text style={{fontFamily: 'poppins-regular', fontSize: 10, color: 'gray'}}>Objetos reclamados por los usuarios</Text>
                    </View>
                    <View style={styles.cardPanel}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Octicons name='sidebar-expand' color={'black'} size={16}/>
                            <Text style={{fontFamily: 'poppins-regular', fontSize: 12}}> Perdidos</Text>
                        </View>
                        <Text style={{fontFamily: 'poppins-semibold', fontSize: 32}}> {formatNumber(lostCount)}</Text>
                        <Text style={{fontFamily: 'poppins-regular', fontSize: 10, color: 'gray'}}>Objetos perdidos por los usuarios</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={styles.cardPanel}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Octicons name='sidebar-expand' color={'black'} size={16}/>
                            <Text style={{fontFamily: 'poppins-regular', fontSize: 12}}> Encontrados</Text>
                        </View>
                        <Text style={{fontFamily: 'poppins-semibold', fontSize: 32}}> {formatNumber(foundCount)}</Text>
                        <Text style={{fontFamily: 'poppins-regular', fontSize: 10, color: 'gray'}}>Objetos encontrados por los usuarios</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    cardPanel: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '47%',
        height: 147,
        marginVertical: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    } 
})