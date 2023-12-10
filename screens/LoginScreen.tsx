import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, VALID_PASSWORD_REGEX, formLogin } from "../types";
import AppTextInput from "../components/AppTextInput";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;
const { height } = Dimensions.get("window");

const LOGIN_USER = gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      user {
        email
        id
        name
      }
      access_token
    }
  }
`;

const schema = yup.object().shape({
  email: yup.string().required("Campo Requerido").email("Email inválido"),
  password: yup.string().required("Campo Requerido"),
});

const LoginScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const navigation = useNavigation();

  const onPressSend = (formData: formLogin) => {
    const LoginUserInput = {
      email: formData.email,
      password: formData.password,
    };

    if (LoginUserInput.email && LoginUserInput.password) {
      login({
        variables: {
          input: LoginUserInput,
        },
      })
        .then((response) => {
          const data = response.data;
          if (data && data.login) {
            navigation.navigate("ProyectosNav", {
              nombre: data.login.user.name,
              email: data.login.user.email,
              id: data.login.user.id,
              accessToken: data.login.access_token,
            });
          }
        })
        .catch((error) => {});
    }
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
          source={require("../assets/images/welcome.png")}
        />
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
            }}
          >
            Login
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
                placeholder="Email"
              />
            )}
            name="email"
          />
          <View style={{ height: 20 }}>
            {errors.email && (
              <Text style={{ color: "red" }}>{errors.email.message}</Text>
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
          <View style={{ height: 20 }}>
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password.message}</Text>
            )}
          </View>
        </View>

        <TouchableOpacity onPress={() => navigate("ForgotPass")}>
          <View>
            <Text
              style={{
                fontFamily: Font["poppins-semiBold"],
                fontSize: FontSize.small,
                color: Colors.primary,
                alignSelf: "flex-end",
              }}
            >
              Forgot your password ?
            </Text>
          </View>
        </TouchableOpacity>

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
              Sign in
            </Text>
          </TouchableOpacity>
        )}

        <View style={{ height: 40, paddingTop: 20 }}>
          {error && (
            <Text style={{ color: "red", textAlign: "center" }}>
              {error.message}
            </Text>
          )}
        </View>

        <TouchableOpacity onPress={() => navigate("Register")}>
          <Text
            style={{
              marginTop: 20,
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Create new account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
