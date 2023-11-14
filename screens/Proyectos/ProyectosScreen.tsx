import { Dimensions, View, Text, ScrollView } from "react-native";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import { useEffect, useState } from "react";
import { Proyect } from "./types";
import { gql, useQuery } from "@apollo/client";
const { height } = Dimensions.get("window");

const OBTENER_USUARIO = gql`
  query ObtenerUsuario($email: String!) {
    user(email: $email) {
      name
      equipos {
        nombre
      }
    }
  }
`;

const persons = [
  {
    id: "1",
    name: "Earnest Green",
  },
  {
    id: "2",
    name: "Winston Orn",
  },
  {
    id: "3",
    name: "Carlton Collins",
  },
  {
    id: "4",
    name: "Malcolm Labadie",
  },
  {
    id: "5",
    name: "Michelle Dare",
  },
  {
    id: "6",
    name: "Michelle Dare",
  },
  {
    id: "7",
    name: "Michelle Dare",
  },
];

export default function ProyectosScreen() {
  const [proyect, setProyect] = useState<Proyect>();
  const { loading, error, data } = useQuery(OBTENER_USUARIO);

  //console.log(error, "Pedro");

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
              {persons.map((persons: any) => {
                return (
                  <View
                    style={{
                      marginVertical: 20,
                      backgroundColor: "#005050",
                      height: 80,
                      borderRadius: 10,
                    }}
                    key={persons.id}
                  >
                    <Text
                      style={{
                        width: 350,
                        color: "white",
                        textAlign: "center",
                        paddingTop: 25,
                      }}
                    >
                      {persons.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
