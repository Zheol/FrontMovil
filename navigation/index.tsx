import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Welcome from "../screens/WelcomeScreen";
import ForgotPassword from "../screens/ForgotPassword";
import EquiposNav from "./EquiposNav";
import { RootStackParamList } from "../types";
import ProyectosNav from "./ProyectosNav";
import TareasNav from "./TareasNav";
import IntegrantesCreateScreen from "../screens/Tareas/IntegranteCreateScreen";
import TareaEditScreen from "../screens/Tareas/TareaEditScreen";
import ChangePasswordScreen from "../components/changePassword";
import ResetPasswordScreen from "../screens/ResetPassword";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.background,
  },
};

export default function Navigation() {
  return (
    <NavigationContainer theme={theme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* ruta para usuarios que no han sido autenticados */}
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPass" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      {/* ruta para usuario logeados */}
      <Stack.Screen name="ProyectosNav" component={ProyectosNav} />
      <Stack.Screen name="EquiposNav" component={EquiposNav} />
      <Stack.Screen name="TareasNav" component={TareasNav} />
      <Stack.Screen
        name="CrearIntegrante"
        component={IntegrantesCreateScreen}
      />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="EditarTarea" component={TareaEditScreen} />
    </Stack.Navigator>
  );
}
