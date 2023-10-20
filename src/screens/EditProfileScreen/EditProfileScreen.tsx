import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";
import { useUser } from "../../User/UserContext";
import { useQuery } from "@apollo/client";

const EDITPROFILE = gql`
mutation EDITPROFILE($input: UpdateUserDto!) {
    updateUser(UpdateUserDto: {
        id: $id
      email: $username
      name: $email
    }) {
      id
      name
      email
    }
  }
`;


const EditProfileScreen: React.FC = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [editUser, { data, loading, error }] = useMutation(EDITPROFILE);

    const { user } = useUser();
    let email = '';
    let userName = '';

    const userid = user.userID.toString();

    const useridInt = parseInt(userid, 10);

    email = user.userEmail;
    userName = user.userName;

    const onEditPressed = () => {
        if (username && mail) {
            
         
            const updateUserInput = {
                email: mail,
                name: username
            };
            editUser({
              variables: {
                input: updateUserInput,
              },
            })
              .then((data) => {
                navigation.navigate("Home");
              })
              .catch((error) => {});

        } else {
        }
      };
    const onProfilePressed = () => {
        navigation.navigate("Profile");
    };




  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}> Editar Usuario</Text>

        <CustomInput
          placeholder={userName}
          value={username}
          setValue={setUsername}
        />

        <CustomInput placeholder={email} value={mail} setValue={setMail} />


        <CustomButton text={"Editar"} onPress={onEditPressed} />

        <CustomButton text={"Volver"} onPress={onProfilePressed} />

        {error && <Text style={styles.alert}>{error.message}</Text>}

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

export default EditProfileScreen;
