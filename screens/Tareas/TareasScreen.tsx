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
      created
      updated
    }
  }
`;

interface Tarea {
  id: number;
  descripcion: string;
  estado: string;
  created: Date;
  updated: Date;
}

export default function TareasScreen({ route }) {
  const [proyect, setProyect] = useState<Tarea>();
  const { idProyecto, nombreProyecto, idEquipo, nombreEquipo } = route.params;
  const { nameUser, emailUser, idUser } = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const [modalVisibleTareaId, setModalVisibleTareaId] = useState<number | null>(
    null
  );
  const showModalUpdate = (tareaId: number) => {
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
  refetch();

  const tareasCreadas: Tarea[] = [];
  const tareasEnCurso: Tarea[] = [];
  const tareasCompletadas: Tarea[] = [];
  const tareasEliminadas: Tarea[] = [];

  if (data && data.getTareasbyEquipoId) {
    data.getTareasbyEquipoId.forEach((item: Tarea) => {
      const tarea = {
        id: item.id,
        descripcion: item.descripcion,
        estado: item.estado,
        created: item.created,
        updated: item.created,
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

          <View style={{ marginBottom: 60, marginTop: 5 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
              <Text>Tareas Creadas</Text>
              <View>
                {tareasCreadas.map((tareas: any) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginVertical: 20,
                        backgroundColor: "#ffebcd",
                        height: 90,
                        borderRadius: 10,
                      }}
                      key={tareas.id}
                      onPress={() => {
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
                          color: "grey",
                          fontSize: 13,
                          alignSelf: "flex-start",
                          paddingTop: 10,
                          paddingLeft: 15,
                        }}
                      >
                        C: {tareas.created}
                      </Text>
                      <Text
                        style={{
                          width: 350,
                          color: "black",
                          textAlign: "center",
                          fontSize: 15,
                        }}
                      >
                        {tareas.descripcion}
                      </Text>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          paddingTop: 5,
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
                        idEquipo={idEquipo}
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
                        height: 90,
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
                          color: "grey",
                          fontSize: 13,
                          alignSelf: "flex-start",
                          paddingTop: 10,
                          paddingLeft: 15,
                        }}
                      >
                        C: {tareas.created}
                      </Text>
                      <Text
                        style={{
                          width: 350,
                          color: "black",
                          textAlign: "center",
                          fontSize: 15,
                        }}
                      >
                        {tareas.descripcion}
                      </Text>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          paddingTop: 5,
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
                        idEquipo={idEquipo}
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
                        height: 90,
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
                          color: "grey",
                          fontSize: 13,
                          alignSelf: "flex-start",
                          paddingTop: 10,
                          paddingLeft: 15,
                        }}
                      >
                        C: {tareas.created}
                      </Text>
                      <Text
                        style={{
                          width: 350,
                          color: "black",
                          textAlign: "center",
                          fontSize: 15,
                        }}
                      >
                        {tareas.descripcion}
                      </Text>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          paddingTop: 5,
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
                        idEquipo={idEquipo}
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
                        height: 90,
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
                          color: "grey",
                          fontSize: 13,
                          alignSelf: "flex-start",
                          paddingTop: 10,
                          paddingLeft: 15,
                        }}
                      >
                        C: {tareas.created}
                      </Text>
                      <Text
                        style={{
                          width: 350,
                          color: "black",
                          textAlign: "center",
                          fontSize: 15,
                        }}
                      >
                        {tareas.descripcion}
                      </Text>
                      <View
                        style={{
                          alignSelf: "flex-end",
                          paddingTop: 5,
                        }}
                      >
                        <Button onPress={() => showModalUpdate(tareas.id)}>
                          <Icon source="format-list-checkbox" size={17} />
                        </Button>
                      </View>
                      <ModalTarea
                        visible={modalVisibleTareaId === tareas.id}
                        hideModal={hideModalUpdate}
                        descripcion={tareas.name}
                        estado={tareas.estado}
                        idTarea={tareas.id}
                        idEquipo={idEquipo}
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
