// UserProfileModal.tsx
import React from "react";
import { Text, View } from "react-native";
import { Modal, Portal, Button, Divider } from "react-native-paper";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "./AppTextInput";
import { UpdateProyectoModalProps, formCreateProyect } from "../types";
import { gql, useMutation } from "@apollo/client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const schema = yup.object().shape({
  nombre: yup.string().required("Campo requerido"),
  area: yup.string().required("Campo requerido"),
});

const ProyectoUpdateModal: React.FC<UpdateProyectoModalProps> = ({
  visible,
  hideModal,
  nombre,
  area,
  idProyecto,
}) => {
  const [deleteProyect, { loading: loadingDelete, error: errorDelete }] =
    useMutation(DELETE_PROYECT);
  const [updateProyect, { loading: loadingUpdate, error: errorUpdate }] =
    useMutation(UPDATE_PROYECT);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const navigation = useNavigation();

  const funcDeleteProyect = () => {
    const findProyectoByIdInput = {
      id: idProyecto,
    };
    deleteProyect({
      variables: {
        input: findProyectoByIdInput,
      }
    })
    .then(() => {
      hideModal();
    })
    .catch(error => {
      console.error("Error al eliminar el proyecto", error);
    })
  };
  const funcActualizarProyect: SubmitHandler<formCreateProyect> = (formData) => {
    const findProyectoByIdInput = {
      id: idProyecto,
    };
    const updateProyectoInput = {
      nombre: formData.nombre,
      area: formData.area,
    }
    updateProyect({
      variables: {
        input: updateProyectoInput,
        inputId: findProyectoByIdInput,
      }
    })
    .then(() => {
      console.log("Proyecto Actualizado con exito", formData.nombre, formData.area);
      hideModal();
    })
    .catch(error => {
      console.error("Error al Actualizar el proyecto", error);
    })
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
      area: "",
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
        <View>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
            }}
          >
            Area
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
                placeholder={area}
              />
            )}
            name="area"
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
            onPress={handleSubmit(funcActualizarProyect)}
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
