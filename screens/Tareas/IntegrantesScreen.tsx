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
import { gql, useQuery } from "@apollo/client";

const { height } = Dimensions.get("window");

const OBTENER_INTEGRANTES = gql`
  query getIntegrantebyIdEquipo($id: Int!) {
    getIntegrantebyIdEquipo(id: $id) {
      id
      user {
        name
      }
      rol
    }
  }
`;

export default function IntegrantesScreen({ route }) {
  const {
    idUser,
    nombreUser,
    idProyecto,
    nombreProyecto,
    idEquipo,
    nombreEquipo,
  } = route.params;
  const { loading, error, data, refetch } = useQuery(OBTENER_INTEGRANTES, {
    variables: {
      id: idEquipo,
    },
  });
  refetch(data);

  const integrantes =
    data?.getIntegrantebyIdEquipo?.map((item) => ({
      id: item.id,
      name: item.user.name,
      rol: item.rol,
    })) || [];

  return (
    <View
      style={{
        padding: Spacing * 2,
        marginTop: 20,
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
          Integrantes
        </Text>

        <ScrollView>
          <View>
            {integrantes.map((integrante: any) => {
              return (
                <TouchableOpacity
                  style={{
                    marginVertical: 20,
                    backgroundColor: "#005050",
                    height: 80,
                    borderRadius: 10,
                  }}
                  key={integrante.id}
                  onPress={() => {
                    // MANDAR A LA PANTALLA DEL PROYECTO
                    console.log("Pulsaste el Boton", integrante.name);
                  }}
                >
                  <Text
                    style={{
                      width: 350,
                      color: "white",
                      textAlign: "center",
                      paddingTop: 20,
                    }}
                  >
                    {integrante.name}
                  </Text>
                  <Text
                    style={{
                      width: 350,
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    {integrante.rol}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
