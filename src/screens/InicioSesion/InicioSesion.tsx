"use client";

import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";

const LOGIN_USER = gql`
  mutation login($input: LoginUserInput!) {
    login(loginUserInput: $input) {
      user {
        email
      }
      access_token
    }
  }
`;

const InicioSesion: React.FC = () => {
  const [mail, setMail] = useState<string>("");
  const [mailEmpty, setMailEmpty] = useState<string>("");
  const [camposEmpty, setCamposEmpty] = useState<string>("");
  const [passwordEmpty, setPasswordEmpty] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSingInPressed = async () => {
    if (!mail.trim()) setMailEmpty("Please Enter Mail");
    if (!password.trim()) setPasswordEmpty("Please Enter Password");

    const LoginUserInput = {
      email: mail,
      password: password,
    };

    if (LoginUserInput.email && LoginUserInput.password) {
      login({
        variables: {
          input: LoginUserInput,
        },
      })
        .then((data) => {
          navigation.navigate("Home");
        })
        .catch((error) => {});
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  const Separator = () => <View style={styles.separator} />;

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image
          source={require("../../assets/logo_1.png")}
          style={[styles.logo, { height: height * 0.2 }]}
          resizeMode="contain"
        />

        <CustomInput placeholder="Email" value={mail} setValue={setMail} />

        <CustomInput
          placeholder="Contraseña"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        {loading ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <CustomButton text={"Acceder"} onPress={onSingInPressed} />
        )}

        {error && <Text style={styles.alert}>{error.message}</Text>}

        <Separator />

        <CustomButton
          text={"¿Olvidaste tu contraseña?"}
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <CustomButton
          text={"Crear Cuenta"}
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 100,
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 500,
    maxHeight: 200,
    paddingTop: 100,
    marginVertical: 20,
  },
  separator: {
    marginVertical: 60,
  },
  alert: {
    color: "red",
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
export default InicioSesion;
