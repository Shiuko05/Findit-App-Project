import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Button, Alert } from 'react-native';
import { Octicons } from "@expo/vector-icons";
import { AuthContext } from '../contexts/authContext';
import { GetObjContext } from '../contexts/getObjContext';
import config from '../config/config.js'
import { deleteObjContext } from '../contexts/deleteObjContext';

const onBottomSheet = ({item}) => {

  const { userInfo } = useContext(AuthContext);
  const { getObj, isLoading } = useContext(GetObjContext);

  const sendReport = (status, idReclamacion, idobj) => {
    console.log(status, idReclamacion, idobj);


    fetch(`https://${config.BASE_URL}/objs/send-report`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            estadoReclama: status,
            idobj: idobj,
            idReclamacion: idReclamacion
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) });
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        console.log('Reclamo actualizado');
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
  }

  // Estado para manejar el modal y el texto del input
  const [modalVisible, setModalVisible] = useState(false);

  const setModalFinded = () =>{
    Alert.alert('Reporte creado', 'Favor de acudir al Centro de objetos perdidos para devolver el objeto encontrado');
  }
  const [inputText, setInputText] = useState('');

  const { deleteObj } = useContext(deleteObjContext)

  // Función para manejar el envío de datos
  const handleClaimObject = () => {
    if (!inputText) Alert.alert('Error', 'Se debe de llenar el campo'); // Si no hay texto, no hacer nada
    console.log(item.idobj);
    const getInfo = {
      item,  // el objeto
      inputText // el texto ingresado en el TextInput
    };
    getObj(getInfo);
    setModalVisible(false); // Cerrar el modal después de enviar los datos
    setInputText(''); // Limpiar el input
  };

  const confirmDelete = (idobj) => {
    // Confirmación de eliminación
    Alert.alert('Eliminar objeto', '¿Estás seguro de que deseas eliminar este objeto?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', onPress: () => deleteObj(idobj) } // Llama a la función deleteObj pasando el id
    ]);
  };

  if (!item) return null;

  return (
    <View style={styles.container}>
      {userInfo.typeuser == 3 ? (
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 15}}>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => confirmDelete(item.idobj)}>
          <Text style={{marginRight: 5, fontFamily: 'poppins-regular'}}>Eliminar Objeto</Text>
          <Octicons name="x" size={25} color="red" />
        </TouchableOpacity>
      </View>
      ) : ''}
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image} 
            source={{uri: item.imagenobj}} 
          />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.itemName}>{item.nombreobj}</Text>
          </View>

          <View style={styles.row}>
            <Octicons name="person" size={14} color={"#666"} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.detailText}>
              {item.username + " " + item.userapepat + " " + item.userapemat}
            </Text>
          </View>

          <View style={styles.row}>
            <Octicons name="location" size={14} color={"#666"} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.detailText}>{item.lugar}</Text>
          </View>

          <View style={styles.row}>
            <Octicons name="clock" size={14} color={"#666"} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.detailText}>{item.hora} hrs</Text>
          </View>

          <View style={styles.row}>
            <Octicons name="calendar" size={14} color={"#666"} />
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.detailText}>
              {new Date(item.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ marginVertical: 10 }}>
        {item.iduser !== userInfo.iduser && (
          item.objEstado == 2 ? (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.linkText}>Reclamar Objeto</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setModalFinded()}>
              <Text style={styles.linkText}>Lo he Encontrado</Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <View>
        <Text style={{ fontFamily: 'poppins-regular', fontSize: 12 }}>{item.descripcion}</Text>
      </View>

      {/* Modal para reclamar objeto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.modalText}>Reclamar Objeto</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Octicons name="x" size={30} color="red" />
                </TouchableOpacity>
              </View>
              <Text style={{fontFamily: 'poppins-regular', fontSize: 12, top: -5}}>Describe características del equipo para validar la solicitud</Text>
              <TextInput
                multiline={true} 
                numberOfLines={4}
                style={styles.input}
                placeholder="Escribe aquí..."
                value={inputText}
                onChangeText={setInputText}
              />
              <TouchableOpacity style={styles.closeButton} onPress={handleClaimObject}>
                <Text style={{color: 'white', textAlign: 'center', fontFamily: 'poppins-semibold'}}>Reclamar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
  },
  contentContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0,
    backgroundColor: 'white',
    marginRight: 10,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 14,
    fontWeight: '600',
    color: "#888",
    marginLeft: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  linkText: {
    fontFamily: 'poppins-semibold',
    fontSize: 14,
    color: '#0066CC',
    textDecorationLine: 'underline',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontFamily: 'poppins-semibold',
    fontSize: 18,
  },
  input: {
    fontFamily: 'poppins-regular',
    backgroundColor: '#f1f4ff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    color: 'black',
    borderWidth: 2,
    borderColor: "#1E319D"
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#1E319D',
    padding: 10,
    borderRadius: 5,
  },
});

export default onBottomSheet;
