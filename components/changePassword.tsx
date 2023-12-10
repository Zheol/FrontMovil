import {
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Schema } from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import { Button, PaperProvider, Divider, Icon } from "react-native-paper";
import { useState } from "react";
import { VALID_PASSWORD_REGEX, formChangePassword } from "../types";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import AppTextInput from "./AppTextInput";
import Colors from "../constants/Colors";

const { height } = Dimensions.get("window");

const UPDATE_PASSWORD = gql`
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
  oldPassword: yup
    .string()
    .required("Campo obligatorio")
    .min(8, "La contraseña debe tener minimo 8 caracteres")
    .max(20, "La contraseña no debe superar los 20 caracteres")
    .matches(
      VALID_PASSWORD_REGEX,
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter"
    ),
  newPassword: yup
    .string()
    .required("Campo obligatorio")
    .min(8, "La contraseña debe tener minimo 8 caracteres")
    .max(20, "La contraseña no debe superar los 20 caracteres")
    .matches(
      VALID_PASSWORD_REGEX,
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter"
    ),
  repeatPassword: yup
    .string()
    .required("Campo obligatorio")
    .oneOf([yup.ref("newPassword")], "Las contraseñas no coinciden"),
});

export default function ChangePasswordScreen({ route }) {
  const { idUser } = route.params;
  const [updatePassword, { data, loading, error }] =
    useMutation(UPDATE_PASSWORD);
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
    },
  });

  const onPressSend: SubmitHandler<formChangePassword> = async (
    formData: formChangePassword
  ) => {
    const FindUserByIdInput = {
      id: idUser,
    };
    const updatePasswordDto = {
      password: formData.newPassword,
      oldpassword: formData.oldPassword,
      confirmpassword: formData.repeatPassword,
    };
    console.log(formData);
    updatePassword({
      variables: {
        input: updatePasswordDto,
        inputId: FindUserByIdInput,
      },
    })
      .then((response) => {
        const data = response.data;
        if (data && data.updatePassword) {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {});
  };

  return (
    <PaperProvider>
      <View
        style={{
          padding: Spacing * 2,
          marginTop: 100,
        }}
      >
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
              marginTop: -45,
              paddingBottom: 10,
            }}
          >
            Cambiar contraseña
          </Text>
        </View>

        <View style={{ width: "100%" }}>
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
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                value={value}
                onChangeText={onChange}
                secureTextEntry={true}
                placeholder="Contraseña antigua"
              />
            )}
            name="oldPassword"
          />
          <View style={{ height: 20 }}>
            {errors.oldPassword && (
              <Text style={{ color: "red" }}>{errors.oldPassword.message}</Text>
            )}
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
                secureTextEntry={true}
                placeholder="Contraseña nueva"
              />
            )}
            name="newPassword"
          />
          <View style={{ height: 20 }}>
            {errors.newPassword && (
              <Text style={{ color: "red" }}>{errors.newPassword.message}</Text>
            )}
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
                secureTextEntry={true}
                placeholder="Contraseña nueva"
              />
            )}
            name="repeatPassword"
          />
          <View style={{ height: 20 }}>
            {errors.repeatPassword && (
              <Text style={{ color: "red" }}>
                {errors.repeatPassword.message}
              </Text>
            )}
          </View>
        </View>

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
              padding: Spacing * 1.5,
              backgroundColor: "#005050",
              marginTop: 20,
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
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
              Cambiar
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </PaperProvider>
  );
}
