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
  ResetPassword: undefined;
  ProyectosNav: {
    nombre: string;
    email: string;
    id: Float;
    accessToken: string;
  };
  EquiposNav: {
    nombreProyecto: string;
    idProyecto: number;
  };
  TareasNav: {
    nombreProyecto: string;
    idProyecto: number;
    nombreEquipo: string;
    idEquipo: number;
  };
  CrearIntegrante: {
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
  ChangePassword: {
    idUser: number;
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

export type formResetPassword = {
  token: string;
  password: string;
  confirmPassword: string;
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
  idUser: number;
}

export interface UpdateProyectoModalProps {
  visible: boolean;
  hideModal: () => void;
  nombre: string;
  area: string;
}

export type formChangePassword = {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
};

export type formUpdateUser = {
  name: string;
  email: string;
};
