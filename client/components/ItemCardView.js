import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default function ItemCardView() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("http://10.0.2.2:8080/all-objs");
    const data = await response.json();
    setUsers(data);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={users}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.cardcontainer}>
              <Image
                source={{ uri: item.imagenobj }}
                style={styles.img}
              ></Image>
              <Text style={styles.title}>{item.nombreobj}</Text>
              <Text style={styles.place}>
                <Icon name="location"></Icon>
                {item.lugar}
              </Text>
              <Text style={styles.description}>{item.descripcion}</Text>
            </View>
          )}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardcontainer: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  place: {
    fontSize: 13,
    color: "#888",
  },
  description: {
    fontSize: 12,
    color: "black",
    width: 160,
    height: 45,
  },
  img: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
});
