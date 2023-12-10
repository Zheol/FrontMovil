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
import { useNavigation } from "@react-navigation/native";
import { Button, PaperProvider, Divider, Icon } from "react-native-paper";
import UserProfileModal from "../../components/UserProfileModal";
import { useState } from "react";

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
    email,
  } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const { loading, error, data, refetch } = useQuery(OBTENER_INTEGRANTES, {
    variables: {
      id: idEquipo,
    },
  });
  refetch(data);
  const navigation = useNavigation();

  const integrantes =
    data?.getIntegrantebyIdEquipo?.map((item) => ({
      id: item.id,
      name: item.user.name,
      rol: item.rol,
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
          nombre={nombreUser}
          email={email}
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
                    onPress={() => {
                      // MANDAR A LA PANTALLA DEL PROYECTO
                      console.log("Pulsaste el boton de:", integrante.name);
                    }}
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
                    nombreUser: nombreUser,
                    idUser: idUser,
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
