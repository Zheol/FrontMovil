import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EquipoScreen from "../screens/Equipos/EquiposCreateScreen";
import EquipoCreateScreen from "../screens/Equipos/EquiposCreateScreen";
import EquipoFindScreen from "../screens/Equipos/EquiposFindScreen";

const Tab = createBottomTabNavigator();

function EquiposNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Create" component={EquipoCreateScreen} />
      <Tab.Screen name="Find" component={EquipoFindScreen} />
    </Tab.Navigator>
  );
}

export default EquiposNav;
