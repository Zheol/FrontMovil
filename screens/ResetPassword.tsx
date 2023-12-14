import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { VALID_PASSWORD_REGEX, formResetPassword } from "../types";
import AppTextInput from "../components/AppTextInput";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

const RESET_PASSWORD = gql`
  mutation sendResetPassword($input: ResetPasswordDto!) {
    sendResetPassword(ResetPasswordInput: $input) {
      message
    }
  }
`;

const schema = yup.object().shape({
  token: yup.string().required("Campo obligatorio"),
  password: yup
    .string()
    .required("Campo obligatorio")
    .min(8, "La contraseña debe tener minimo 8 caracteres")
    .max(20, "La contraseña no debe superar los 20 caracteres")
    .matches(
      VALID_PASSWORD_REGEX,
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter"
    ),
  confirmPassword: yup
    .string()
    .required("Campo obligatorio")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});

const ResetPasswordScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD);

  const navigation = useNavigation();

  const onPressSend = (formData: formResetPassword) => {
    const ResetPasswordInput = {
      token: formData.token,
      newPassword: formData.password,
    };
    resetPassword({
      variables: {
        input: ResetPasswordInput,
      },
    })
      .then((response) => {
        const data = response.data;
        if (data && data.sendResetPassword) {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              paddingTop: 40,
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Reset Password
          </Text>
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
                placeholder="Token"
              />
            )}
            name="token"
          />
          <View style={{ height: 30 }}>
            {errors.token && (
              <Text style={{ color: "red" }}>{errors.token.message}</Text>
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
                placeholder="Password"
              />
            )}
            name="password"
          />
          <View style={{ height: 30 }}>
            {errors.password && (
              <Text style={{ color: "red", fontSize: 14 }}>
                {errors.password.message}
              </Text>
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
                placeholder="Confirm Password"
              />
            )}
            name="confirmPassword"
          />
          <View style={{ height: 18 }}>
            {errors.confirmPassword && (
              <Text style={{ color: "red" }}>
                {errors.confirmPassword.message}
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
              backgroundColor: "#000000",
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
              Continuar
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40, paddingTop: 15 }}>
          {error && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {error.message}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
