// UserProfileModal.tsx
import React from "react";
import { Text, View } from "react-native";
import { Modal, Portal, Button, Divider } from "react-native-paper";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "./AppTextInput";
import { UpdateEquipoModalProps, formCreateProyect, formUpdateTeam } from "../types";
import { gql, useMutation } from "@apollo/client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const DELETE_EQUIPO = gql`
  mutation removeEquipo($input: findEquipoByIdDto!) {
    removeEquipo(findEquipoByIdInput: $input) {
      id
    }
  }
`;

const UPDATE_EQUIPO = gql`
  mutation updateEquipo(
    $input: updateEquipoDto!
    $inputId: findEquipoByIdDto!
  ) {
    updateEquipo(updateEquipoInput: $input, findEquipoByIdInput: $inputId) {
      nombre
    }
  }
`;

const schema = yup.object().shape({
  nombre: yup.string().required("Campo requerido"),
});

const ModalEquipo: React.FC<UpdateEquipoModalProps> = ({
  visible,
  hideModal,
  nombre,
  idEquipo,
}) => {
  const [deleteEquipo, { loading: loadingDelete, error: errorDelete }] =
    useMutation(DELETE_EQUIPO);
  const [updateEquipo, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_EQUIPO);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const navigation = useNavigation();

  const funcDeleteEquipo = () => {
    const findEquipoByIdInput = {
      id: idEquipo,
    };
    deleteEquipo({
      variables: {
        input: findEquipoByIdInput,
      },
    })
      .then(() => {
        hideModal();
      })
      .catch((error) => {
        console.error("Error al eliminar el equipo", error);
      });
  };
  const funcActualizarEquipo: SubmitHandler<formUpdateTeam> = (formData) => {
    const findEquipoByIdInput = {
      id: idEquipo,
    };
    const updateEquipoInput = {
      nombre: formData.nombre,
    };
    updateEquipo({
      variables: {
        input: updateEquipoInput,
        inputId: findEquipoByIdInput,
      },
    })
      .then(() => {
        console.log("Equipo Actualizado con exito", formData.nombre);
        hideModal();
      })
      .catch((error) => {
        console.error("Error al Actualizar el equipo", error);
      });
  };

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: "",
    },
  });

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
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <AppTextInput
              value={value}
              onChangeText={onChange}
              placeholder={nombre}
            />
          )}
          name="nombre"
        />

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
            onPress={handleSubmit(funcActualizarEquipo)}
            style={{ width: "45%", marginRight: 10 }}
          >
            Actualizar
          </Button>
          <Button
            mode="outlined"
            onPress={funcDeleteEquipo}
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

export default ModalEquipo;
