import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PostContext } from '../contexts/postContext';
import { Ionicons } from '@expo/vector-icons';
import AppTextInput from '../components/AppTextInput';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function PostUserScreen() {
  const [nombreobj, setNombreObj] = useState('');
  const [lugar, setLugar] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const { postPerdido, isLoading } = useContext(PostContext);
  const { height } = Dimensions.get('screen');

  // Función para manejar cambios de fecha
  const onChangeFecha = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(false); // Ocultar picker después de seleccionar fecha
    setFecha(currentDate);
  };

  const onChangeHora = (event, selectedTime) => {
    const currentTime = selectedTime || fecha;
    setShowTimePicker(false); // Ocultar picker después de seleccionar hora
    setFecha(currentTime); // Actualiza la fecha con la nueva hora
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 0 }}>
            {/*<View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: 'poppins-bold',
                  color: '#1E319D',
                  marginVertical: 10,
                  top: 10,
                }}
              >
                Crear Objeto
              </Text>
              <Text
                style={{
                  fontFamily: 'poppins-regular',
                  fontSize: 14,
                  maxWidth: '80%',
                  textAlign: 'center',
                }}
              >
                Completa los campos para poder crear una cuenta
              </Text>
            </View>*/}

            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <AppTextInput
                secureTextEntry={false}
                placeholder="Nombre del Objeto"
                onChangeText={text => setNombreObj(text)}
              />
              <AppTextInput
                secureTextEntry={false}
                placeholder="Lugar donde se encontró"
                onChangeText={text => setLugar(text)}
              />
              <AppTextInput
                secureTextEntry={false}
                placeholder="Descripción"
                onChangeText={text => setDescripcion(text)}
              />

                {/* Botón para seleccionar fecha */}
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={{
                    padding: 20,
                    width: height / 2.45,
                    backgroundColor: '#f1f4ff',
                    marginVertical: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: '#666', fontSize: 14, fontFamily: 'poppins-regular' }}>
                  Fecha: {fecha.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  </Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={fecha}
                    mode="date"
                    display="default"
                    onChange={onChangeFecha}
                  />
                )}

                {/* Botón para seleccionar hora */}
                <TouchableOpacity
                  onPress={() => setShowTimePicker(true)}
                  style={{
                    padding: 20,
                    width: height / 2.45,
                    backgroundColor: '#f1f4ff',
                    marginVertical: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: '#666', fontSize: 14, fontFamily: 'poppins-regular'}}>
                  Hora aproximada: {fecha.toLocaleTimeString()}
                  </Text>
                </TouchableOpacity>

                {showTimePicker && (
                  <DateTimePicker
                    value={fecha}
                    mode="time"
                    display="default"
                    onChange={onChangeHora}
                  />
                )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
