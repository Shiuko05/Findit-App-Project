import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import config from "../config/config.js";
const { height } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const WelcomeMainScreen: React.FC<Props> = ({ navigation }) => {

  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={{
            height: 50,
            marginTop: 40,
          }}
          resizeMode="contain"
          source={require("../assets/images/tecnm-logo.png")}
        />
      </View>
      <View>
        <ImageBackground
          style={{ height: height / 3.5, marginTop: 40 }}
          resizeMode="contain"
          source={require("../assets/images/welcome-background.png")}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "poppins-bold",
            paddingHorizontal: 40 /*10: 10 */,
            paddingTop: 40,
            textAlign: "center",
            color: "#1E319D",
          }}
        >
          Encuentra Tus Objetos Perdidos!
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "poppins-regular",
            marginTop: 20,
            textAlign: "center",
            color: "black",
          }}
        >
          Registra, busca y recupera lo que más te importa en FindIt App
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 60,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity 
          onPress={() => navigation.navigate("Login")} 
          style={{
            backgroundColor: "#1E319D", 
            paddingVertical: 10 * 1.5, 
            paddingHorizontal: 20, 
            width: "48%",
            borderRadius: 10,
            shadowColor: "blue",
          }}>
          <Text 
            style={{
              fontFamily: "poppins-bold", 
              color: "white", 
              fontSize: 20, 
              textAlign: "center"
            }}>
            Acceder
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Register")} 
          style={{
            paddingVertical: 10 * 1.5, 
            paddingHorizontal: 20, 
            width: "48%",
            borderRadius: 10,
          }}>
          <Text 
            style={{
              fontFamily: "poppins-bold", 
              fontSize: 20, 
              textAlign: "center"
            }}>
            Registro
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeMainScreen;

const styles = StyleSheet.create({});
