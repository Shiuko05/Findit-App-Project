import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Octicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderScreenView from '../components/HeaderScreenView'
import config from '../config/config';
import { AuthContext } from '../contexts/authContext';

export default function MessagesUserScreen() {

  const { userInfo } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [obj, setObj] = useState([]);

    const [refreshing, setRefreshing] = useState(false); // Estado para controlar el "refresh"

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        setRefreshing(true); // Comienza el refresco
        const response = await fetch(`http://${config.BASE_URL}:8080/users/${userInfo.iduser}`);
        const data = await response.json();
        setUsers(data);
        setRefreshing(false); // Finaliza el refresco
    }

  // Función que se ejecuta cuando se hace el gesto de refresco
  const onRefresh = () => {
    fetchUser();
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}

      >
        <View>
          <View>
            <HeaderScreenView dataUsers={users}/>
          </View>
          <View>
          <View style={styles.preferences}>
            <View>
            <Text style={{fontFamily: 'poppins-semibold', color: '#888'}}>
              Información
            </Text>
            </View>
            <View>
              <View style={styles.optionCard}>
              <TouchableOpacity style={styles.row}>
                  {/* Agrupamos el ícono de la persona y el texto */}
                  <View style={styles.rowGroup}>
                    <View style={{backgroundColor: '#f1f4ff', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                      <Octicons name="repo-push" size={20} color="#1E319D"/>
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.text}>
                          Reclamar Objeto
                        </Text>
                      </View>
                      <Text style={{fontFamily: 'poppins-regular', fontSize: 10, marginLeft: 10, top: -6}}>
                        Reclama un objeto dado de alta
                      </Text>
                    </View>
                  </View>
                  {/* Icono de flecha */}
                  <Octicons name="chevron-right" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.row}>
                  {/* Agrupamos el ícono de la persona y el texto */}
                  <View style={styles.rowGroup}>
                    <View style={{backgroundColor: '#f1f4ff', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 30}}>
                      <Octicons name="paste" size={20} color="#1E319D"/>
                    </View>
                    
                    <View style={{flexDirection: 'column'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.text}>
                          Historial de reclamos
                        </Text>
                      </View>
                      <Text style={{fontFamily: 'poppins-regular', fontSize: 10, marginLeft: 10, top: -6}}>
                        Ver historial de reclamos realizados
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({ 
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
