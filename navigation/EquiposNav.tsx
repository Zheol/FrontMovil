import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EquipoCreateScreen from "../screens/Equipos/EquiposCreateScreen";
import EquipoFindScreen from "../screens/Equipos/EquiposFindScreen";
import EquiposScreen from "../screens/Equipos/EquiposScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { ProyectContext } from "../context/ProyectContext";
import { useContext } from "react";

const Tab = createMaterialBottomTabNavigator();

function EquiposNav() {
  return (
    <Tab.Navigator initialRouteName="MisEquipos">
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
        component={EquipoCreateScreen}
      />

      {/* Mis Equipos */}
      <Tab.Screen
        options={{
          tabBarLabel: "Equipos",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="briefcase" color={color} size={26} />
          ),
        }}
        name="MisEquipos"
        component={EquiposScreen}
      />

      <Tab.Screen
        options={{
          tabBarLabel: "Buscar",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="briefcase-search-outline"
              color={color}
              size={26}
            />
          ),
        }}
        name="Find"
        component={EquipoFindScreen}
      />
    </Tab.Navigator>
  );
}

export default EquiposNav;
