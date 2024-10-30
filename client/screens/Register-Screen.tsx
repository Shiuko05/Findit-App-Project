import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import AppTextInput from "../components/AppTextInput";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthContextRegister } from "../contexts/authRegisterContext";
const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {

  const [username, setUsername] = useState('');
  const [userapepat, setUserapepat] = useState('');
  const [userapemat, setUserapemat] = useState('');
  const [email, setEmail] = useState('');
  const [passuser, setPassUser] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const [typeuser, setTypeUser] = useState('');

  const { register, isLoading } = useContext(AuthContextRegister);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          padding: 20,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontFamily: "poppins-bold",
              color: "#1E319D",
              marginVertical: 10,
              top: 10
            }}
          >
            Crear Cuenta
          </Text>
          <Text
            style={{
              fontFamily: "poppins-regular",
              fontSize: 14,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Completa los campos para poder crear una cuenta
          </Text>
        </View>
        <View
                    style={{
                    marginTop: 20,
                    flexDirection: "row",
                    justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                    style={{
                        padding: 10,
                        backgroundColor: "#1E319D",
                        borderRadius: 10 / 2,
                        marginHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 40
                    }}
                    >
                    <Ionicons
                        name="briefcase"
                        color={"white"}
                        size={15}
                    />
                    <Text style={{color: "white"}}> Docente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{
                        padding: 10,
                        backgroundColor: "#1E319D",
                        borderRadius: 10 / 2,
                        marginHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 40
                    }}
                    >
                    <Ionicons
                        name="school"
                        color={"white"}
                        size={15}
                    />
                    <Text style={{color: "white"}}> Estudiante</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{
                        padding: 10,
                        backgroundColor: "#1E319D",
                        borderRadius: 10 / 2,
                        marginHorizontal: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 40
                    }}
                    >
                    <Ionicons
                        name="person"
                        color={"white"}
                        size={15}
                    />
                    <Text style={{color: "white"}}> Externo</Text>
                    </TouchableOpacity>
                </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <AppTextInput secureTextEntry={false} placeholder="Nombre" onChangeText={text => setUsername(text)}/>
          <AppTextInput secureTextEntry={false} placeholder="Apellido Paterno" onChangeText={text => setUserapepat(text)}/>
          <AppTextInput secureTextEntry={false} placeholder="Apellido Materno" onChangeText={text => setUserapemat(text)}/>
          <AppTextInput secureTextEntry={false} placeholder="Correo" onChangeText={text => setEmail(text)}/>
          <AppTextInput secureTextEntry={true} placeholder="Contraseña" onChangeText={text => setPassUser(text)}/>
          <AppTextInput secureTextEntry={true} placeholder="Confirmar contraseña" onChangeText={text => setConfirmPass(text)}/>
        </View>

        <TouchableOpacity
          onPress={() => register(username, userapepat, userapemat, email, passuser, confirmpass)}
          style={{
            padding: 20,
            backgroundColor: "#1E319D",
            marginVertical: 20,
            borderRadius: 10,
            shadowColor: "blue",
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "poppins-bold",
              color: "white",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Registrarse
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate("Login")}
          style={{
            padding: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "poppins-semibold",
              color: "black",
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Entrar con una cuenta
          </Text>
        </TouchableOpacity>

      </View>
      </ScrollView>
    </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default RegisterScreen;