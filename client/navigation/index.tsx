/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React, { useCallback, useContext, useRef, useState } from "react";
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

import { ProfileUserType, RootStackParamList, TabNavitationType } from "../types";
import { Ionicons, Octicons} from "@expo/vector-icons";
import { ActivityIndicator, Button, Dimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetView, { BottomSheetMethods } from "../components/BottomSheetView";
import { AuthContext } from "../contexts/authContext";
import WelcomeMainScreen from "../screens/Welcome-main-Screen";
import PostObjsStepsScreen from "../screens/PostObjs-steps-Screen";
import ProfileDetailsScreen from "../screens/Profile-Details-Screen";
import MyHistoryObjsScreen from "../screens/MyHistory-Objs-Screen";
import GetClaimsObjsScreen from "../screens/GetClaims-Objs-Screen";
import NotificationsScreen from "../screens/NotificationsScreen";
import PanelAdminView from "../screens/PanelAdminView";
const { height } = Dimensions.get("window");

export default function Navigation() {
    const bottomSheetRef = useRef<BottomSheetMethods>(null);

    const [selectedItem, setSelectedItem] = useState(null);

    const expandHandler = useCallback((item) => {
        setSelectedItem(item);
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
                snapTo={'45%'}
                backgroundColor="white"
                backDropColor="black"
            >
                <OnBottomSheet item={selectedItem}/>
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

    const {isLoading, userToken} = useContext(AuthContext)
    if (isLoading) {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
        >
        {userToken ? (
            <>
            <Stack.Screen name="Inicio" options={{ headerShown: false }}>
                {(props) => <TabNavigator {...props} expandHandler={expandHandler} closeHandler={closeHandler} />}
            </Stack.Screen>
            </>
        ) : (
            <>
            <Stack.Screen name="Welcome" component={WelcomeMainScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            </>
        )}
    </Stack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator<ProfileUserType>();

function ProfileStackNavigator({expandHandler}) {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerShown: false, // Puedes personalizar si quieres mostrar el header
            }}
        >
            <ProfileStack.Screen name="ProfileUserScreen" component={ProfileUserScreen} />
            <ProfileStack.Screen name="EditProfile" component={ProfileDetailsScreen} />
            <ProfileStack.Screen name="ObjsList" component={MyHistoryObjsScreen} />
            <ProfileStack.Screen name="NotifyList" component={NotificationsScreen}/>
            <ProfileStack.Screen name="Claims" options={{ headerShown: false }} 
                children={() => (
                    <GetClaimsObjsScreen expandHandler={expandHandler} />)}/>
            <ProfileStack.Screen name="PanelAdmin" component={PanelAdminView}/>
        </ProfileStack.Navigator>
    );
}

/*const ObjsFindedStack = createNativeStackNavigator<FindedObjType>();

function FindedObjsStackNavigator(expandHandler, closeHandler) {
    return (
        <ObjsFindedStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <ObjsFindedStack.Screen name="FindedObjScreen" children={() => (
                <ObjsFindedScreen expandHandler={expandHandler} closeHandler={closeHandler} />)} />
            <ObjsFindedStack.Screen name="ClaimObjScreen" children={() => (
                <GetClaimsObjsScreen getDataObj={dataObj} />
            )}/>
        </ObjsFindedStack.Navigator>
    );
}*/



const Tab = createBottomTabNavigator<TabNavitationType>();

function TabNavigator({expandHandler, closeHandler}) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ size, focused }) => {
                switch (route.name) {
                    case "InicioPerdidos":
                    return (
                        <Octicons 
                            name="home"
                            color={focused ? "#1E319D" : "black"}
                            size={25}
                        />
                    );
                    case "Post":
                    return (
                        <View style={{width: 50, height: 50, backgroundColor: '#1E319D', borderRadius: 50, justifyContent: 'center', alignItems: 'center', top: -15, borderColor: 'white'}}>
                                    <Octicons 
                                        name="plus"
                                        color="white"
                                        size={25}
                                    />
                        </View>
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
                            name="repo"
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
                name='InicioPerdidos'
                options={{
                    tabBarLabel: 'Inicio',
                }}
                children={() => (
                    <HomeNavigationScreen expandHandler={expandHandler} closeHandler={closeHandler} />)}> 
            </Tab.Screen>
            <Tab.Screen name='Encontrados' options={{
                tabBarLabel: 'Encontrados',
            }} 
            children={() => (
                <ObjsFindedScreen expandHandler={expandHandler} closeHandler={closeHandler} />)}/>
            <Tab.Screen 
                name='Post' component={PostUserScreen}
                options={{
                    tabBarLabel: '',
                }}
            />
            <Tab.Screen name='Mensajes' component={MessagesUserScreen} options={{
                tabBarLabel: 'Reclamos',
            }}/>
            <Tab.Screen name='Perfil' options={{
                tabBarLabel: 'Perfil',
            }}
            children={() => (
                <ProfileStackNavigator expandHandler={expandHandler}/> )}/>

    </Tab.Navigator>
  );
}
