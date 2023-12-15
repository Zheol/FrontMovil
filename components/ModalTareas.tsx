// UserProfileModal.tsx
import React from "react";
import { Text, View } from "react-native";
import { Modal, Portal, Button, Divider } from "react-native-paper";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "./AppTextInput";
import { UpdateTareaModalProps } from "../types";
import { gql, useMutation } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const UPDATE_TAREA = gql`
  mutation updateTarea($input: updateTareaDto!, $inputId: findTareaDto!) {
    updateTarea(updateTareaInput: $input, findTareaByIdInput: $inputId) {
      descripcion
      estado
    }
  }
`;

const ModalTarea: React.FC<UpdateTareaModalProps> = ({
  visible,
  hideModal,
  idTarea,
  nombre,
}) => {
  const [updateTarea, { loading: loadingDelete, error: errorDelete }] =
    useMutation(UPDATE_TAREA);

  const containerStyle = { backgroundColor: "white", padding: 20 };

  const navigation = useNavigation();

  const funcUpdateTarea = () => {
    const findTareaByIdInput = {
      id: idTarea,
    };
    const updateTareaInput = {
      comentario: "",
      estado: "",
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

        <View style={{ width: "100%", marginTop: 15, marginBottom: 20 }}>
          <Divider />
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalTarea;
