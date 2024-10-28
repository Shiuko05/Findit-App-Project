/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    Register: undefined;
    HomeLogged: undefined;
};

export type TabNavitationType = {
    Inicio: undefined;
    Encontrados: undefined;
    Post: undefined;
    Mensajes: undefined;
    Perfil: undefined;
}

export type HomeNavigationType = {
    HomeNavigation: undefined;
}

export type ObjsFindedType = {
    ObjsFinded: undefined;
}

export type ProfileUserType = {
    ProfileUser: undefined;
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;