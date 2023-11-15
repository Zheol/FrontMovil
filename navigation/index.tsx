import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Welcome from "../screens/WelcomeScreen";
import ForgotPassword from "../screens/ForgotPassword";
import { RootStackParamList } from "../types";
import Drawer from "./DrawerNav";
import ProyectosNav from "./ProyectosNav";
import { Title } from "react-native-paper";

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
      {/* ruta para usuario logeados */}
      <Stack.Screen name="ProyectosNav" component={ProyectosNav}/>
    </Stack.Navigator>
  );
}