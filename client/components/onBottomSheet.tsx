import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Octicons } from "@expo/vector-icons";

const onBottomSheet = () => {
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
            <Text style={styles.itemName}>Iphone 15</Text>
            <Octicons name="calendar" size={14} color={"#B6B5B5"} />
            <Text style={styles.detailText}>25 de sep</Text>
        </View>

          <View style={styles.row}>
            <Octicons name="person" size={14} color={"#B6B5B5"} />
            <Text style={styles.detailText}>Abraham Carrasco</Text>
          </View>

          <View style={styles.row}>
            <Octicons name="location" size={14} color={"#B6B5B5"} />
            <Text style={styles.detailText}>E001</Text>
          </View>

          <View style={styles.row}>
            <Octicons name="clock" size={14} color={"#B6B5B5"} />
            <Text style={styles.detailText}>15:30 hrs</Text>
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
    flex: 0,
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
    marginBottom: 4,},
  linkText: {
    fontSize: 14,
    color: '#0066CC',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default onBottomSheet;