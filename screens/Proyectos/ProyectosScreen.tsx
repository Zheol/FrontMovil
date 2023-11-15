import { Dimensions, View, Text, ScrollView, TouchableOpacity } from "react-native";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import { useEffect, useState } from "react";
import { Proyect } from "./types";
import { gql, useQuery } from "@apollo/client";
const { height } = Dimensions.get("window");

const OBTENER_PROYECTOS = gql`
  query($id: Int!){
    getProyectosbyUserId(id: $id) {
      id
      nombre
    }
  }
`;

interface Project {
  id: number;
  name: string;
}

export default function ProyectosScreen({ route }) {
  const [proyect, setProyect] = useState<Proyect>();
  const {id, nombre} = route.params;

  const { loading, error, data, refetch } = useQuery(OBTENER_PROYECTOS, {
    variables: {
      id: id
    },
  });
  refetch(data)
  const projects: Project[] = data?.getProyectosbyUserId?.map(item => ({ id: item.id, name: item.nombre })) || [];
  

  return (
    <View
      style={{
        padding: Spacing * 2,
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            fontSize: FontSize.large,
            maxWidth: "60%",
            textAlign: "center",
          }}
        >
          Mis Proyectos
        </Text>

        <View style={{ marginBottom: 60 }}>
          <ScrollView>
            <View>
              {projects.map((projects: any) => {
                return (
                  <TouchableOpacity
                    style={{
                      marginVertical: 20,
                      backgroundColor: "#005050",
                      height: 80,
                      borderRadius: 10,
                    }}
                    key={projects.id}
                    onPress={() => {
                      // MANDAR A LA PANTALLA DEL PROYECTO
                      console.log(`Botón presionado: ${projects.name}`);
                    }}
                  >
                    <Text
                      style={{
                        width: 350,
                        color: "white",
                        textAlign: "center",
                        paddingTop: 25,
                      }}
                    >
                      {projects.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
