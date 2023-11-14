import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EquipoScreen from "../screens/Equipos/EquiposCreateScreen";

const Tab = createBottomTabNavigator();

function TareasNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Create" component={EquipoScreen} />
      <Tab.Screen name="Find" component={EquipoScreen} />
    </Tab.Navigator>
  );
}

export default TareasNav;
