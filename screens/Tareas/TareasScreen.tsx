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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
const { height } = Dimensions.get("window");
import { Button, PaperProvider, Divider, Icon } from "react-native-paper";
import UserProfileModal from "../../components/UserProfileModal";
import { UserContext } from "../../context/UserContext";
import ModalTarea from "../../components/ModalTareas";

const OBTENER_TAREAS = gql`
  query getTareasbyEquipoId($id: Int!) {
    getTareasbyEquipoId(id: $id) {
      descripcion
      id
      estado
    }
  }
`;

interface Tarea {
  id: number;
  descripcion: string;
  estado: string;
}

export default function TareasScreen({ route }) {
  const [proyect, setProyect] = useState<Tarea>();
  const { idProyecto, nombreProyecto, idEquipo, nombreEquipo } = route.params;
  const { nameUser, emailUser, idUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const [modalVisibleTareaId, setModalVisibleTareaId] = useState(null);
  const showModalUpdate = (tareaId) => {
    setModalVisibleTareaId(tareaId);
  };

  const hideModalUpdate = () => {
    setModalVisibleTareaId(null);
  };
  const containerStyle = {
    backgroundColor: "white",
    padding: 40,
    alignItems: "center",
  };

  const { loading, error, data, refetch } = useQuery(OBTENER_TAREAS, {
    variables: {
      id: idEquipo,
    },
  });
  useFocusEffect(
    React.useCallback(() => {
      refetch();
      return () => {};
    }, [])
  );
  const tareas: Tarea[] =
    data?.getTareasbyEquipoId?.map((item) => ({
      id: item.id,
      descripcion: item.descripcion,
      estado: item.estado,
    })) || [];

  const tareasCreadas: Tarea[] = [];
  const tareasEnCurso: Tarea[] = [];
  const tareasCompletadas: Tarea[] = [];
  const tareasEliminadas: Tarea[] = [];

  if (data && data.getTareasbyEquipoId) {
    data.getTareasbyEquipoId.forEach((item) => {
      const tarea = {
        id: item.id,
        descripcion: item.descripcion,
        estado: item.estado,
      };

      switch (tarea.estado) {
        case "Creada":
          tareasCreadas.push(tarea);
          break;
        case "En Curso":
          tareasEnCurso.push(tarea);
          break;
        case "Completada":
          tareasCompletadas.push(tarea);
          break;
        case "Eliminada":
          tareasEliminadas.push(tarea);
          break;
        default:
          // Manejar tareas con estados desconocidos o no especificados
          break;
      }
    });
  }

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
            Tareas
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
            <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
              <Text>Tareas Creadas</Text>
              <View>
                {tareasCreadas.map((tareas: any) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginVertical: 20,
                        backgroundColor: "#ffebcd",
                        height: 120,
                        borderRadius: 10,
                      }}
                      key={tareas.id}
                      onPress={() => {
                        // MANDAR A LA PANTALLA DEL PROYECTO
                        navigation.navigate("EditarTarea", {
                          nombreUser: nameUser,
                          idUser: idUser,
                          idProyecto: idProyecto,
                          nombreProyecto: nombreProyecto,
                          nombreEquipo: nombreEquipo,
                          idEquipo: idEquipo,
                          nombreTarea: tareas.descripcion,
                          idTarea: tareas.id,
                          estadoTarea: tareas.estado,
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
                        {tareas.descripcion}
                      </Text>
                      <Text
                        style={{
                          width: 350,
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        {tareas.estado}
                      </Text>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          paddingTop: 10,
                        }}
                      >
                        <Button onPress={() => showModalUpdate(tareas.id)}>
                          <Icon source="format-list-checkbox" size={17} />
                        </Button>
                      </View>
                      <ModalTarea
                        visible={modalVisibleTareaId === tareas.id}
                        hideModal={hideModalUpdate}
                        descripcion={tareas.descripcion}
                        idTarea={tareas.id}
                        estado={tareas.estado}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text>Tareas en Curso</Text>

              <View>
                {tareasEnCurso.map((tareas: any) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginVertical: 20,
                        backgroundColor: "#ffebcd",
                        height: 120,
                        borderRadius: 10,
                      }}
                      key={tareas.id}
                      onPress={() => {
                        // MANDAR A LA PANTALLA DEL PROYECTO
                        navigation.navigate("EditarTarea", {
                          nombreUser: nameUser,
                          idUser: idUser,
                          idProyecto: idProyecto,
                          nombreProyecto: nombreProyecto,
                          nombreEquipo: nombreEquipo,
                          idEquipo: idEquipo,
                          nombreTarea: tareas.descripcion,
                          idTarea: tareas.id,
                          estadoTarea: tareas.estado,
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
                        {tareas.descripcion}
                      </Text>
                      <Text
                        style={{
                          width: 350,
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        {tareas.estado}
                      </Text>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          paddingTop: 10,
                        }}
                      >
                        <Button onPress={() => showModalUpdate(tareas.id)}>
                          <Icon source="format-list-checkbox" size={17} />
                        </Button>
                      </View>
                      <ModalTarea
                        visible={modalVisibleTareaId === tareas.id}
                        hideModal={hideModalUpdate}
                        descripcion={tareas.descripcion}
                        idTarea={tareas.id}
                        estado={tareas.estado}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text>Tareas Completadas</Text>

              <View>
                {tareasCompletadas.map((tareas: any) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginVertical: 20,
                        backgroundColor: "#ffebcd",
                        height: 120,
                        borderRadius: 10,
                      }}
                      key={tareas.id}
                      onPress={() => {
                        // MANDAR A LA PANTALLA DEL PROYECTO
                        navigation.navigate("EditarTarea", {
                          nombreUser: nameUser,
                          idUser: idUser,
                          idProyecto: idProyecto,
                          nombreProyecto: nombreProyecto,
                          nombreEquipo: nombreEquipo,
                          idEquipo: idEquipo,
                          nombreTarea: tareas.descripcion,
                          idTarea: tareas.id,
                          estadoTarea: tareas.estado,
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
                        {tareas.descripcion}
                      </Text>
                      <Text
                        style={{
                          width: 350,
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        {tareas.estado}
                      </Text>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          paddingTop: 10,
                        }}
                      >
                        <Button onPress={() => showModalUpdate(tareas.id)}>
                          <Icon source="format-list-checkbox" size={17} />
                        </Button>
                      </View>
                      <ModalTarea
                        visible={modalVisibleTareaId === tareas.id}
                        hideModal={hideModalUpdate}
                        descripcion={tareas.descripcion}
                        idTarea={tareas.id}
                        estado={tareas.estado}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text>Tareas Eliminadas</Text>

              <View>
                {tareasEliminadas.map((tareas: any) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginVertical: 20,
                        backgroundColor: "#ffebcd",
                        height: 120,
                        borderRadius: 10,
                      }}
                      key={tareas.id}
                      onPress={() => {
                        // MANDAR A LA PANTALLA DEL PROYECTO
                        navigation.navigate("EditarTarea", {
                          nombreUser: nameUser,
                          idUser: idUser,
                          idProyecto: idProyecto,
                          nombreProyecto: nombreProyecto,
                          nombreEquipo: nombreEquipo,
                          idEquipo: idEquipo,
                          nombreTarea: tareas.descripcion,
                          idTarea: tareas.id,
                          estadoTarea: tareas.estado,
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
                        {tareas.descripcion}
                      </Text>
                      <Text
                        style={{
                          width: 350,
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        {tareas.estado}
                      </Text>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          paddingTop: 10,
                        }}
                      >
                        <Button onPress={() => showModalUpdate(tareas.id)}>
                          <Icon source="format-list-checkbox" size={17} />
                        </Button>
                      </View>
                      <ModalTarea
                        visible={modalVisibleTareaId === tareas.id}
                        hideModal={hideModalUpdate}
                        nombre={tareas.name}
                        idTarea={tareas.id}
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
