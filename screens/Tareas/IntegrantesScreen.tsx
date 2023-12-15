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
import { SubmitHandler } from "react-hook-form";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, PaperProvider, Divider, Icon } from "react-native-paper";
import UserProfileModal from "../../components/UserProfileModal";
import UserModal from "../../components/UserModal";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const { height } = Dimensions.get("window");

const OBTENER_INTEGRANTES = gql`
  query getIntegrantebyIdEquipo($id: Int!) {
    getIntegrantebyIdEquipo(id: $id) {
      id
      user {
        name
        email
      }
      rol
    }
  }
`;

interface Integrante {
  id: number;
  user: User;
  rol: string;
}

interface User {
  name: string;
  email: string;
}

export default function IntegrantesScreen({ route }) {
  const {
    idProyecto,
    nombreProyecto,
    idEquipo,
    nombreEquipo,
  } = route.params;
  const {
    nameUser,
    emailUser,
    idUser,
  } = useContext(UserContext);
  const [modalVisibleUserId, setModalVisibleUserId] = useState<number | null>(null);

  const showModalUpdate = (userId: number) => {
    setModalVisibleUserId(userId);
  };

  const hideModalUpdate = () => {
    setModalVisibleUserId(null);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const { loading, error, data, refetch } = useQuery(OBTENER_INTEGRANTES, {
    variables: {
      id: idEquipo,
    },
  });
  refetch();
  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [])
  );
  const navigation = useNavigation();

  const integrantes =
    data?.getIntegrantebyIdEquipo?.map((item: Integrante) => ({
      id: item.id,
      name: item.user.name,
      rol: item.rol,
      email: item.user.email
    })) || [];

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
          nombre={nameUser}
          email={emailUser}
          idUser={idUser}
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
            Integrantes
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

          <ScrollView>
            <View>
              {integrantes.map((integrante: any) => {
                return (
                  <TouchableOpacity
                    style={{
                      marginVertical: 20,
                      backgroundColor: "#ffebcd",
                      height: 100,
                      borderRadius: 10,
                      paddingTop: 6,
                    }}
                    key={integrante.id}
                    onPress={() => showModalUpdate(integrante.id)}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        width: 350,
                        color: "black",
                        textAlign: "center",
                        paddingTop: 10,
                      }}
                    >
                      {integrante.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        width: 350,
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      {integrante.rol}
                    </Text>

                    <UserModal
                      visible={modalVisibleUserId === integrante.id}
                      hideModal={hideModalUpdate}
                      nombre={integrante.name}
                      idUser={integrante.id}
                      email={integrante.email}

                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            <View>
              <TouchableOpacity
                style={{
                  marginVertical: 20,
                  backgroundColor: "#ffebcd",
                  height: 100,
                  borderRadius: 10,
                }}
                onPress={() => {
                  // MANDAR A LA PANTALLA DE CREAR INTEGRANTE
                  navigation.navigate("CrearIntegrante", {
                    idProyecto: idProyecto,
                    nombreProyecto: nombreProyecto,
                    nombreEquipo: nombreEquipo,
                    idEquipo: idEquipo,
                  });
                }}
              >
                <Text
                  style={{
                    width: 350,
                    color: "black",
                    textAlign: "center",
                    paddingTop: 15,
                    fontSize: 50,
                  }}
                >
                  {"+"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </PaperProvider>
  );
}
