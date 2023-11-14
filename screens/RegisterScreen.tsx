import {
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Spacing from "../constants/Spacing";
import FontSize from "../constants/FontSize";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, formRegister } from "../types";
import AppTextInput from "../components/AppTextInput";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

const REGISTER_USER = gql`
  mutation register($input: RegisterUserInput!) {
    register(registerUserInput: $input) {
      user {
        email
      }
      access_token
    }
  }
`;

const { height } = Dimensions.get("window");
type Props = NativeStackScreenProps<RootStackParamList, "Register">;
const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain at least 8 characters"),
  confirmPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

const RegisterScreen: React.FC<Props> = ({ navigation: { navigate } }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [register, { loading, error }] = useMutation(REGISTER_USER);

  const navigation = useNavigation();

  const onPressSend = (formData: formRegister) => {
    const RegisterUserInput = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
    };

    register({
      variables: {
        input: RegisterUserInput,
      },
    })
      .then((response) => {
        const data = response.data;
        if (data && data.register) {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {});
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
            height: height / 6,
            marginTop: 10,
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
            Register
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
          <View style={{ height: 15 }}>
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
                placeholder="Name"
              />
            )}
            name="name"
          />
          <View style={{ height: 15 }}>
            {errors.name && (
              <Text style={{ color: "red" }}>{errors.name.message}</Text>
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
          <View style={{ height: 15 }}>
            {errors.password && (
              <Text style={{ color: "red" }}>{errors.password.message}</Text>
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
              Sign up
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

        <TouchableOpacity onPress={() => navigate("Login")}>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
              marginTop: 20,
            }}
          >
            Already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
