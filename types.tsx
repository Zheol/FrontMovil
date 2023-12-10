/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPass: undefined;
  ProyectosNav: {
    nombre: string;
    email: string;
    id: Float;
    accessToken: string;
  };
  EquiposNav: {
    nombreUser: string;
    idUser: number;
    nombreProyecto: string;
    idProyecto: number;
    email: string;
  };
  TareasNav: {
    nombreUser: string;
    idUser: number;
    nombreProyecto: string;
    idProyecto: number;
    nombreEquipo: string;
    idEquipo: number;
    email: string;
  };
  CrearIntegrante: {
    nombreUser: string;
    idUser: number;
    nombreProyecto: string;
    idProyecto: number;
    nombreEquipo: string;
    idEquipo: string;
  };
  EditarTarea: {
    nombreUser: string;
    idUser: number;
    nombreProyecto: string;
    idProyecto: number;
    nombreEquipo: string;
    idEquipo: string;
    nombreTarea: string;
    idTarea: string;
    estadoTarea: string;
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type formLogin = {
  email: string;
  password: string;
};

export type formRegister = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export type formForgotPass = {
  email: string;
};

export type formCreateProyect = {
  nombre: string;
  area: string;
};

export type formFindProyect = {
  nombre: string;
};

export type formCreateIntegrante = {
  email: string;
  rol: string;
};

export const VALID_PASSWORD_REGEX =
  /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export interface UserProfileModalProps {
  visible: boolean;
  hideModal: () => void;
  nombre: string;
  email: string;
}

export interface UpdateProyectoModalProps {
  visible: boolean;
  hideModal: () => void;
  nombre: string;
  area: string;
}
