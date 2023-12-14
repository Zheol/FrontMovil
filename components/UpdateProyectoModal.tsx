// UserProfileModal.tsx
import React from "react";
import { Text, View } from "react-native";
import { Modal, Portal, Button, Divider } from "react-native-paper";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "./AppTextInput";
import { UpdateProyectoModalProps } from "../types";
import { gql, useMutation } from "@apollo/client";

const DELETE_PROYECT = gql`
  mutation removeProyecto($input: FindProyectoByIdInput!) {
    removeProyecto(findProyectoByIdInput: $input) {
      id
    }
  }
`;

const UPDATE_PROYECT = gql`
  mutation updateProyecto(
    $input: updateProyectoDto!
    $inputId: FindProyectoByIdInput!
  ) {
    updateProyecto(
      updateProyectoInput: $input
      findProyectoByIdInput: $inputId
    ) {
      nombre
      area
    }
  }
`;

const ProyectoUpdateModal: React.FC<UpdateProyectoModalProps> = ({
  visible,
  hideModal,
  nombre,
  area,
}) => {
  const [deleteProyect, { loading: loadingDelete, error: errorDelete }] =
    useMutation(DELETE_PROYECT);
  const [updateProyect, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_PROYECT);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const navigation = useNavigation();

  const funcDeleteProyect = () => {
    const findProyectoByIdInput = {
      // id: formData.email,
    };
    console.log("Se esta eliminando el proyecto", nombre, area);
  };

  const funcActualizarProyect = () => {
    console.log("Se esta actualizando el proyecto", nombre, area);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            fontSize: FontSize.large,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {nombre}
        </Text>

        <View style={{ width: "100%", marginBottom: 10 }}>
          <Divider />
        </View>
        <View>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
            }}
          >
            Nombre
          </Text>
        </View>
        <AppTextInput value={nombre} placeholder="nombre" />
        <View>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
            }}
          >
            Area
          </Text>
        </View>
        <AppTextInput value={area} placeholder="área" />

        <View
          style={{
            marginVertical: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            mode="outlined"
            onPress={funcActualizarProyect}
            style={{ width: "45%", marginRight: 10 }}
          >
            Actualizar
          </Button>
          <Button
            mode="outlined"
            onPress={funcDeleteProyect}
            style={{ width: "45%", marginLeft: 10 }}
          >
            Eliminar
          </Button>
        </View>

        <View style={{ width: "100%", marginTop: 15, marginBottom: 20 }}>
          <Divider />
        </View>
      </Modal>
    </Portal>
  );
};

export default ProyectoUpdateModal;
