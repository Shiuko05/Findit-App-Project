import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderScreenView from '../components/HeaderScreenView'
import ItemCardFindView from '../components/ItemCardFindView'

export default function ObjsFindedScreen({expandHandler}: {expandHandler: () => void}) {
  return (
    <SafeAreaView>
        <ScrollView>
            <HeaderScreenView />
            <ItemCardFindView />
        </ScrollView>
    </SafeAreaView>
  )
}