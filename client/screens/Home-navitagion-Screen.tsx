import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Ionicons, Octicons} from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import HeaderScreenView from '../components/HeaderScreenView';
import ItemCardView from '../components/ItemCardView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetView, { BottomSheetMethods } from '../components/BottomSheetView';
import config from '../config/config.js';
import { AuthContext } from '../contexts/authContext';

export default function HomeNavigationScreen({expandHandler, closeHandler}) {
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
        const response = await fetch(`https://${config.BASE_URL}/users/${userInfo.iduser}`);
        const data = await response.json();
        setUsers(data);
        setRefreshing(false); // Finaliza el refresco
    }

    async function fetchObj() {
      const response = await fetch(
        `https://${config.BASE_URL}/all-objs-user`
      );
      const data = await response.json();

      console.log(data);
  
      const dataFiltered = data.filter((item) => item.objEstado == 1);
      setObj(dataFiltered);
    }

    // Función que se ejecuta cuando se hace el gesto de refresco
    const onRefresh = () => {
      fetchUser();
      fetchObj();
    }

  return (
    <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
            <ScrollView
              refreshControl={
                <RefreshControl
                    refreshing={refreshing} // Estado que controla si se está refrescando
                    onRefresh={onRefresh} // Función que se ejecuta al refrescar
                />
              }
            >
                <HeaderScreenView dataUsers={users}/>
                <ItemCardView expandHandler={expandHandler} dataObj={obj}/>
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}