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
import React, { useEffect, useState } from "react";
import { Proyect } from "./types";
import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  PaperProvider,
  Divider,
  Icon
} from "react-native-paper";
import UserProfileModal from "../../components/UserProfileModal";

const { height } = Dimensions.get("window");

const OBTENER_INTEGRANTES = gql`
  query getIntegrantevyIdUser($id: Int!) {
    getIntegrantebyIdUsuario(id: $id) {
      idProyecto
      rol
    }
  }
`;

const OBTENER_PROYECTO = gql`
  query getProyectosbyId($id: Int!) {
    getProyectosbyId(id: $id) {
      nombre
      id
    }
  }
`;

const OBTENER_PROYECTOS = gql`
  query getProyectosbyUserId($id: Int!) {
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
  const { id, nombre, email } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 40,
    alignItems: "center",
  };

  const { loading: loadPro, error: errProy, data: dataProyecto, refetch } = useQuery(OBTENER_PROYECTOS, {
    variables: {
      id: id,
    },
  });
  refetch(dataProyecto);
  const projects: Project[] =
    dataProyecto?.getProyectosbyUserId?.map((item) => ({
      id: item.id,
      nombre: item.nombre,
    })) || [];

  const { loading, error, data, refetch: refInte } = useQuery(OBTENER_INTEGRANTES, {
    variables: { id: id },
  });
  refInte(data)

  const [projectsMiembro, setProyectos] = useState<Project[]>([]);
  const client = useApolloClient();

  useEffect(() => {
    if (data?.getIntegrantebyIdUsuario) {
      data.getIntegrantebyIdUsuario.forEach(async integrante => {
        const response = await client.query({
          query: OBTENER_PROYECTO,
          variables: { id: integrante.idProyecto }
        });
        if (response.data) {
          setProyectos(currentProyectos => [...currentProyectos, response.data.getProyectosbyId]);
        }
      });
    }
  }, [data, client]);

  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate("Login");
  };


  return (
    <PaperProvider>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <UserProfileModal 
          visible={modalVisible}
          hideModal={hideModal}
          nombre= {nombre}
          email= {email}
        />
        <View
          style={{
            marginTop: 30,
            alignSelf: "flex-start",
          }}
        >
          <Button onPress={showModal}>
            <Icon source="magnify" size={30} />
          </Button>
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
              marginTop: -43,
              paddingBottom: 10,
            }}
          >
            Proyectos
          </Text>

          <View
            style={{
              alignSelf: "flex-end",
              marginTop: -50,
            }}
          >
            <Button onPress={showModal}>
              <Icon source="account-details" size={30} />
            </Button>
          </View>

          <View style={{ width: "100%" }}>
            <Divider />
          </View>

          <View style={{ marginBottom: 60 }}>
            <ScrollView contentContainerStyle= {{paddingBottom: 70}}>
              <Text> Creador </Text>
              <View>
                {projects.map((projects: any) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginVertical: 20,
                        backgroundColor: "#ffebcd",
                        height: 100,
                        borderRadius: 10,
                      }}
                      key={projects.id}
                      onPress={() => {
                        // MANDAR A LA PANTALLA DEL PROYECTO
                        navigation.navigate("EquiposNav", {
                          nombreUser: nombre,
                          idUser: id,
                          nombreProyecto: projects.nombre,
                          idProyecto: projects.id,
                          email: email
                        });
                      }}
                    >
                      <Text
                        style={{
                          width: 350,
                          color: "black",
                          textAlign: "center",
                          paddingTop: 35,
                          fontSize: 15,
                        }}
                      >
                        {projects.nombre}
                      </Text>
                      <View
                        style={{
                          alignSelf: "flex-end",
                        }}
                      >
                        <Button onPress={goToLogin}>
                          <Icon source="format-list-checkbox" size={17} />
                        </Button>
                      </View>
                      {/* <View
                        style={{
                          alignSelf: "flex-end",
                        }}
                      >
                        <Button onPress={goToLogin}>
                          <Icon source="information-variant" size={17} />
                        </Button>
                      </View> */}
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text> Miembro </Text>
              <View>
                {projectsMiembro.map((projectsMiembro: any) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginVertical: 20,
                        backgroundColor: "#ffebcd",
                        height: 100,
                        borderRadius: 10,
                      }}
                      key={projectsMiembro.id}
                      onPress={() => {
                        // MANDAR A LA PANTALLA DEL PROYECTO
                        navigation.navigate("EquiposNav", {
                          nombreUser: nombre,
                          idUser: id,
                          nombreProyecto: projectsMiembro.nombre,
                          idProyecto: projectsMiembro.id,
                          email: email
                        });
                      }}
                    >
                      <Text
                        style={{
                          width: 350,
                          color: "black",
                          textAlign: "center",
                          paddingTop: 35,
                          fontSize: 15,
                        }}
                      >
                        {projectsMiembro.nombre}
                      </Text>
                      <View
                        style={{
                          alignSelf: "flex-end",
                        }}
                      >
                        <Button onPress={goToLogin}>
                          <Icon source="format-list-checkbox" size={17} />
                        </Button>
                      </View>
                      {/* <View
                        style={{
                          alignSelf: "flex-end",
                        }}
                      >
                        <Button onPress={goToLogin}>
                          <Icon source="information-variant" size={17} />
                        </Button>
                      </View> */}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
}
