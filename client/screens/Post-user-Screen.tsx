import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, Image, RefreshControl } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { PostContext } from '../contexts/postContext';
import { Ionicons, Octicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

export default function PostUserScreen() {
  const [nombreobj, setNombreObj] = useState('');
  const [textDescription, setTextDescription] = useState('');

  const [lugar, setLugar] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState('');  // Estado para 'Perdido' o 'Encontrado'
  const [selectedCategory, setSelectedCategory] = useState('');  // Categoría del objeto

  const [imageUri, setImageUri] = useState(null);
  const [imageBase, setImageBase] = useState(null);

  const { postPerdido, isLoading } = useContext(PostContext);
  const { height } = Dimensions.get('screen');

  // Función para manejar cambios de fecha
  const onChangeFecha = (event, selectedDate) => {
    const currentDate = selectedDate || fecha;
    setShowDatePicker(false); // Ocultar picker después de seleccionar fecha
    const formattedTime = moment(currentDate).format('YYYY-MM-DD');
    console.log(formattedTime);
    setSelectedDate(formattedTime);
  };

  const onChangeHora = (event, selectedTime) => {
      const currentTime = selectedTime || hora;
      setShowTimePicker(false); // Ocultar picker después de seleccionar hora
      const formattedHour = moment(currentTime).format('HH:mm:ss');
      console.log(formattedHour);
      setSelectedHour(formattedHour);
  };

  const [focused, setFocused] = useState<boolean>(false);

  // Función para pedir permisos y abrir la galería
  const pickImage = async () => {
    // Pedir permisos de la cámara
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        alert('Se necesitan permisos para acceder a la galería');
        return;
    }

    // Abrir la galería para seleccionar una imagen
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: false, // Convertir la imagen a base64
        aspect: [1, 1], // Ajustar el aspecto de la imagen si es necesario
        quality: 1, // Calidad máxima de la imagen
    });

    // Si el usuario no canceló, guardar el URI de la imagen
    if (!result.canceled) {
        console.log(result);
        setImageUri(result.assets[0].uri);
        setImageBase(result.assets[0].mimeType);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    // Inicia el estado de refresco
    setRefreshing(true);

    // Limpiar los campos del formulario
    setNombreObj('');
    setSelectedStatus('');
    setSelectedCategory('');
    setTextDescription('');
    setSelectedHour('');
    setSelectedDate('');
    setLugar('');
    setImageUri(null);
    setImageBase(null);

    // Simular una espera de 1 segundo para finalizar el refresh
    setTimeout(() => {
      setRefreshing(false);  // Finaliza el estado de refresco
    }, 1000);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.mainContainer}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontFamily: 'poppins-semibold', fontSize: 20}}>Subir Objetos</Text>
            </View>
            <View style={styles.sectionOne}>
              <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <View style={{marginRight: 16}}>
                  {imageUri ? (
                    <Image 
                        source={{ uri: imageUri }} 
                        style={{ padding: 70, borderRadius: 10 }} 
                    />
                  ) : (
                    <TouchableOpacity style={{padding: 45, borderRadius: 10, backgroundColor: '#f1f4ff'}}>
                      <Octicons name="image" size={50} color="#1E319D" />
                    </TouchableOpacity>
                  )}
                </View>
                <View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={{fontFamily: 'poppins-semibold', fontSize: 14}}>Cargar Imagen</Text>
                    <Text style={{fontFamily: 'poppins-regular', top: -8, fontSize: 12}}>Selecciona una imagen</Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={pickImage} style={{alignItems: 'center', padding: 10, borderColor: '#777', borderWidth: 1, borderRadius: 5}}>
                      <Octicons name="upload" size={40} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.sectionOne}>
              <View>
                <Text style={{fontFamily: 'poppins-semibold', fontSize: 14, color: '#666'}}>Datos del Objeto</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
                  <TextInput style={[
                    {
                      fontFamily: 'poppins-regular',
                      backgroundColor: '#f1f4ff',
                      padding: 10,
                      borderRadius: 5,
                      width: '100%',
                      color: 'black',
                      borderWidth: 2,
                      borderColor: "#1E319D",
                      fontSize: 14,
                    },
                  ]} value={nombreobj} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onChangeText={text => setNombreObj(text)} placeholder='Nombre del Objeto'></TextInput>
                </View>
                <View style={{borderWidth: 2,
                      borderColor: "#1E319D", marginVertical: 0, borderRadius: 5, padding: 1}}>
                  <Picker selectedValue={selectedStatus} style={[
                    {
                      fontFamily: 'poppins-regular',
                      backgroundColor: '#f1f4ff',
                      borderRadius: 5,
                      color: '#555',
                      borderWidth: 2,
                      borderColor: "#1E319D",
                      width: '100%',
                      fontSize: 10,
                    }
                  ]} onValueChange={(itemValue, itemIndex) => setSelectedStatus(itemValue)}
                  >
                    <Picker.Item label="Selecciona un estado" value="" />
                    <Picker.Item label="Perdido" value="1" />
                    <Picker.Item label="Encontrado" value="2" />
                  </Picker>
                </View>
                <View style={{borderWidth: 2,
                      borderColor: "#1E319D", marginVertical: 10, borderRadius: 5, padding: 1}}>
                  <Picker selectedValue={selectedCategory} style={[
                    {
                      fontFamily: 'poppins-regular',
                      backgroundColor: '#f1f4ff',
                      borderRadius: 5,
                      color: '#555',
                      borderWidth: 2,
                      borderColor: "#1E319D",
                      width: '100%',
                      fontSize: 10,
                    }
                  ]} onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
                  >
                    <Picker.Item label="Selecciona una categoría" value="" />
                    <Picker.Item label="Electrónicos" value="1" />
                    <Picker.Item label="Documentos personales" value="2" />
                    <Picker.Item label="Ropa y Accesorios" value="3" />
                    <Picker.Item label="Juguetes" value="4" />
                    <Picker.Item label="Mochillas y Bolsos" value="5" />
                    <Picker.Item label="Material Escolar u Oficina" value="6" />
                    <Picker.Item label="Herramientas y Equipos" value="7" />
                    <Picker.Item label="Cuidado personal" value="8" />
                    <Picker.Item label="Artículos para Comida" value="9" />
                  </Picker>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <TextInput style={[
                    {
                      fontFamily: 'poppins-regular',
                      backgroundColor: '#f1f4ff',
                      padding: 10,
                      borderRadius: 5,
                      width: '100%',
                      color: 'black',
                      borderWidth: 2,
                      borderColor: "#1E319D"
                    }
                  ]}
                  value={textDescription} multiline={true} numberOfLines={4} onChangeText={text => setTextDescription(text)} placeholder='Descripción'></TextInput>
                </View>
              </View>
            </View>
            <View style={styles.finalSection}>
            <View>
                <Text style={{fontFamily: 'poppins-semibold', fontSize: 14, color: '#666'}}>Ubicación</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10}}>
                  <TextInput style={[
                    {
                      fontFamily: 'poppins-regular',
                      backgroundColor: '#f1f4ff',
                      padding: 10,
                      borderRadius: 5,
                      width: '100%',
                      color: 'black',
                      borderWidth: 2,
                      borderColor: "#1E319D",
                      fontSize: 14,
                    },
                  ]} value={lugar} onChangeText={text => setLugar(text)} placeholder='Lugar encontrado o perdido'></TextInput>
                </View>
                <View>
                  {/* Botón para seleccionar fecha */}
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={{
                      padding: 10,
                      backgroundColor: '#f1f4ff',
                      marginVertical: 0,
                      borderRadius: 5,
                      borderWidth: 2,
                      borderColor: "#1E319D"
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
                      padding: 10,
                      backgroundColor: '#f1f4ff',
                      marginVertical: 10,
                      borderRadius: 5,
                      borderWidth: 2,
                      borderColor: "#1E319D"
                  }}
                  >
                  <Text style={{ color: '#666', fontSize: 14, fontFamily: 'poppins-regular'}}>
                      Hora: {hora.toLocaleTimeString()}
                  </Text>
                  </TouchableOpacity>

                  {showTimePicker && (
                  <DateTimePicker
                      value={hora}
                      mode="time"
                      display="default"
                      onChange={onChangeHora}
                  />
                  )}
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => postPerdido(imageUri, imageBase, nombreobj, selectedStatus, selectedCategory, textDescription, selectedHour, selectedDate, lugar)} style={{backgroundColor: '#1E319D', padding: 20, borderRadius: 10, marginVertical: 10, marginHorizontal: 20, marginBottom: 20, elevation: 5}}>
                <Text style={{color: 'white', textAlign: 'center', fontFamily: 'poppins-semibold', fontSize: 16}}>Publicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 20,
  },
  sectionOne: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
  },
  finalSection: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 20,
    borderRadius: 15,
    flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
