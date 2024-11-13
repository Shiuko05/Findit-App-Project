import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HeaderScreenView from '../components/HeaderScreenView'
import ItemCardFindView from '../components/ItemCardFindView'
import { AuthContext } from '../contexts/authContext'
import config from '../config/config'

export default function ObjsFindedScreen({expandHandler, closeHandler}) {

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
  
      const dataFiltered = data.filter((item) => item.objEstado == 2);
      setObj(dataFiltered);
    }

    // Función que se ejecuta cuando se hace el gesto de refresco
    const onRefresh = () => {
      fetchUser();
      fetchObj();
    }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl
                  refreshing={refreshing} // Estado que controla si se está refrescando
                  onRefresh={onRefresh} // Función que se ejecuta al refrescar
              />
            }
          >
              <HeaderScreenView dataUsers={users}/>
              <ItemCardFindView expandHandler={expandHandler} dataObj={obj}/>
          </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}