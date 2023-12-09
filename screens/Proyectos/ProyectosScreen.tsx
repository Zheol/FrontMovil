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
import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Button, PaperProvider, Divider, Icon } from "react-native-paper";
import UserProfileModal from "../../components/UserProfileModal";
import UserProyectoModal from "../../components/UpdateProyectoModal";
import ProyectoUpdateModal from "../../components/UpdateProyectoModal";

const { height } = Dimensions.get("window");

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
  name: string;
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

  const { loading, error, data, refetch } = useQuery(OBTENER_PROYECTOS, {
    variables: {
      input: {
        id,
      },
    },
  });
  refetch(data);
  const projects: Project[] =
    data?.getProyectosbyUserId?.map((item) => ({
      id: item.id,
      name: item.nombre,
      area: item.area,
      idAdmin: item.idAdmin,
    })) || [];

  console.log(data);

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
          nombre={nombre}
          email={email}
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

          <View style={{ marginBottom: 60 }}>
            <ScrollView>
              <View>
                {projects.map((projects: any) => {
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
                          nombreProyecto: projects.name,
                          idProyecto: projects.id,
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
                        {projects.name}
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
                        nombre={projects.name}
                        area={projects.area}
                      />

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
