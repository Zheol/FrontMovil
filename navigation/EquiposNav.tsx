import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EquipoCreateScreen from "../screens/Equipos/EquiposCreateScreen";
import EquipoFindScreen from "../screens/Equipos/EquiposFindScreen";
import EquiposScreen from "../screens/Equipos/EquiposScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

function EquiposNav() {
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
      />

      <Tab.Screen name="Find" component={EquipoFindScreen} />
    </Tab.Navigator>
  );
}

export default EquiposNav;
