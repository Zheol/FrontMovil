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
import {
  Button,
  PaperProvider,
  Divider,
  Icon
} from "react-native-paper";
import UserProfileModal from "../../components/UserProfileModal";

const { height } = Dimensions.get("window");

const OBTENER_PROYECTOS = gql`
  query ($id: Int!) {
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

  const { loading, error, data, refetch } = useQuery(OBTENER_PROYECTOS, {
    variables: {
      id: id,
    },
  });
  refetch(data);
  const projects: Project[] =
    data?.getProyectosbyUserId?.map((item) => ({
      id: item.id,
      name: item.nombre,
    })) || [];

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
            <ScrollView>
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
                          nombreProyecto: projects.name,
                          idProyecto: projects.id,
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
                        {projects.name}
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
