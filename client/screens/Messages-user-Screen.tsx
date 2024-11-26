import { View, Text, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native'
import { Octicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderScreenView from '../components/HeaderScreenView'
import config from '../config/config';
import { AuthContext } from '../contexts/authContext';
import ItemCardStatus from '../components/ItemCardStatus';

export default function MessagesUserScreen() {
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
      `http://${config.BASE_URL}:8080/all-objs-user/`
    );
    const data = await response.json();

    const dataFiltered = data.filter((item) => item.iduser == userInfo.iduser);
    setObj(dataFiltered);
    //setObj(data);
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
          <Text style={{padding: 20, fontSize: 18, fontFamily: "poppins-semibold"}}>Tus Reclamaciones</Text>
          <ItemCardStatus dataObj={obj} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
