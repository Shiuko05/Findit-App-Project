import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import config from '../config/config';
import { AuthContext } from '../contexts/authContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCardView from '../components/ItemCardView';
import ItemCardFindView from '../components/ItemCardFindView';
import { Octicons } from '@expo/vector-icons';
import ItemCardHistory from '../components/ItemCardHistory';

export default function MyHistoryObjsScreen({expandHandler, closeHandler, navigation}) {

    const { userInfo } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [obj, setObj] = useState([]);

    const [refreshing, setRefreshing] = useState(false); // Estado para controlar el "refresh"

    useEffect(() => {
        fetchUser();
        fetchObj();
    }, []);

    async function fetchUser() {
        setRefreshing(true); // Comienza el refresco
        const response = await fetch(`http://${config.BASE_URL}:8080/users/${userInfo.iduser}`);
        const data = await response.json();
        setUsers(data);
        setRefreshing(false); // Finaliza el refresco
    }

    async function fetchObj() {
      const response = await fetch(
        `http://${config.BASE_URL}:8080/all-objs-user`
      );
      const data = await response.json();
  
      const dataFiltered = data.filter((item) => item.iduser == userInfo.iduser);
      setObj(dataFiltered);
    }

    // Función que se ejecuta cuando se hace el gesto de refresco
    const onRefresh = () => {
      fetchUser();
      fetchObj();
    }

  return (
    <SafeAreaView>
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
            <RefreshControl
                refreshing={refreshing} // Estado que controla si se está refrescando
                onRefresh={onRefresh} // Función que se ejecuta al refrescar
            />
          }
        >
            <View>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between', marginHorizontal: 15}}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileUserScreen')}>
                        <Octicons name="arrow-left" size={25} color="black" style={{}}/>
                    </TouchableOpacity>
                    <Text style={{fontFamily: 'poppins-semibold', fontSize: 20, marginVertical: 10}}>Historial de Objetos</Text>
                    <Octicons name="diff-added" size={25} color='black' style={{}}/>
                </View>
                <ItemCardHistory dataObj={obj} />
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}