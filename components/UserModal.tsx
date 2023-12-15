// UserProfileModal.tsx
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Modal, Portal, Divider, ActivityIndicator } from "react-native-paper";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import AppTextInput from "./AppTextInput";
import Colors from "../constants/Colors";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserProfileModalProps } from "../types";
import Spacing from "../constants/Spacing";
import { gql, useMutation } from "@apollo/client";

const DELETE_INTEGRANTE = gql`
  mutation removeIntegrante($input: findIntegranteDto!) {
    removeIntegrante(findIntegranteDto: $input) {
      userId
    }
  }
`;

const schema = yup.object().shape({
  email: yup.string().optional().email("Email inválido"),
  name: yup.string().optional(),
});

const UserModal: React.FC<UserProfileModalProps> = ({
  visible,
  hideModal,
  nombre,
  email,
  idUser,
}) => {
  const [deleteIntegrante, { data, loading, error }] =
    useMutation(DELETE_INTEGRANTE);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const onPressSend = () => {
    const findUserByIdInput = {
      id: idUser,
    };
    deleteIntegrante({
      variables: {
        input: findUserByIdInput,
      },
    })
      .then(() => {
        hideModal();
      })
      .catch((error) => {
        console.error("Error al Eliminar el usuario", error);
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
          Usuario
        </Text>

        <View style={{ width: "100%", marginBottom: 10 }}>
          <Divider />
        </View>

        <View
          style={{
            marginVertical: Spacing * 1,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                value={value}
                editable={false}
                placeholder={nombre}
              />
            )}
            name="name"
          />
          <View style={{ height: 20 }}>
            {errors.name && (
              <Text style={{ color: "red" }}>{errors.name.message}</Text>
            )}
          </View>

          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                value={value}
                editable={false}
                placeholder={email}
              />
            )}
            name="email"
          />
          <View style={{ height: 20 }}>
            {errors.email && (
              <Text style={{ color: "red" }}>{errors.email.message}</Text>
            )}
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <View
              style={{
                padding: Spacing * 1.5,
                marginVertical: Spacing * 3,
              }}
            >
              <ActivityIndicator size="large" color="#d2691e" />
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onPressSend)}
              style={{
                padding: Spacing * 1,
                backgroundColor: "#000000",
                width: "45%",
                marginTop: 10,
                marginRight: 15,
                borderRadius: Spacing,
                shadowColor: Colors.primary,
              }}
            >
              <Text
                style={{
                  fontFamily: Font["poppins-bold"],
                  color: Colors.onPrimary,
                  textAlign: "center",
                  fontSize: FontSize.large,
                }}
              >
                Eliminar Integrante
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ height: 40, paddingTop: 20 }}>
          {error && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {error.message}
            </Text>
          )}
        </View>
        <View style={{ width: "100%", marginTop: 15, marginBottom: 20 }}>
          <Divider />
        </View>
      </Modal>
    </Portal>
  );
};

export default UserModal;
