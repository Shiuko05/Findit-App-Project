import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/authContext';
import { Octicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { setAvatarContext } from '../contexts/setAvatarContext';
import config from '../config/config';

export default function ProfileDetailsScreen({navigation}) {

    const { userInfo } = useContext(AuthContext);
    const [ isEditable, setIsEditable ] = useState(false);
    const [ avatarType, setAvatarType ] = useState(null);
    const [ avatar, setAvatarUrl ] = useState(null);
    const { setAvatar, isLoading } = useContext(setAvatarContext);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch(`http://${config.BASE_URL}:8080/users/${userInfo.iduser}`);
        const data = await response.json();
        setUsers(data);
    }

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    }

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
            console.log(result.assets[0].uri);
            setAvatarUrl(result.assets[0].uri);
            setIsEditable(false);
            setAvatarType(result.assets[0].mimeType);
            setAvatar(result.assets[0].uri, result.assets[0].mimeType);
        }
    };
    
  return (
    <SafeAreaProvider>
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <View>
                {users.map((item) => (
                    <View key={item.id}>
                        <View style={styles.titleHeader}>
                            <TouchableOpacity onPress={() => navigation.navigate('ProfileUserScreen')}>
                                <Octicons name="arrow-left" size={25} color="black"/>
                            </TouchableOpacity>
                            <Text style={{fontFamily: 'poppins-semibold', fontSize: 20, padding: 20}}>Editar Perfil</Text>
                            <TouchableOpacity style={styles.iconContainer} onPress={toggleEditable}>
                                {isEditable ? <Octicons name="check" size={25} color="black" /> : <Octicons name="pencil" size={25} color="black" />}
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.imageContainer} onPress={isEditable ? pickImage : undefined}>
                            <View style={styles.imageWrapper}>
                                {/* Imagen */}
                                {/* Si la imagen está seleccionada, mostrarla */}
                            {avatar ? (
                                <Image
                                    style={[
                                        styles.imgUser,
                                        isEditable && { opacity: 0.5 }, // Efecto de opacidad cuando está en modo editable
                                    ]}
                                    source={{ uri: avatar }}
                                />
                            ) : (
                                <Image
                                    style={[
                                        styles.imgUser,
                                        isEditable && { opacity: 0.5 }, // Efecto de opacidad cuando está en modo editable
                                    ]}
                                    source={{ uri: item.avatarUrl }}
                                />
                            )}
                            {/* Capa de superposición */}
                            {isEditable && (
                                <View style={styles.overlay}>
                                    <View style={styles.onEditableIcon}>
                                        <Octicons name="share" size={30} color="#555" />
                                    </View>
                                </View>
                            )}
                            
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
                </View>
                <View style={styles.usersInfo}>
                    <TextInput placeholder='Nombre Completo' />
                </View>
            </SafeAreaView>
        </ScrollView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    titleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    imgUser: {
        width: 130,
        height: 130,
        borderRadius: 10,
        alignSelf: 'center',
        borderColor: 'white',
        borderWidth: 3,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageWrapper: {
        position: 'relative',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 130,
        height: 130,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Color negro con transparencia
        borderRadius: 10,
    },
    onEditableIcon: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
    },
    usersInfo: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        marginVertical: 20,
        padding: 10,
        justifyContent: 'center'
    },
})