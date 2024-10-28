import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useEffect, useState } from "react";
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, Octicons} from "@expo/vector-icons";

export default function HeaderScreenView({closeHandler}) {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const response = await fetch(`http://10.26.1.244:8080/users/${1}`);
        const data = await response.json();
        setUsers(data);
    }
  
  return (
    <View>
        <View
            style={{
                padding: 20,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity>
                    <View style={styles.card}>
                        <Image 
                            source={require('../assets/images/profile-image.jpg')}
                            style={styles.profileImage}
                        />
                    </View>
                </TouchableOpacity>
                <View
                    style={{
                        width: "75%",
                    }}
                >
                    {users.map((user) => (
                        <Text key={user.id} style={styles.profileText}>{user.username+" "+user.userapepat}</Text>
                    ))}
                    {users.map((user) => (
                        <Text key={user.id} style={styles.profileRol}>
                            {user.typeuser == 1 ? "Estudiante" : user.typeuser == 2 ? "Civil" : user.typeuser == 3 ? "Admin" : ""}
                        </Text>
                    ))}
                </View>
                <TouchableOpacity onPress={closeHandler}>
                    <Octicons 
                        name="bell"
                        size={25}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    profileText: {
        fontSize: 14,
        fontFamily: "poppins-semibold",
    },
    profileRol: {
        fontSize: 12,
        fontFamily: "poppins-regular",
        top: -5,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2
    },
    card: {
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    }
  });