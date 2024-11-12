import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { Octicons } from "@expo/vector-icons";
import { AuthContext } from '../contexts/authContext';

const onBottomSheet = ({item}) => {

  const { userInfo } = useContext(AuthContext);

  if (!item) return null

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            style={styles.image} 
            source={require('../assets/images/item-test.jpeg')} 
          />
        </View>

        <View style={styles.detailsContainer}>
        <View style={styles.dateContainer}>
            <Text style={styles.itemName}>{item.nombreobj}</Text>
        </View>

          <View style={styles.row}>
            <Octicons name="person" size={14} color={"#B6B5B5"} />
            <Text style={styles.detailText}>{item.username + " " + item.userapepat}</Text>
          </View>

          <View style={styles.row}>
            <Octicons name="location" size={14} color={"#B6B5B5"} />
            <Text style={styles.detailText}>{item.lugar}</Text>
          </View>

          <View style={styles.row}>
            <Octicons name="clock" size={14} color={"#B6B5B5"} />
            <Text style={styles.detailText}>{item.hora} hrs</Text>
          </View>

          <View style={styles.row}>
            <Octicons name="calendar" size={14} color={"#B6B5B5"} />
            <Text style={styles.detailText}>{new Date(item.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })}</Text>
          </View>
        </View>

      </View>

      <Text style={styles.linkText}>Reclamar Objeto</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 0,
    paddingRight: 10,
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
    color: "#B6B5B5",
    marginLeft: 4, // para separar el texto del ícono
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dateIconText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#0066CC',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default onBottomSheet;
