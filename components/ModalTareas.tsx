import React from "react";
import { Text, View } from "react-native";
import { Modal, Portal, Divider } from "react-native-paper";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { useNavigation } from "@react-navigation/native";

import { Integrante, UpdateTareaModalProps } from "../types";
import { gql, useMutation, useQuery } from "@apollo/client";

import SelectDropdown from "react-native-select-dropdown";

const estados = ["Completada", "En Curso"];

const UPDATE_TAREA = gql`
  mutation updateTarea($input: updateTareaDto!, $inputId: findTareaDto!) {
    updateTarea(updateTareaInput: $input, findTareaByIdInput: $inputId) {
      descripcion
      estado
    }
  }
`;

const GET_INTEGRANTES = gql`
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

const UPDATE_INTEGRANTE = gql`
  mutation updateTareaIntegrante(
    $input: UpdateIntegranteDto!
    $inputId: findTareaDto!
  ) {
    updateTareaIntegrante(
      updateIntegranteInput: $input
      findTareaByIdInput: $inputId
    ) {
      id
      idResponsable
      estado
    }
  }
`;

const ModalTarea: React.FC<UpdateTareaModalProps> = ({
  visible,
  hideModal,
  idTarea,
  descripcion,
  estado,
  idEquipo,
  created,
  updated,
}) => {
  const [updateTarea, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_TAREA);
  const [updateIntegrante, { loading: loadingUpdateI, error: errorUpdateI }] =
    useMutation(UPDATE_INTEGRANTE);

  const { loading, error, data, refetch } = useQuery(GET_INTEGRANTES, {
    variables: {
      id: idEquipo,
    },
  });

  const integrantes =
    data?.getIntegrantebyIdEquipo?.map((item: Integrante) => ({
      id: item.id,
      name: item.user.name,
      rol: item.rol,
      email: item.user.email,
    })) || [];

  const containerStyle = { backgroundColor: "white", padding: 20 };

  const navigation = useNavigation();

  const funcUpdateTarea = (selectedItem: string) => {
    const findTareaByIdInput = {
      id: idTarea,
    };
    const updateTareaInput = {
      estado: selectedItem,
    };
    updateTarea({
      variables: {
        input: updateTareaInput,
        inputId: findTareaByIdInput,
      },
    })
      .then(() => {
        hideModal();
      })
      .catch((error) => {
        console.error("Error al actualizar la tarea", error);
      });
  };

  const funcSelectedIntegrante = (selectedItem: number) => {
    const findTareaByIdInput = {
      id: idTarea,
    };
    const updateIntegranteInput = {
      idResponsable: selectedItem,
    };

    console.log(findTareaByIdInput, updateIntegranteInput);
    updateIntegrante({
      variables: {
        input: updateIntegranteInput,
        inputId: findTareaByIdInput,
      },
    })
      .then(() => {
        hideModal();
      })
      .catch((error) => {
        console.error("Error al actualizar responsable", error);
      });
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
          {descripcion}
        </Text>

        <View style={{ width: "100%", marginBottom: 10 }}>
          <Divider />
        </View>

        <View style={{ width: "100%", marginBottom: 10 }}>
          <Text>Actualizar estado </Text>
        </View>

        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SelectDropdown
            dropdownIconPosition={"left"}
            dropdownStyle={{
              height: 100,
              borderRadius: 8,
              backgroundColor: "#FFF",
              borderWidth: 1,
              borderColor: "#444",
            }}
            buttonStyle={{
              width: "100%",
              height: 50,
              backgroundColor: "#FFF",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#444",
            }}
            defaultButtonText={estado}
            data={estados}
            onSelect={(selectedItem) => {
              funcUpdateTarea(selectedItem);
            }}
          />
        </View>

        <View style={{ width: "100%", marginBottom: 10, marginTop: 10 }}>
          <Text>Asignar Responsable </Text>
        </View>

        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <SelectDropdown
            dropdownIconPosition={"left"}
            dropdownStyle={{
              height: 100,
              borderRadius: 8,
              backgroundColor: "#FFF",
              borderWidth: 1,
              borderColor: "#444",
            }}
            buttonStyle={{
              width: "100%",
              height: 50,
              backgroundColor: "#FFF",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#444",
            }}
            defaultButtonText={"Definir Responsable"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
              return item.name;
            }}
            data={integrantes}
            onSelect={(selectedItem) => {
              funcSelectedIntegrante(selectedItem.id);
            }}
          />
        </View>

        <View style={{ width: "100%", marginTop: 15 }}>
          <Text>Fecha creación: </Text>
        </View>
        <View style={{ width: "100%", marginTop: 15, marginBottom: 20 }}>
          <Text>Última actualización: </Text>
        </View>
        <View style={{ width: "100%", marginTop: 15, marginBottom: 20 }}>
          <Divider />
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalTarea;
