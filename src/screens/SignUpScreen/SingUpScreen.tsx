import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";

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

const SingUpScreen: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

  const navigation = useNavigation();

  const onRegisterPressed = () => {
    if (username && mail && password) {
      if (password === passwordRepeat) {
        const RegiserUserInput = {
          name: username,
          email: mail,
          password: password,
        };
        registerUser({
          variables: {
            input: RegiserUserInput,
          },
        })
          .then((data) => {
            navigation.navigate("Home");
          })
          .catch((error) => {});
      }
    } else {
    }
  };

  const onHaveAnAccountPressed = () => {
    navigation.navigate("InicioSesion");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}> Crear Cuenta</Text>

        <CustomInput
          placeholder="Nombre Completo"
          value={username}
          setValue={setUsername}
        />

        <CustomInput placeholder="Correo" value={mail} setValue={setMail} />

        <CustomInput
          placeholder="Contraseña"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <CustomInput
          placeholder="Repetir Contraseña"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry
        />

        <CustomButton text={"Registrar"} onPress={onRegisterPressed} />

        {error && <Text style={styles.alert}>{error.message}</Text>}

        <CustomButton
          text={"¿Ya tienes una cuenta?"}
          onPress={onHaveAnAccountPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 40,
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 500,
    maxHeight: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#051C60",
    margin: 20,
  },
  alert: {
    color: "red",
  },
});

export default SingUpScreen;
