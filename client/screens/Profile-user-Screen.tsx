import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, RefreshControl, Modal, Alert, ScrollView } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-gesture-handler'
import { AuthContext } from '../contexts/authContext'
import config from '../config/config.js'
import { Octicons } from '@expo/vector-icons'
import ProfileDetailsScreen from './Profile-Details-Screen'
import { setUserPassContext } from '../contexts/updatePassConext'
import { set } from 'date-fns'

const { height } = Dimensions.get('screen')

export default function ProfileuserScreen({navigation}) {
    const [refreshing, setRefreshing] = useState(false);
    const { logout } = useContext(AuthContext);
    const { userInfo } = useContext(AuthContext);

    const { setUserPass, isLoading } = useContext(setUserPassContext);

    const [olduserpass, setOlduserpass] = useState('');
    const [newuserpass, setNewuserpass] = useState('');
    const [confirmnewuserpass, setConfirmnewuserpass] = useState('')
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    // Esta función manejará el refresco
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      // Aquí se dispara el evento de refresco
      fetchData(); 
    }, []);

    async function fetchData() {
        const response = await fetch(`https://${config.BASE_URL}/users/${userInfo.iduser}`);
        const data = await response.json();
        setUsers(data);
        setRefreshing(false);
    }

    // Estado para controlar la visibilidad del modal
    const [modalVisible, setModalVisible] = useState(false);

    // Función para abrir el modal
    const openModal = () => {
      setModalVisible(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
      setModalVisible(false);
    };

    const handlePasswordChange = () => {
      if (newuserpass !== confirmnewuserpass) {
          Alert.alert("Las contraseñas no coinciden");
          return;
      }
      setUserPass(olduserpass, newuserpass, confirmnewuserpass);
      setOlduserpass('');
      setNewuserpass('');
      setConfirmnewuserpass('');
      closeModal(); // Cierra el modal después de confirmar
    };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
              refreshing={refreshing} // Estado que controla si se está refrescando
              onRefresh={onRefresh} // Función que se ejecuta al refrescar
          />
        }
      >
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
            {users.map((item) => (
              <Image 
                source={{uri: item.avatarUrl}}
                style={styles.profileImage}
                key={item.avatarUrl}
              />
            ))}
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
                <TouchableOpacity style={styles.row} onPress={openModal}>
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
                <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ObjsList')}>
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
              <TouchableOpacity style={styles.row}>
                  {/* Agrupamos el ícono de la persona y el texto */}
                  <View style={styles.rowGroup}>
                    <View style={{backgroundColor: '#f1f4ff', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                      <Octicons name="gear" size={20} color="#1E319D"/>
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.text}>
                          Actualizaciones
                        </Text>
                        <Text style={{fontFamily: 'poppins-regular', color: 'red', fontSize: 10}}>
                          No Disponible
                        </Text>
                      </View>
                      <Text style={{fontFamily: 'poppins-regular', fontSize: 10, marginLeft: 10, top: -6}}>
                        Revisa las últimas actualizaciones
                      </Text>
                    </View>
                  </View>
                  {/* Icono de flecha */}
                  <Octicons name="chevron-right" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.row}
                  onPress={() => navigation.navigate('NotifyList')}>
                  {/* Agrupamos el ícono de la persona y el texto */}
                  <View style={styles.rowGroup}>
                    <View style={{backgroundColor: '#f1f4ff', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                      <Octicons name="bell" size={20} color="#1E319D"/>
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.text}>
                          Notificaciones
                        </Text>
                        <Text style={{fontFamily: 'poppins-regular', color: 'red', fontSize: 10}}>
                        </Text>
                      </View>
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
          {userInfo.typeuser == 3 && (
          <View style={styles.preferences}>
            <View>
            <Text style={{fontFamily: 'poppins-semibold', color: '#888'}}>Administrador</Text>
            </View>
            <View>
              <View style={styles.optionCard}>
              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Claims')}>
                  {/* Agrupamos el ícono de la persona y el texto */}
                  <View style={styles.rowGroup}>
                    <View style={{backgroundColor: '#f1f4ff', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                      <Octicons name="inbox" size={20} color="#1E319D"/>
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.text}>
                          Reclamaciones
                        </Text>
                        <Text style={{fontFamily: 'poppins-regular', color: 'green', fontSize: 10}}>
                          Solo Admin
                        </Text>
                      </View>
                      <Text style={{fontFamily: 'poppins-regular', fontSize: 10, marginLeft: 10, top: -6}}>
                        Revisa las reclamaciones de los usuarios
                      </Text>
                    </View>
                  </View>
                  {/* Icono de flecha */}
                  <Octicons name="chevron-right" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Claims')}>
                  {/* Agrupamos el ícono de la persona y el texto */}
                  <View style={styles.rowGroup}>
                    <View style={{backgroundColor: '#f1f4ff', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                      <Octicons name="book" size={20} color="#1E319D"/>
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.text}>
                          Encontrados
                        </Text>
                        <Text style={{fontFamily: 'poppins-regular', color: 'green', fontSize: 10}}>
                          Solo Admin
                        </Text>
                      </View>
                      <Text style={{fontFamily: 'poppins-regular', fontSize: 10, marginLeft: 10, top: -6}}>
                        Revisa los objetos encontrados
                      </Text>
                    </View>
                  </View>
                  {/* Icono de flecha */}
                  <Octicons name="chevron-right" size={20} color="black" />
              </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={styles.optionCard}>
              <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('PanelAdmin')}>
                  {/* Agrupamos el ícono de la persona y el texto */}
                  <View style={styles.rowGroup}>
                    <View style={{backgroundColor: '#f1f4ff', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                      <Octicons name="apps" size={20} color="#1E319D"/>
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.text}>
                          Panel de Control
                        </Text>
                        <Text style={{fontFamily: 'poppins-regular', color: 'green', fontSize: 10}}>
                          Solo Admin
                        </Text>
                      </View>
                      <Text style={{fontFamily: 'poppins-regular', fontSize: 10, marginLeft: 10, top: -6}}>
                        Revisa los datos de la aplicación
                      </Text>
                    </View>
                  </View>
                  {/* Icono de flecha */}
                  <Octicons name="chevron-right" size={20} color="black" />
              </TouchableOpacity>
              </View>
            </View>
          </View>
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="slide" // Puedes cambiar a "fade" o "none"
        transparent={true} // Hace que el fondo sea transparente
        visible={modalVisible} // Controla la visibilidad del modal
        onRequestClose={closeModal} // Acción cuando se cierra el modal
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={{fontFamily: 'poppins-semibold', fontSize: 16}}>Actualizar Contraseña</Text>
              <TouchableOpacity onPress={closeModal} style={{padding: 5}}>
                <Octicons name="x" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <View style={{width:'100%'}}>
              <TextInput secureTextEntry={true} style={styles.textInput} /*value='olduserpass'*/ onChangeText={text => setOlduserpass(text)} placeholder='Introduce tu contraseña'/>
              <TextInput secureTextEntry={true} style={styles.textInput} /*value='newuserpass'*/ onChangeText={text => setNewuserpass(text)} placeholder='Introduce tu nueva contraseña'/>
              <TextInput secureTextEntry={true} style={styles.textInput} /*value='confirmnewuserpass'*/ onChangeText={text => setConfirmnewuserpass(text)} placeholder='Confirma tu nueva contraseña'/>
            </View>

            {/* Botón para cerrar el modal */}
            <TouchableOpacity style={styles.closeButton} onPress={handlePasswordChange}>
              <Text style={styles.closeButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginRight: 5,
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
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro con opacidad
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#1E319D',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  textInput: {
    marginTop: 10,
    fontFamily: 'poppins-regular',
    backgroundColor: '#f1f4ff',
    padding: 8,
    borderRadius: 5,
    width: '100%',
    color: 'black',
    borderWidth: 2,
    borderColor: "#1E319D",
    fontSize: 12
  },
})