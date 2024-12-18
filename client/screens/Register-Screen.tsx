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
import { BottomTabBar, BottomTabView } from "@react-navigation/bottom-tabs";
import { setTextRange } from "typescript";
const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {

  const [username, setUsername] = useState('');
  const [userapepat, setUserapepat] = useState('');
  const [userapemat, setUserapemat] = useState('');
  const [email, setEmail] = useState('');
  const [passuser, setPassUser] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const [typeuser, setTypeUser] = useState(null);
  const [ control , setControl ] = useState('');

  const { register, isLoading } = useContext(AuthContextRegister);

  console.log("Tipo de usuario: ", typeuser);

  const getButtonStyle = (type: number) => [
    styles.button,
    { backgroundColor: typeuser === type ? "#1E319D" : "white" },
  ];

  const getTextColor = (type) => ({
    color: typeuser === type ? "white" : "black", // Texto blanco si está seleccionado, negro si no
  })

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
        <View>
        </View>
          <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={getButtonStyle(2)}
            onPress={() => setTypeUser(2)}
          >
            <Ionicons
              name="briefcase"
              color={typeuser === 2 ? "white" : "black"}
              size={15}
            />
            <Text style={getTextColor(2)}> Docente</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle(1)}
            onPress={() => setTypeUser(1)}
          >
            <Ionicons
              name="school"
              color={typeuser === 1 ? "white" : "black"}
              size={15}
            />
            <Text style={getTextColor(1)}> Estudiante</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle(4)}
            onPress={() => setTypeUser(4)}
          >
            <Ionicons
              name="person"
              color={typeuser === 4 ? "white" : "black"}
              size={15}
            />
            <Text style={getTextColor(4)}> Externo</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          {/* Puedes agregar contenido adicional aquí */}
        </View>
        <View
          style={{
            alignItems: "center"
          }}
        >
          <AppTextInput secureTextEntry={false} placeholder="Nombre" onChangeText={text => setUsername(text)}/>
          <AppTextInput secureTextEntry={false} placeholder="Apellido Paterno" onChangeText={text => setUserapepat(text)}/>
          <AppTextInput secureTextEntry={false} placeholder="Apellido Materno" onChangeText={text => setUserapemat(text)}/>
          <AppTextInput secureTextEntry={false} placeholder="Correo" onChangeText={text => setEmail(text)}/>
          {typeuser === 1 ? (
            <AppTextInput secureTextEntry={false} placeholder="Matrícula" onChangeText={text => setControl(text)}/>
          ) :
          typeuser === 2 ? (
            <AppTextInput secureTextEntry={false} placeholder="RFC" onChangeText={text => setControl(text)}/>
          ) :
          typeuser === 4 ? (
            <AppTextInput secureTextEntry={false} placeholder="CURP" onChangeText={text => setControl(text)}/>
          ) : null}
          <AppTextInput secureTextEntry={true} placeholder="Contraseña" onChangeText={text => setPassUser(text)}/>
          <AppTextInput secureTextEntry={true} placeholder="Confirmar contraseña" onChangeText={text => setConfirmPass(text)}/>
        </View>

        <TouchableOpacity
          onPress={() => register(username, userapepat, userapemat, email, passuser, confirmpass, typeuser, control)}
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

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10 / 2,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
  },
});