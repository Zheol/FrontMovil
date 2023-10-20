import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import { useUser } from "../../User/UserContext";

const CREATE_TEAM = gql`
  mutation createEquipo($input: CreateEquipoInput!) {
    createEquipo(createEquipoInput: $input) {
        id
    }
  }
`;

const CreateTeamScreen: React.FC = () => {
    
  const [teamname, setTeamname] = useState<string>("");
  const [registerUser, { data, loading, error }] = useMutation(CREATE_TEAM);

  const navigation = useNavigation();

  const {user} = useUser();

  const userID = user.userID

  const onCreateTeamPressed = () => {
    if (teamname) {
        const CreateTeamInput = {
          nombre: teamname,
          idAdmin: userID

        };
        registerUser({
          variables: {
            input: CreateTeamInput,
          },
        })
          .then((data) => {
            navigation.navigate("Home");
          })
          .catch((error) => {});
      }
  };

  const onBackPressed = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}> Crear Equipo</Text>

        <CustomInput
          placeholder="Nombre del Equipo"
          value={teamname}
          setValue={setTeamname}
        />

        <CustomButton text={"Crear"} onPress={onCreateTeamPressed} />

        {error && <Text style={styles.alert}>{error.message}</Text>}

        <CustomButton
          text={"Volver"}
          onPress={onBackPressed}
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


export default CreateTeamScreen