import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen: React.FC = () => {
  const [mail, setMail] = useState<string>("");
  const navigation = useNavigation();

  const onSendPressed = () => {
    console.warn("Correo enviado");
    navigation.navigate("NewPassword");
  };

  const onHomePagePressed = () => {
    navigation.navigate("InicioSesion");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}> Resetear Contraseña</Text>

        <CustomInput placeholder="Correo" value={mail} setValue={setMail} />

        <CustomButton text={"Enviar"} onPress={onSendPressed} />

        <CustomButton
          text={"Volver al Inicio"}
          onPress={onHomePagePressed}
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
});

export default ForgotPasswordScreen;
