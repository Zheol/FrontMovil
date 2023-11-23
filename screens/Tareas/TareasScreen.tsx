import {
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
const { height } = Dimensions.get("window");

const OBTENER_TAREAS = gql`
  query getTareasbyEquipoId($id: Int!) {
    getTareasbyEquipoId(id: $id) {
      descripcion
      id
    }
  }
`;

interface Tarea {
  id: number;
  name: string;
}

export default function TareasScreen({ route }) {
  const [proyect, setProyect] = useState<Tarea>();
  const {
    idUser,
    nombreUser,
    idProyecto,
    nombreProyecto,
    idEquipo,
    nombreEquipo,
  } = route.params;

  const { loading, error, data, refetch } = useQuery(OBTENER_TAREAS, {
    variables: {
      id: idEquipo,
    },
  });
  refetch(data);
  const tareas: Tarea[] =
    data?.getTareasbyEquipoId?.map((item) => ({
      id: item.id,
      descripcion: item.descripcion,
    })) || [];

  const navigation = useNavigation();

  return (
    <View
      style={{
        padding: Spacing * 2,
      }}
    >
      <View
        style={{
          alignItems: "center",
          marginVertical: 40,
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
          Mis Tareas
        </Text>

        <View style={{ marginBottom: 60 }}>
          <ScrollView>
            <View>
              {tareas.map((tareas: any) => {
                return (
                  <TouchableOpacity
                    style={{
                      marginVertical: 20,
                      backgroundColor: "#005050",
                      height: 80,
                      borderRadius: 10,
                    }}
                    key={tareas.id}
                    onPress={() => {
                      // MANDAR A LA PANTALLA DEL PROYECTO
                      console.log("Pulsaste el Boton", tareas.name);
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
                      {tareas.descripcion}
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
