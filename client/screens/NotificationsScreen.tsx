import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RefreshControl, ScrollView } from 'react-native-gesture-handler'
import { AuthContext } from '../contexts/authContext';
import Config from '../config/config.js';

export default function NotificationsScreen({navigation}) {

    const [refreshing, setRefreshing] = useState(false);
    const { userInfo } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifyUser();
    }, []);

    const fetchNotifyUser = async () => {
        const response = await fetch(`https://${Config.BASE_URL}/notifications/${userInfo.iduser}`);
        const data = await response.json();
        console.log(data);
        setNotifications(data);
    }

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
                {(notifications.length > 0) ? (
                    notifications.map((item, index) => (
                        <View key={index}>
                        <Text>{formatDate(item.fechaNotificacion)}</Text>
                        </View>
                    ))
                ) : (
                    <View>
                        <Text>No hay notificaciones</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}