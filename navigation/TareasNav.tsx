import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import TareasScreen from "../screens/Tareas/TareasScreen";
import TareasCreateScreen from "../screens/Tareas/TareasCreateScreen";
import TareasFindScreen from "../screens/Tareas/TareasFindScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const Tab = createBottomTabNavigator();

function TareasNav({ route }: NativeStackScreenProps<RootStackParamList, 'TareasNav'>) {
  const {idUser, nombreUser, idProyecto, nombreProyecto, idEquipo, nombreEquipo} = route.params;
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
          tabBarLabel: "Mis Equipos",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="briefcase" color={color} size={26} />
          ),
        }}
        name="MisProyectos"
        component={TareasScreen}
        initialParams={{idUser, nombreUser, idProyecto, nombreProyecto, idEquipo, nombreEquipo}}
      />

      <Tab.Screen name="Find" component={TareasFindScreen} />
    </Tab.Navigator>
  );
}

export default TareasNav;
