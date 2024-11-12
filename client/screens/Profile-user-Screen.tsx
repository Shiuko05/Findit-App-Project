import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { AuthContext } from '../contexts/authContext'
import config from '../config/config'
import { Octicons } from '@expo/vector-icons'
import ProfileDetailsScreen from './Profile-Details-Screen'

const { height } = Dimensions.get('screen')

export default function ProfileuserScreen({navigation}) {

    const { logout } = useContext(AuthContext);
    const { userInfo } = useContext(AuthContext);
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch(`http://${config.BASE_URL}:8080/users/${userInfo.iduser}`);
        const data = await response.json();
        setUsers(data);
    }

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerLogout}>
              {/*<TouchableOpacity onPress={() => {logout()}}>
                    <Octicons 
                        name="sign-in"
                        size={25}
                        color="black"
                    />
              </TouchableOpacity>*/}
              <Text style={{fontFamily: 'poppins-bold', fontSize: 20}}>
                Opciones de Perfil
              </Text>
            </View>
            <View style={styles.userInfo}>
              <Image 
                source={require('../assets/images/profile-image.jpg')}
                style={styles.profileImage}
              />
              <View style={styles.textUserInfo}>
                <Text style={{fontFamily: 'poppins-semibold', fontSize: 12}}>{userInfo.username + " " + userInfo.userapepat + " " + userInfo.userapemat}</Text>
                <Text style={{fontFamily: 'poppins-regular', fontSize: 12, color: '#555'}}>{userInfo.email}</Text>
                <Text style={{fontFamily: 'poppins-regular', fontSize: 12, color: '#555'}}>{userInfo.typeuser == 1 ? "Estudiante" : userInfo.typeuser == 2 ? "Civil" : userInfo.typeuser == 3 ? "Admin" : ""}</Text>
              </View>
            </View>
          </View>
          <View style={styles.generalContainer}>
            <View>
              <Text style={{fontFamily: 'poppins-semibold', color: '#888'}}>General</Text>
            </View>
            <View>
              <View style={styles.optionCard}>
              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('EditProfile')}>
                  {/* Agrupamos el ícono de la persona y el texto */}
                  <View style={styles.rowGroup}>
                    <View style={{backgroundColor: '#f1f4ff', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                      <Octicons name="person" size={20} color="#1E319D"/>
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.text}>Editar Perfil</Text>
                      <Text style={{fontFamily: 'poppins-regular', fontSize: 10, marginLeft: 10, top: -6}}>
                        Actualiza la información de tu perfil
                      </Text>
                    </View>
                  </View>
                  {/* Icono de flecha */}
                  <Octicons name="chevron-right" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('EditProfile')}>
                  {/* Agrupamos el ícono de la persona y el texto */}
                  <View style={styles.rowGroup}>
                    <View style={{backgroundColor: '#f1f4ff', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                      <Octicons name="lock" size={20} color="#1E319D"/>
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.text}>Cambiar Contraseña</Text>
                      <Text style={{fontFamily: 'poppins-regular', fontSize: 10, marginLeft: 10, top: -6}}>Actualizar la seguridad de la cuenta</Text>
                    </View>
                  </View>
                  {/* Icono de flecha */}
                  <Octicons name="chevron-right" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('EditProfile')}>
                  {/* Agrupamos el ícono de la persona y el texto */}
                  <View style={styles.rowGroup}>
                    <View style={{backgroundColor: '#f1f4ff', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                      <Octicons name="package" size={20} color="#1E319D"/>
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.text}>
                        Historial de Objetos
                      </Text>
                      <Text style={{fontFamily: 'poppins-regular', fontSize: 10, marginLeft: 10, top: -6}}>
                        Revisa los objetos que has dado de alta
                      </Text>
                    </View>
                  </View>
                  {/* Icono de flecha */}
                  <Octicons name="chevron-right" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.preferences}>
            <View>
            <Text style={{fontFamily: 'poppins-semibold', color: '#888'}}>Preferencias</Text>
            </View>
            <View>
              <View style={styles.optionCard}>
              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('EditProfile')}>
                  {/* Agrupamos el ícono de la persona y el texto */}
                  <View style={styles.rowGroup}>
                    <View style={{backgroundColor: '#f1f4ff', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                      <Octicons name="bell" size={20} color="#1E319D"/>
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.text}>
                        Notificaciones
                      </Text>
                      <Text style={{fontFamily: 'poppins-regular', fontSize: 10, marginLeft: 10, top: -6}}>
                        Revisa las notificaciones de la aplicación
                      </Text>
                    </View>
                  </View>
                  {/* Icono de flecha */}
                  <Octicons name="chevron-right" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.row} onPress={() => logout()}>
                  {/* Agrupamos el ícono de la persona y el texto */}
                  <View style={styles.rowGroup}>
                    <View style={{backgroundColor: '#fce3e9', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                      <Octicons name="sign-out" size={20} color="#cf1348"/>
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <Text style={styles.text}>Cerrar Sesión</Text>
                      <Text style={{fontFamily: 'poppins-regular', fontSize: 10, marginLeft: 10, top: -6}}>
                        Cierra la sesión actual
                      </Text>
                    </View>
                  </View>
                  {/* Icono de flecha */}
                  <Octicons name="chevron-right" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    marginVertical: 10,
  },
  userInfo: {
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
  textUserInfo: {
    flexDirection: 'column',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3,
    marginRight: 10,
  },
  headerLogout: {
    alignItems: 'center',
  },
  generalContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionCard: {
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'poppins-semibold',
    color: 'black',
    marginLeft: 10,
  },
  preferences: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
})