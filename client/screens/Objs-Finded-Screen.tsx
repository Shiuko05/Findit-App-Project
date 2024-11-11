import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import HeaderScreenView from '../components/HeaderScreenView'
import ItemCardFindView from '../components/ItemCardFindView'

export default function ObjsFindedScreen({closeHandler}) {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
          <ScrollView>
              <HeaderScreenView closeHandler={closeHandler} />
              <ItemCardFindView />
          </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}