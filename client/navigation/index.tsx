/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React, { useCallback, useRef } from "react";
import LoginScreen from "../screens/Login-Screen";
import RegisterScreen from "../screens/Register-Screen";
import Welcome from "../screens/Welcome-main-Screen";
import HomeLoggedScreen from "../screens/Home-logged-Screen";
import HomeNavigationScreen from "../screens/Home-navitagion-Screen";
import ObjsFindedScreen from "../screens/Objs-Finded-Screen";
import PostUserScreen from "../screens/Post-user-Screen";
import MessagesUserScreen from "../screens/Messages-user-Screen";
import ProfileUserScreen from "../screens/Profile-user-Screen";
import HeaderScreenView from "../components/HeaderScreenView";
import OnBottomSheet from "../components/onBottomSheet";

import { RootStackParamList, TabNavitationType } from "../types";
import { Ionicons, Octicons} from "@expo/vector-icons";
import { Button, Dimensions, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetView, { BottomSheetMethods } from "../components/BottomSheetView";
const { height } = Dimensions.get("window");

export default function Navigation() {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    const expandHandler = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);

    const closeHandler = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

  return (
    <NavigationContainer>
        <GestureHandlerRootView>
            <RootNavigator expandHandler={expandHandler} closeHandler={closeHandler}/>
            <BottomSheetView 
                ref={bottomSheetRef} 
                snapTo={'50%'}
                backgroundColor="white"
                backDropColor="black"
            >
                <OnBottomSheet />
            </BottomSheetView>
        </GestureHandlerRootView>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({expandHandler, closeHandler}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="HomeLogged">
        {(props) => (
          <TabNavigator {...props} expandHandler={expandHandler} closeHandler={closeHandler}/>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator<TabNavitationType>();

function TabNavigator({expandHandler, closeHandler}) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ size, focused }) => {
                switch (route.name) {
                    case "Inicio":
                    return (
                        <Octicons 
                            name="home"
                            color={focused ? "#1E319D" : "black"}
                            size={25}
                        />
                    );
                    case "Encontrados":
                    return (
                        <Octicons 
                            name="archive"
                            color={focused ? "#1E319D" : "black"}
                            size={25}
                            
                        />
                    );
                    case "Mensajes":
                    return (
                        <Octicons 
                            name="comment-discussion"
                            color={focused ? "#1E319D" : "black"}
                            size={25}
                        />
                    );
                    case "Perfil":
                    return (
                        <Octicons 
                            name="person"
                            color={focused ? "#1E319D" : "black"}
                            size={25}
                        />
                    );
                }
                },
                tabBarStyle: {
                backgroundColor: "white",
                marginBottom: 0,
                paddingBottom: 0,
                height: height / 13,
                marginHorizontal: 0,
                borderRadius: 0,
                },
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontFamily: "poppins-semibold",
                    fontSize: 8,
                    color: "black",
                },
            })}
        >
            <Tab.Screen 
                name='Inicio'
                children={() =>
                    <HomeNavigationScreen expandHandler={expandHandler} closeHandler={closeHandler} />}> 
            </Tab.Screen>
            <Tab.Screen name='Encontrados' component={ObjsFindedScreen} />
            <Tab.Screen 
                name='Post' component={PostUserScreen} 
                options={{
                    tabBarLabel: () => null,
                    tabBarIcon: ({ size, focused }) => (
                        <Ionicons 
                            name="add-circle"
                            color={"#1E319D"}
                            size={65}
                            top={-20}
                        />
                    ),
                }}
            />
            <Tab.Screen name='Mensajes' component={MessagesUserScreen} />
            <Tab.Screen name='Perfil' component={ProfileUserScreen} />

    </Tab.Navigator>
  );
}
