import { View, Text, ScrollView, Touchable, Image, Dimensions, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import * as FileSystem from 'expo-file-system';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
//import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import AppTextInput from '../components/AppTextInput';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PostUserScreen from './Post-user-Screen';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { PostContext } from '../contexts/postContext';
import { Buffer } from 'buffer';
import moment from 'moment';
// import ImagePicker from 'react-native-image-crop-picker';

const { height } = Dimensions.get('screen');

const progressStepsStyle = {
    activeStepIconBorderColor: '#1E319D',
    activeLabelColor: '#1E319D',
    activeStepNumColor: 'white',
    activeStepIconColor: '#1E319D',
    completedStepIconColor: '#1E319D',
    completedProgressBarColor: '#1E319D',
    completedCheckColor: 'white',
    labelFontFamily: 'poppins-regular',
};

export default function PostObjsStepsScreen() {

    const [imageUri, setImageUri] = useState(null); // Estado para almacenar la imagen
    const [imageBase, setImageBase] = useState(null); // Estado para almacenar la imagen en base64
    const [selectedStatus, setSelectedStatus] = useState('');  // Estado para 'Perdido' o 'Encontrado'
    const [selectedCategory, setSelectedCategory] = useState('');  // Estado para la categoría
    const [textDescription, setTextDescription] = useState('');


    const [nombreobj, setNombreObj] = useState('');
    const [lugar, setLugar] = useState('');
    const [fecha, setFecha] = useState(new Date());
    const [hora, setHora] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedHour, setSelectedHour] = useState<string>('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);


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

    const [currentStep, setCurrentStep] = useState(0);

    // Asegurarte de que el primer paso sea siempre seleccionado
    useEffect(() => {
        setCurrentStep(0);
    }, []); // Se ejecuta solo una vez cuando el componente se monta


  return (
    <SafeAreaProvider style={{backgroundColor: 'white'}}>
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'center' }}>
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
                        </View>
                <ProgressSteps {...progressStepsStyle} activeStep={currentStep} onStepChange={(step) => setCurrentStep(step)}>
                    <ProgressStep label='Subir Objeto' nextBtnText="Siguiente">
                    <View style={{ alignItems: 'center' }}>
                         {/* Contenedor de la imagen con un fondo por defecto */}
                        <View
                            style={{
                                width: 200,
                                height: 200,
                                marginTop: 10,
                                backgroundColor: '#f1f4ff', // Color de fondo por defecto
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10, // Bordes redondeados
                            }}
                        >
                            {/* Si la imagen está seleccionada, mostrarla */}
                            {imageUri ? (
                                <Image 
                                    source={{ uri: imageUri }} 
                                    style={{ width: '100%', height: '100%', borderRadius: 10 }} 
                                />
                            ) : (
                                <Text style={{ color: '#777', fontFamily: 'poppins-regular' }}>No hay imagen</Text> // Texto de placeholder
                            )}
                        </View>

                        <TouchableOpacity onPress={pickImage} style={{marginTop: 10, padding: 20, width: height / 2.45, backgroundColor: "#f1f4ff", borderRadius: 10, }}>
                            <Text style={{ fontFamily: "poppins-regular", fontSize: 14, color: '#666' }}>Seleccionar imagen</Text>
                        </TouchableOpacity>

                        <AppTextInput placeholder="Nombre del objeto" onChangeText={text => setNombreObj(text)}/>

                        <Picker
                            selectedValue={selectedStatus}
                            style={{ padding: 20, width: height / 2.45, backgroundColor: "#f1f4ff", borderRadius: 10, color: '#666', fontFamily: 'poppins-regular' }}
                            onValueChange={(itemValue, itemIndex) => setSelectedStatus(itemValue)}
                        >
                            <Picker.Item label="Selecciona un estado" value="" />
                            <Picker.Item label="Perdido" value="1" />
                            <Picker.Item label="Encontrado" value="2" />
                        </Picker>

                        <Picker
                            selectedValue={selectedCategory}
                            style={{ marginVertical: 10, padding: 20, width: height / 2.45, backgroundColor: "#f1f4ff", borderRadius: 10, color: '#666', fontFamily: 'poppins-regular' }}
                            onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
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

                    </ProgressStep>
                    <ProgressStep label='Detalles' nextBtnText="Siguiente" previousBtnText="Regresar">
                        <View style={{ alignItems: 'center', marginVertical: 20 }}>
                            <AppTextInput
                                secureTextEntry={false}
                                placeholder="Lugar donde se encontró"
                                onChangeText={text => setLugar(text)}
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
                                <AppTextInput
                                    multiline={true}                 // Permite múltiples líneas de texto
                                    numberOfLines={4}                // Número de líneas visibles (puedes ajustarlo)
                                    value={textDescription}                // Valor del textarea
                                    placeholder="Descripción del objeto"  // Placeholder
                                    onChangeText={text => setTextDescription(text)}  // Actualiza el estado al escribir
                                />
                        </View>
                    </ProgressStep>
                    <ProgressStep label='Revisión' previousBtnText="Regresar" finishBtnText="">
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity
                            onPress={() => postPerdido(imageUri, imageBase, nombreobj, selectedStatus, selectedCategory, textDescription, selectedHour, selectedDate, lugar)}
                            style={{
                                padding: 20,
                                width: height / 2.45,
                                backgroundColor: '#1E319D',
                                marginVertical: 20,
                                borderRadius: 10,
                                shadowColor: 'blue',
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
                                    fontFamily: 'poppins-bold',
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: 18,
                                    }}
                                >
                                    Crear Objeto
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </ScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
  )
}