import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

//screens import
import EquiposNav from "./EquiposNav";
import TareasNav from "./TareasNav";
import ProyectosNav from "./ProyectosNav";

const Drawer = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
      }}
    >
      <Drawer.Screen name="Proyectos" component={ProyectosNav} />
      <Drawer.Screen name="Equipos" component={EquiposNav} />
      <Drawer.Screen name="Tareas" component={TareasNav} />
    </Drawer.Navigator>
  );
};

export default Drawer;
