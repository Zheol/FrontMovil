import React from "react";
import { Text, View } from "react-native";
import { Modal, Portal, Divider, Button } from "react-native-paper";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { useNavigation } from "@react-navigation/native";

import { Integrante, UpdateTareaModalProps } from "../types";
import { gql, useMutation, useQuery } from "@apollo/client";

import SelectDropdown from "react-native-select-dropdown";

const estados = ["Completada", "En Curso"];

const OBTENER_TAREA = gql`
  query getTareaById($id: Int!) {
    getTareaById(id: $id) {
      descripcion
      id
      estado
      created
      updated
      idResponsable
    }
  }
`;

const UPDATE_TAREA = gql`
  mutation updateTarea($input: updateTareaDto!, $inputId: findTareaDto!) {
    updateTarea(updateTareaInput: $input, findTareaByIdInput: $inputId) {
      descripcion
      estado
    }
  }
`;

const DELETE_TAREA = gql`
  mutation removeTarea($input: findTareaDto!) {
    removeTarea(findTareaByIdDto: $input) {
      id
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

const GET_INTEGRANTE = gql`
  query getIntegrantebyId($input: findIntegranteDto!) {
    getIntegrantebyId(getIntegrantebyId: $input) {
      user {
        id
      }
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
  const [deleteTarea, { loading: loadingDelete, error: errorDelete }] =
    useMutation(DELETE_TAREA);

  const { data: dataTarea } = useQuery(OBTENER_TAREA, {
    variables: {
      id: idTarea,
    },
  });

  const integrantes =
    data?.getIntegrantebyIdEquipo?.map((item: Integrante) => ({
      id: item.id,
      name: item.user.name,
      rol: item.rol,
      email: item.user.email,
    })) || [];
  
  const TareaDB = dataTarea?.getTareaById;
  

  if (TareaDB.idResponsable != null) {
    const getIntegrantebyId = {
      id: TareaDB.idResponsable,
    };
    //console.log(getIntegrantebyId);
  }

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

  const funcDeleteTarea = () => {
    const findTareaByIdDto = {
      id: idTarea,
    };
    deleteTarea({
      variables: {
        input: findTareaByIdDto,
      },
    })
      .then(() => {
        hideModal();
      })
      .catch((error) => {
        console.error("Error al eliminar la tarea", error);
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
            marginVertical: 10,
          }}
        >
          {descripcion}
        </Text>
        <View style={{ width: "100%", marginTop: 15, marginBottom: 20 }}>
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

        <View style={{ width: "100%", marginTop: 25 }}>
          <Text>Responsable: {TareaDB.idResponsable}</Text>
        </View>

        <View style={{ width: "100%", marginTop: 15 }}>
          <Text>Fecha creación: {TareaDB.created}</Text>
        </View>
        <View style={{ width: "100%", marginTop: 15, marginBottom: 10 }}>
          <Text>Última actualización: {TareaDB.updated}</Text>
        </View>
        <View style={{ width: "100%", marginTop: 15, marginBottom: 20 }}>
          <Divider />
        </View>

        <Button
          mode="outlined"
          onPress={funcDeleteTarea}
          style={{ width: "100%" }}
        >
          Eliminar
        </Button>
      </Modal>
    </Portal>
  );
};

export default ModalTarea;
