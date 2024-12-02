import {
    ActivityIndicator,
    Alert,
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
import { AuthContext } from "../contexts/authContext";
import { SafeAreaView } from "react-native-safe-area-context";
import config from "../config/config";
import { set } from "date-fns";
  const { height } = Dimensions.get("window");
  
  type Props = NativeStackScreenProps<RootStackParamList, "Login">;
  
  const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const { login, isLoading } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const activityIndicator = () => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 4000);
    }

    const setFindEmail = () => {
        Alert.alert(
            'Recuperar contraseña',
            'Acude al Centro de Objeto Perdido para recuperar tu contraseña',
        )
    }

    const sendNotification = (email) => {
        let message = "Solicitud de restablecimiento de contraseña";
        
        let fechaEnvio = new Date();
        let fechaEnvioString = new Intl.DateTimeFormat('es-ES', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(fechaEnvio).split('/').reverse().join('-');
        console.log(fechaEnvioString);
  
        fetch(`https://${config.BASE_URL}/objs/send-notification/restore`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idobj: 40,
                iduser: email,
                fechaNotificacion: fechaEnvioString,
                mensaje: message
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
            console.log('Notificación enviada');
            Alert.alert('Actualización', 'Se ha actualizado el estado del reclamo y se ha enviado una notificación al usuario');
        })
        .catch(error => {
            console.error('Mensaje no enviado. Error:', error.message);
            Alert.alert('Error', 'Ha ocurrido un problema, intenta de nuevo más tarde');
        })
    }

    return (
      <SafeAreaView
        style={{
            flex: 1,
            backgroundColor: "#fff",
        }}
      >
        <ScrollView>
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
                        <AppTextInput placeholder="Email" value={email} secureTextEntry={false} onChangeText={text => setEmail(text)}/>
                        <AppTextInput placeholder="Contraseña" value={password} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => setFindEmail()}
                    >
                        <Text style={{
                            fontFamily: "poppins-semibold",
                            fontSize: 14,
                            color: "#1E319D",
                            alignSelf: "flex-end",
                        }}>
                        ¿Olvidaste tu contraseña?
                        </Text>
                
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        activityIndicator();
                        login(email, password);
                    }}
                    disabled={loading}
                    style={[
                        {
                            padding: 15,
                            backgroundColor: "#1E319D",
                            marginVertical: 30,
                            borderRadius: 10,
                            shadowColor: "blue",
                            shadowOffset: { width: 0, height: 10 },
                            shadowOpacity: 0.3,
                            shadowRadius: 10,
                        },
                        { opacity: loading ? 0.5 : 1 },
                    ]}

                >
                    <Text
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
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({});