import ProyectoCreateScreen from "../screens/Proyectos/ProyectosCreateScreen";
import ProyectoFindScreen from "../screens/Proyectos/ProyectosFindScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProyectosScreen from "../screens/Proyectos/ProyectosScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const Tab = createMaterialBottomTabNavigator();

function ProyectosNav({
  route,
}: NativeStackScreenProps<RootStackParamList, "ProyectosNav">) {
  const { nombre, email, id } = route.params;

  return (
    <Tab.Navigator initialRouteName="MisProyectos">
      {/* Crear Proyecto */}
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
        component={ProyectoCreateScreen}
        initialParams={{ nombre, email, id }}
      />

      {/* Mis Proyecto */}
      <Tab.Screen
        options={{
          tabBarLabel: "Proyectos",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="briefcase" color={color} size={26} />
          ),
        }}
        name="MisProyectos"
        component={ProyectosScreen}
        initialParams={{ nombre, email, id }}
      />

      {/* Buscar Proyecto */}
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
        component={ProyectoFindScreen}
        initialParams={{ nombre, email, id }}
      />
    </Tab.Navigator>
  );
}

export default ProyectosNav;
