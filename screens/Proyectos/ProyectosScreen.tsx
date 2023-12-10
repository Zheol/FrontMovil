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
import { Button, PaperProvider, Divider, Icon } from "react-native-paper";
import UserProfileModal from "../../components/UserProfileModal";
import UserProyectoModal from "../../components/UpdateProyectoModal";
import ProyectoUpdateModal from "../../components/UpdateProyectoModal";

const { height } = Dimensions.get("window");

const OBTENER_INTEGRANTES = gql`
  query getIntegrantesbyIdUsuario($id: Int!) {
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
  query getProyectosByUserId($input: getProyectosbyUserIdDto!) {
    getProyectosbyUserId(getProyectosbyUserInput: $input) {
      id
      idAdmin
      nombre
      area
    }
  }
`;

interface Project {
  id: number;
  nombre: string;
  area: string;
  idAdmin: number;
}

export default function ProyectosScreen({ route }) {
  const [proyect, setProyect] = useState<Proyect[]>();
  const { id, nombre, email } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const showModalUpdate = () => setModalUpdateVisible(true);
  const hideModalUpdate = () => setModalUpdateVisible(false);

  const {
    loading: loadPro,
    error: errProy,
    data: dataProyecto,
    refetch,
  } = useQuery(OBTENER_PROYECTOS, {
    variables: {
      input: {
        id,
      },
    },
  });
  refetch(dataProyecto);
  const projects: Project[] =
    dataProyecto?.getProyectosbyUserId?.map((item: Project) => ({
      id: item.id,
      nombre: item.nombre,
      area: item.area,
      idAdmin: item.idAdmin,
    })) || [];

  const {
    loading,
    error,
    data,
    refetch: refInte,
  } = useQuery(OBTENER_INTEGRANTES, {
    variables: { id: id },
  });
  refInte(data);

  const [projectsMiembro, setProyectos] = useState<Project[]>([]);
  const client = useApolloClient();

  // useEffect(() => {
  //   if (data?.getIntegrantebyIdUsuario) {
  //     data.getIntegrantebyIdUsuario.forEach(async (integrante) => {
  //       const response = await client.query({
  //         query: OBTENER_PROYECTO,
  //         variables: { id: integrante.idProyecto },
  //       });
  //       console.log(response);
  //       if (response.data) {
  //         setProyectos((currentProyectos) => [
  //           ...currentProyectos,
  //           response.data.getProyectosbyId,
  //         ]);
  //       }
  //     });
  //   }
  // }, [data, client]);

  const navigation = useNavigation();

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
          nombre={nombre}
          email={email}
          idUser={id}
        />

        <View
          style={{
            marginTop: 30,
            alignSelf: "flex-end",
          }}
        >
          <Button onPress={showModal}>
            <Icon source="dots-vertical" size={25} />
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
              marginTop: -40,
              paddingBottom: 10,
            }}
          >
            Proyectos
          </Text>

          <View style={{ width: "100%" }}>
            <Divider />
          </View>

          <View style={{ marginBottom: 80 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
              <View style={{ paddingVertical: 10 }}>
                <Text> Creados </Text>
              </View>
              <View>
                {projects.map((projects: Project) => {
                  return (
                    <TouchableOpacity
                      key={projects.id}
                      style={{
                        marginVertical: 10,
                        backgroundColor: "#ffebcd",
                        height: 120,
                        borderRadius: 10,
                      }}
                      onPress={() => {
                        // MANDAR A LA PANTALLA DEL PROYECTO
                        navigation.navigate("EquiposNav", {
                          nombreUser: nombre,
                          idUser: id,
                          nombreProyecto: projects.nombre,
                          idProyecto: projects.id,
                          email: email,
                        });
                      }}
                    >
                      <Text
                        style={{
                          width: 350,
                          color: "grey",
                          fontSize: 13,
                          alignSelf: "flex-start",
                          paddingTop: 10,
                          paddingLeft: 15,
                        }}
                      >
                        {projects.area}
                      </Text>
                      <Text
                        style={{
                          width: 350,
                          color: "black",
                          textAlign: "center",
                          paddingTop: 20,
                          fontSize: 15,
                        }}
                      >
                        {projects.nombre}
                      </Text>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          paddingTop: 10,
                        }}
                      >
                        <Button onPress={showModalUpdate}>
                          <Icon source="format-list-checkbox" size={17} />
                        </Button>
                      </View>

                      <ProyectoUpdateModal
                        visible={modalUpdateVisible}
                        hideModal={hideModalUpdate}
                        nombre={projects.nombre}
                        area={projects.area}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Text> Miembro </Text>
              </View>

              <View>
                {projectsMiembro.map((projectsMiembro: Project) => {
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
                          email: email,
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
