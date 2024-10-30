import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PostContext } from '../contexts/postContext';
import { Ionicons } from '@expo/vector-icons';
import AppTextInput from '../components/AppTextInput';

export default function PostUserScreen() {
  const [nombreobj, setNombreObj] = useState('');
  const [lugar, setLugar] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const { postPerdido, isLoading } = useContext(PostContext);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          padding: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: "poppins-bold",
              color: "#1E319D",
              marginVertical: 10,
              top: 10
            }}
          >
            Crear Objeto
          </Text>
          <Text
            style={{
              fontFamily: "poppins-regular",
              fontSize: 14,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Completa los campos para poder crear una cuenta
          </Text>
        </View>
        <View>
        </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <AppTextInput secureTextEntry={false} placeholder="Nombre del Objeto" onChangeText={text => setNombreObj(text)}/>
          <AppTextInput secureTextEntry={false} placeholder="Lugar donde se encontró" onChangeText={text => setLugar(text)}/>
          <AppTextInput secureTextEntry={false} placeholder="Descripción" onChangeText={text => setDescripcion(text)}/>
          <AppTextInput secureTextEntry={false} placeholder="Fecha que se encontró" onChangeText={text => setFecha(text)}/>
          <AppTextInput secureTextEntry={false} placeholder="Hora aproximada" onChangeText={text => setHora(text)}/>
        </View>

        <TouchableOpacity
          onPress={() => postPerdido( nombreobj, lugar, descripcion, fecha, hora)}
          style={{
            padding: 20,
            backgroundColor: "#1E319D",
            marginVertical: 20,
            borderRadius: 10,
            shadowColor: "blue",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "poppins-bold",
              color: "white",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  )
}