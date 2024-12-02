import { View, Text, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native'
import { Octicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderScreenView from '../components/HeaderScreenView'
import config from '../config/config.js';
import { AuthContext } from '../contexts/authContext';
import ItemCardStatus from '../components/ItemCardStatus';

export default function MessagesUserScreen() {
  const { userInfo } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [obj, setObj] = useState([]);
  const [reclama, setReclama] = useState([]);
  const [reclamabyuser, setReclamaByUser] = useState([]);

  const [refreshing, setRefreshing] = useState(false); // Estado para controlar el "refresh"

  useEffect(() => {
      fetchUser();
      fetchObj();
      fetchData();
  }, []);

  async function fetchUser() {
      setRefreshing(true); // Comienza el refresco
      const response = await fetch(`http://${config.BASE_URL}:8080/users/${userInfo.iduser}`);
      const data = await response.json();
      setUsers(data);
      setRefreshing(false); // Finaliza el refresco
  }

  /*async function fetchObj() {
    reclama.map(async (item) => {
      const response = await fetch(
        `http://${config.BASE_URL}:8080/objs/${item.idobj}`
      );
      const data = await response.json();
      console.log(data);
      setObj(data);
    });
    //setObj(data);
  }*/

  async function fetchObj() {
    const allData = await Promise.all(
      reclama.map(async (item) => {
        const response = await fetch(
          `https://${config.BASE_URL}/objs/${item.idobj}`
        );
        return response.json();
      })
    );
    setObj(allData.flat()); // Aquí actualizas el estado con el array completo
  }
  
  
  async function fetchData() {
    const response = await fetch(`https://${config.BASE_URL}/objs/get-reclamations/${userInfo.iduser}`);
    const data = await response.json();
    console.log(data);
    setReclama(data);
    setRefreshing(false);
  }

  // Función que se ejecuta cuando se hace el gesto de refresco
  const onRefresh = () => {
    fetchUser();
    fetchObj();
    fetchData();
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
