import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/authContext';
import { Octicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import { ScrollView } from 'react-native-gesture-handler';

export default function ProfileDetailsScreen({navigation}) {

    const { userInfo } = useContext(AuthContext);
    const [ isEditable, setIsEditable ] = useState(false);

    const toggleEditable = () => {
        setIsEditable(!isEditable);
    }
    
  return (
    <SafeAreaProvider>
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView>
                <View>
                    <View style={styles.titleHeader}>
                        <TouchableOpacity onPress={() => navigation.navigate('ProfileUserScreen')}>
                            <Octicons name="arrow-left" size={25} color="black"/>
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'poppins-semibold', fontSize: 20, padding: 20}}>Editar Perfil</Text>
                        <TouchableOpacity style={styles.iconContainer} onPress={toggleEditable}>
                            {isEditable ? <Octicons name="check" size={25} color="black" /> : <Octicons name="pencil" size={25} color="black" />}
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.imageContainer}>
                        <View style={styles.imageWrapper}>
                            {/* Imagen */}
                            <Image
                            style={[
                                styles.imgUser,
                                isEditable && { opacity: 0.5 }, // Efecto de opacidad cuando está en modo editable
                            ]}
                            source={require('../assets/images/profile-image.jpg')}
                            />
                            {/* Capa de superposición */}
                            {isEditable && (
                            <View style={styles.overlay} />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.usersInfo}>
                    <AppTextInput editable={isEditable}>{userInfo.username}</AppTextInput>
                    <AppTextInput editable={isEditable}>{userInfo.userapepat}</AppTextInput>
                    <AppTextInput editable={isEditable}>{userInfo.userapemat}</AppTextInput>
                    <AppTextInput editable={isEditable}>{userInfo.email}</AppTextInput>
                    <AppTextInput editable={isEditable}>{userInfo.typeuser == 1 ? "Estudiante" : userInfo.typeuser == 2 ? "Civil" : userInfo.typeuser == 3 ? "Admin" : ""}</AppTextInput>
                    <AppTextInput editable={isEditable} placeholder='Número de Celular'>{userInfo.celular}</AppTextInput>
                    <AppTextInput editable={isEditable} placeholder='Número de Control'>{userInfo.numcontrol}</AppTextInput>
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