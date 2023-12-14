// UserProfileModal.tsx
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Modal, Portal, Divider, ActivityIndicator } from "react-native-paper";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "./AppTextInput";
import Colors from "../constants/Colors";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserProfileModalProps, formUpdateUser } from "../types";
import Spacing from "../constants/Spacing";
import { gql, useMutation } from "@apollo/client";

const UPDATE_USER = gql`
  mutation updatePassword(
    $input: updatePasswordDto!
    $inputId: FindUserByIdInput!
  ) {
    updatePassword(updateUserInput: $input, findUserByIdInput: $inputId) {
      id
    }
  }
`;

const schema = yup.object().shape({
  email: yup.string().optional().email("Email inválido"),
  name: yup.string().optional(),
});

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  visible,
  hideModal,
  nombre,
  email,
  idUser,
}) => {
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER);
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

  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  const onPressSend = (formData: formUpdateUser) => {
    if (!formData.name.length) formData.name = nombre;
    if (!formData.email.length) formData.email = email;
    console.log(formData);
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
                onChangeText={onChange}
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
                onChangeText={onChange}
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
                Actualizar
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={goToLogin}
            style={{
              padding: Spacing * 1,
              backgroundColor: "#000000",
              width: "45%",
              marginLeft: 15,
              marginTop: 10,
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
              Salir
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40, paddingTop: 20 }}>
          {error && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {error.message}
            </Text>
          )}
        </View>

        <TouchableOpacity>
          <Text
            onPress={() => {
              navigation.navigate("ChangePassword", { idUser });
            }}
            style={{
              marginTop: 10,
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Actualizar contraseña
          </Text>
        </TouchableOpacity>
        <View style={{ width: "100%", marginTop: 15, marginBottom: 20 }}>
          <Divider />
        </View>
      </Modal>
    </Portal>
  );
};

export default UserProfileModal;
