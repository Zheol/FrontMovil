import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TareasCreateScreen from "../screens/Tareas/TareasCreateScreen";
import TareasScreen from "../screens/Tareas/TareasScreen";
import IntegrantesScreen from "../screens/Tareas/IntegrantesScreen";
import IntegrantesCreateScreen from "../screens/Tareas/IntegranteCreateScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

function TareasNav({
  route,
}: NativeStackScreenProps<RootStackParamList, "TareasNav">) {
  const {
    idProyecto,
    nombreProyecto,
    idEquipo,
    nombreEquipo,
  } = route.params;

  return (
    <Tab.Navigator initialRouteName="Tareas">
      <Tab.Screen
        options={{
          tabBarLabel: "Crear",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="briefcase-plus-outline"
              color={color}
              size={26}
            />
          ),
        }}
        name="Create"
        component={TareasCreateScreen}
        initialParams={{
          idProyecto,
          nombreProyecto,
          idEquipo,
          nombreEquipo,
        }}
      />

      {/* Mis Proyecto */}
      <Tab.Screen
        options={{
          tabBarLabel: "Tareas",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="ballot" color={color} size={26} />
          ),
        }}
        name="Tareas"
        component={TareasScreen}
        initialParams={{
          idProyecto,
          nombreProyecto,
          idEquipo,
          nombreEquipo,
        }}
      />

      <Tab.Screen
        name="Integrantes"
        options={{
          tabBarLabel: "Integrantes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={color}
              size={26}
            />
          ),
        }}
        component={IntegrantesScreen}
        initialParams={{
          idProyecto,
          nombreProyecto,
          idEquipo,
          nombreEquipo,
        }}
      />
    </Tab.Navigator>
  );
}

export default TareasNav;
