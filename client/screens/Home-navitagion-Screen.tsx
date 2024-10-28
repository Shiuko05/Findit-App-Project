import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Ionicons, Octicons} from "@expo/vector-icons";
import { useFonts } from 'expo-font';
import HeaderScreenView from '../components/HeaderScreenView';
import ItemCardView from '../components/ItemCardView';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetView, { BottomSheetMethods } from '../components/BottomSheetView';

export default function HomeNavigationScreen({expandHandler, closeHandler}) {
  return (
    <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <HeaderScreenView closeHandler={closeHandler}/>
                <ItemCardView expandHandler={expandHandler}/>
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}