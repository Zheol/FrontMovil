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
import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Equipo } from "./types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, PaperProvider, Divider, Icon } from "react-native-paper";
import UserProfileModal from "../../components/UserProfileModal";
import { UserContext } from "../../context/UserContext";
import ModalEquipo from "../../components/ModalEquipo";

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
  const {idProyecto, nombreProyecto} =
    route.params;
  const {
    nameUser,
    emailUser,
    idUser,
  } = useContext(UserContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const [modalVisibleEquipoId, setModalVisibleEquipotId] = useState<number | null>(null);
  const showModalUpdate = (equipoId: number) => {
    setModalVisibleEquipotId(equipoId);
  };

  const hideModalUpdate = () => {
    setModalVisibleEquipotId(null);
  };

  const { loading, error, data, refetch } = useQuery(OBTENER_EQUIPOS, {
    variables: {
      id: idProyecto,
    },
  });
  const equipos: Equipo[] =
    data?.getEquiposbyProyectId?.map((item: Equipo) => ({
      id: item.id,
      nombre: item.nombre,
    })) || [];
  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [])
  );
 

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
            {nombreProyecto}
          </Text>

          <View style={{ width: "100%" }}>
            <Divider />
          </View>

          <View style={{ marginBottom: 60 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
              <View>
                {equipos.map((equipos: any) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginVertical: 10,
                        backgroundColor: "#ffebcd",
                        height: 120,
                        borderRadius: 10,
                      }}
                      key={equipos.id}
                      onPress={() => {
                        // MANDAR A LA PANTALLA DEL Tareas
                        navigation.navigate("TareasNav", {
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
                          color: "black",
                          textAlign: "center",
                          paddingTop: 45,
                          fontSize: 15,
                        }}
                      >
                        {equipos.nombre}
                      </Text>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          paddingTop: 10,
                        }}
                      >
                        <Button onPress={() => showModalUpdate(equipos.id)}>
                          <Icon source="format-list-checkbox" size={17} />
                        </Button>
                      </View>
                      <ModalEquipo 
                        visible={modalVisibleEquipoId === equipos.id}
                        hideModal={hideModalUpdate}
                        nombre={equipos.name}
                        idEquipo={equipos.id}  
                      />
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
