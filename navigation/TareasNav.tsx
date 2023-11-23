import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TareasCreateScreen from "../screens/Tareas/TareasCreateScreen";
import TareasScreen from "../screens/Tareas/TareasScreen";
import IntegrantesScreen from "../screens/Tareas/IntegrantesScreen";

const Tab = createBottomTabNavigator();

function TareasNav({
  route,
}: NativeStackScreenProps<RootStackParamList, "TareasNav">) {
  const {
    idUser,
    nombreUser,
    idProyecto,
    nombreProyecto,
    idEquipo,
    nombreEquipo,
  } = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Create" component={TareasCreateScreen} />

      {/* Mis Proyecto */}
      <Tab.Screen
        options={{
          tabBarLabel: "Tareas",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="briefcase" color={color} size={26} />
          ),
        }}
        name="Tareas"
        component={TareasScreen}
        initialParams={{
          idUser,
          nombreUser,
          idProyecto,
          nombreProyecto,
          idEquipo,
          nombreEquipo,
        }}
      />

      <Tab.Screen
        name="Integrantes"
        component={IntegrantesScreen}
        initialParams={{
          idUser,
          nombreUser,
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
