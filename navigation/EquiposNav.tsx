import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EquipoCreateScreen from "../screens/Equipos/EquiposCreateScreen";
import EquipoFindScreen from "../screens/Equipos/EquiposFindScreen";
import EquiposScreen from "../screens/Equipos/EquiposScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const Tab = createBottomTabNavigator();

function EquiposNav({ route }: NativeStackScreenProps<RootStackParamList, 'EquiposNav'>) {
  const {idUser, nombreUser, idProyecto, nombreProyecto} = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Create" component={EquipoCreateScreen} />

      {/* Mis Proyecto */}
      <Tab.Screen
        options={{
          tabBarLabel: "Mis Equipos",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="briefcase" color={color} size={26} />
          ),
        }}
        name="MisProyectos"
        component={EquiposScreen}
        initialParams={{idUser, nombreUser, idProyecto, nombreProyecto}}
      />

      <Tab.Screen name="Find" component={EquipoFindScreen} />
    </Tab.Navigator>
  );
}

export default EquiposNav;
