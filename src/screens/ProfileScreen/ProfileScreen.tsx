import { View, Text } from 'react-native'
import React from 'react'
import CustomButtonIcon from '../../components/CustomButtonIcon.tsx/CustomButtonIcon'
import CustomBox from '../../components/CustomBox'
import CustomButton from '../../components/CustomButton'
import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../../User/UserContext";



const OBTENER_USUARIO = gql`
  query ObtenerUsuario($email: String!) {
    user(email: $email) {
      name
      email
    }
  }
`;

const ProfileScreen = () => {
    const { user } = useUser();
    
    const navigation = useNavigation();

    const email = user.userEmail


    const { loading, error, data } = useQuery(OBTENER_USUARIO, {
        variables: { email: email },
    });

    if (loading) return <Text>Cargando...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;

    const userQ = data.user;
    const userName = userQ.name;

    const onEditPressed = () => {
        navigation.navigate("Edit");
      };
    const onBackPressed = () => {
    navigation.navigate("Home");
    };

    return (
        <View>
            <CustomButtonIcon/>
            
            <Text>Nombre:</Text>
            <CustomBox texto={userName} />

            <Text>Correo:</Text>
            <CustomBox texto={email} />

            <CustomButton text='Editar' onPress={onEditPressed} ></CustomButton>

            <CustomButton text='Volver' onPress={onBackPressed} ></CustomButton>
        </View>     
    )
}

export default ProfileScreen;
