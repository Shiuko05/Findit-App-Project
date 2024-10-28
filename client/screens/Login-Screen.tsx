import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import { Ionicons } from "@expo/vector-icons";
  import { NativeStackScreenProps } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../types";
  import AppTextInput from "../components/AppTextInput";
  const { height } = Dimensions.get("window");
  
  type Props = NativeStackScreenProps<RootStackParamList, "Login">;
  
  const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    return (
      <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: "#fff",
        }}
      >
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
                        fontSize: 35,
                        fontFamily: "poppins-bold",
                        color: "#1E319D",
                        marginVertical: 30,
                        top: 20,
                    }}
                > 
                Iniciar Sesión 
                </Text>
                <Text
                    style={{
                        fontSize: 16,
                        fontFamily: "poppins-semibold",
                        maxWidth: "80%",
                        textAlign: "center",
                    }}
                >
                    Ingresa tus datos para acceder a la aplicación
                </Text>
            </View>
            <View
                style={{
                    top: 20,
                    marginVertical: 30,
                    alignItems: "center",
                }}
            >
                    <AppTextInput placeholder="Email"/>
                    <AppTextInput placeholder="Contraseña"/>
            </View>
            <View>
                <Text
                    onPress={() => navigate("Welcome")}
                    style={{
                        fontFamily: "poppins-semibold",
                        fontSize: 14,
                        color: "#1E319D",
                        alignSelf: "flex-end",
                    }}
                >
                    ¿Olvidaste tu contraseña?
                </Text>
            </View>

            <TouchableOpacity
                style={{
                    padding: 15,
                    backgroundColor: "#1E319D",
                    marginVertical: 30,
                    borderRadius: 10,
                    shadowColor: "blue",
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                }}
            >
                <Text
                    onPress={() => navigate("HomeLogged")}
                    style={{
                        fontFamily: "poppins-bold",
                        color: "white",
                        fontSize: 20,
                        textAlign: "center",
                    }}
                >
                    Acceder
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigate("Register")}
                style={{
                    padding: 10,
                }}
            >
                <Text
                    style={{
                        fontFamily: "poppins-semibold",
                        fontSize: 14,
                        textAlign: "center",
                    }}
                >
                    Crear una cuenta
                </Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({});