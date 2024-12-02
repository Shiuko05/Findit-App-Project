import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/authContext';
import { Octicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import { ScrollView } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { setAvatarContext } from '../contexts/setAvatarContext';
import config from '../config/config.js';

const { height } = Dimensions.get("window");

export default function ProfileDetailsScreen({navigation}) {

    const { userInfo } = useContext(AuthContext);
    const [ isEditable, setIsEditable ] = useState(false);
    const [ avatarType, setAvatarType ] = useState(null);
    const [ avatar, setAvatarUrl ] = useState(null);
    const { setAvatar, isLoading } = useContext(setAvatarContext);

    const [username, setUsername] = useState('');
    const [userapepat, setUserapepat] = useState('');
    const [userapemat, setUserapemat] = useState('');
    const [useremail, setUseremail] = useState('');
    const [usertype, setUsertype] = useState('');
    const [usermatricula, setUsermatricula] = useState('');

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch(`https://${config.BASE_URL}/users/${userInfo.iduser}`);
        const data = await response.json();
        setUsers(data);

        setUsername(data[0].username);
        setUserapepat(data[0].userapepat);
        setUserapemat(data[0].userapemat);
        setUseremail(data[0].email);
        
        if (data[0].typeuser == 1) {
            setUsertype('Estudiante');
        } else if (data[0].typeuser == 2) {
            setUsertype('Civil');
        }
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
        {users.map((item) => (
            <SafeAreaView>
                <View>
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
                </View>
                <View>
                    <View style={styles.usersInfo}>
                        <View style={{padding: 5, marginTop: 10}}>
                            <Text style={{fontFamily: 'poppins-semibold', fontSize: 16, color: '#555'}}>Información Personal</Text>
                            <Text style={{fontFamily: 'poppins-regular', fontSize: 12, color: 'black', top: -5}}>Actualiza tu información personal dando click al lapiz para editar</Text>
                        </View>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <TextInput editable={isEditable} style={styles.textInput} placeholder='Nombre' value={username} onChangeText={setUsername} />
                            <View style={styles.viewInputRow}>
                                <TextInput editable={isEditable} style={styles.textInputRow} placeholder='Apellido Paterno' value={userapepat} onChangeText={setUserapepat} />
                                <TextInput editable={isEditable} style={styles.textInputRow} placeholder='Apellido Materno' value={userapemat} onChangeText={setUserapemat} />
                            </View>
                            <TextInput editable={isEditable} style={styles.textInput}placeholder='Correo Electrónico' value={useremail} onChangeText={setUseremail} />
                            <TextInput editable={isEditable} style={styles.textInput}placeholder='Tipo de Cuenta' value={usertype} onChangeText={setUsertype} />
                            <TextInput editable={isEditable} style={styles.textInput}placeholder='Matricula o CURP' />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            ))}
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
        backgroundColor: 'white',
        height: height / 1.5,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        marginTop: 50,
        padding: 10,

        // Sombra en iOS
        shadowColor: '#000',            // Color de la sombra
        shadowOffset: { width: 0, height: -2 }, // Desplazamiento de la sombra
        shadowOpacity: 0.3,             // Opacidad de la sombra
        shadowRadius: 4,                // Difuminado de la sombra

        // Sombra en Android
        elevation: 5,                   // Elevación en Android para crear sombra
    },
    textInput: {
        marginTop: 10,
        fontFamily: 'poppins-regular',
        backgroundColor: '#f1f4ff',
        padding: 8,
        borderRadius: 5,
        width: '90%',
        color: 'black',
        borderWidth: 2,
        borderColor: "#1E319D",
        fontSize: 12,
        
        shadowOffset: { width: 4, height: 10 },
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    viewInputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textInputRow: {
        marginTop: 10,
        marginHorizontal: 10,
        fontFamily: 'poppins-regular',
        backgroundColor: '#f1f4ff',
        padding: 8,
        borderRadius: 5,
        width: '42%',
        color: 'black',
        borderWidth: 2,
        borderColor: "#1E319D",
        fontSize: 12,

        shadowOffset: { width: 4, height: 10 },
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
})