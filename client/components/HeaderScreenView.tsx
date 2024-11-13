import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { useContext, useEffect, useState } from "react";
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, Octicons} from "@expo/vector-icons";
import { AuthContext } from '../contexts/authContext';
import config from "../config/config";
import { set } from 'date-fns';

export default function HeaderScreenView({dataUsers}) {
    const { logout } = useContext(AuthContext);
    const { userInfo } = useContext(AuthContext);
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(dataUsers);
        console.log("[HeaderScreenView]: Usuario Actualizado");
    }, [dataUsers]);
  
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
                    {users.map((item) => (
                        <Image 
                            source={{uri: item.avatarUrl}}
                            style={styles.profileImage}
                        />
                    ))}
                    </View>
                </TouchableOpacity>
                <View
                    style={{
                        width: "75%",
                    }}
                >
                    <Text style={styles.profileText}>{" "+userInfo.username+" "+userInfo.userapepat}</Text>
                    <Text style={styles.profileRol}>
                        {userInfo.typeuser == 1 ? " Estudiante" : userInfo.typeuser == 2 ? " Civil" : userInfo.typeuser == 3 ? " Admin" : ""}
                    </Text>
                    {/*{users.map((user) => (
                        <Text key={user.id} style={styles.profileText}>{user.username+" "+user.userapepat}</Text>
                    ))}
                    {users.map((user) => (
                        <Text key={user.id} style={styles.profileRol}>
                            {user.typeuser == 1 ? "Estudiante" : user.typeuser == 2 ? "Civil" : user.typeuser == 3 ? "Admin" : ""}
                        </Text>
                    ))}*/}
                </View>
                {/*<TouchableOpacity onPress={() => {logout()}}>
                    <Octicons 
                        name="sign-in"
                        size={25}
                        color="black"
                    />
                </TouchableOpacity>*/}
                <TouchableOpacity>
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
        color: '#3F3D56',
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