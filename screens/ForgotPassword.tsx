import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacing from "../constants/Spacing";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { Controller, useForm } from "react-hook-form";
import AppTextInput from "../components/AppTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Colors from "../constants/Colors";
import { RootStackParamList, formForgotPass } from "../types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "ForgotPass">;

const SEND_EMAIL = gql`
  mutation sendEmailToken($input: emailUserDto!) {
    sendEmailToken(emailUserInput: $input) {
      message
    }
  }
`;

const { height } = Dimensions.get("window");

const schema = yup.object().shape({
  email: yup.string().required("Campo Requerido").email("Email inválido"),
});

const ForgotPassword: React.FC<Props> = ({ navigation: { navigate } }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const [sendEmailToken, { loading, error }] = useMutation(SEND_EMAIL);
  const navigation = useNavigation();

  const onPressSend = (formData: formForgotPass) => {
    const emailUserInput = {
      email: formData.email,
    };
    sendEmailToken({
      variables: {
        input: emailUserInput,
      },
    })
      .then((response) => {
        const data = response.data;
        if (data && data.sendEmailToken) {
          navigation.navigate("ResetPassword");
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
        <ImageBackground
          style={{
            height: height / 4,
            marginTop: 50,
            marginBottom: 10,
          }}
          resizeMode="contain"
          source={require("../assets/images/resetpassword.png")}
        />
        <View
          style={{
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Reset password
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
              placeholder="Email"
            />
          )}
          name="email"
        />

        <View
          style={{
            marginVertical: Spacing * 0.4,
          }}
        >
          {errors.email && (
            <Text style={{ color: "red" }}>{errors.email.message}</Text>
          )}
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
              Enviar
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ height: 40, paddingTop: 15 }}>
        {error && (
          <Text style={{ color: "red", textAlign: "center" }}>
            {error.message}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
