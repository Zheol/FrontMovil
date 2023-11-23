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
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Equipo } from "./types";
import { useNavigation } from "@react-navigation/native";
const { height } = Dimensions.get("window");

const OBTENER_EQUIPOS = gql`
  query getEquiposbyProyectoId($id: Int!) {
    getEquiposbyProyectId(id: $id) {
      id
      nombre
    }
  }
`;

export default function EquiposScreen({ route }) {
  const [equipo, setEquipo] = useState<Equipo>();
  const { idUser, nombreUser, idProyecto, nombreProyecto } = route.params;
  const navigation = useNavigation();

  const { loading, error, data, refetch } = useQuery(OBTENER_EQUIPOS, {
    variables: {
      id: idProyecto,
    },
  });
  refetch(data);
  const equipos: Equipo[] =
    data?.getEquiposbyProyectId?.map((item) => ({
      id: item.id,
      nombre: item.nombre,
    })) || [];

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
          {nombreProyecto}
        </Text>

        <View style={{ marginBottom: 60 }}>
          <ScrollView>
            <View>
              {equipos.map((equipos: any) => {
                return (
                  <TouchableOpacity
                    style={{
                      marginVertical: 20,
                      backgroundColor: "#005050",
                      height: 80,
                      borderRadius: 10,
                    }}
                    key={equipos.id}
                    onPress={() => {
                      // MANDAR A LA PANTALLA DEL Tareas
                      navigation.navigate("TareasNav", {
                        nombreUser: nombreUser,
                        idUser: idUser,
                        nombreProyecto: nombreProyecto,
                        idProyecto: idProyecto,
                        nombreEquipo: equipos.nombre,
                        idEquipo: equipos.id,
                      });
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
                      {equipos.nombre}
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
