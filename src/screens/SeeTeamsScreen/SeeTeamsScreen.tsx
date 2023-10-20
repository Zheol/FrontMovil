import { View, Text, FlatList, Button} from 'react-native'
import React from 'react'
import { useUser } from "../../User/UserContext";
import { gql, useQuery } from "@apollo/client";
import CustomButtonIcon from '../../components/CustomButtonIcon.tsx/CustomButtonIcon';
import { useNavigation } from "@react-navigation/native";
import CustomButton from '../../components/CustomButton';

const OBTENER_USUARIO = gql`
  query ObtenerUsuario($email: String!) {
    user(email: $email) {
      name
      equipos{nombre}
    }
  }
`;


const SeeteamsScreen = () => {
    const navigation = useNavigation();
    const { user } = useUser();
    const email = user.userEmail;
    const { loading, error, data } = useQuery(OBTENER_USUARIO, {
      variables: { email: email },
    });

    const onProfilePressed = () => {
        navigation.navigate("Profile");
    };

    const onBackPressed = () => {
        navigation.navigate("Home");
    };
    const onDeletePressed = () => {
        navigation.navigate("Delete");
    };
    
  
    if (loading) return <Text>Cargando...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
  
    const userQ = data.user.equipos;
  
    return (
        <View>
            <CustomButtonIcon
            text={""}
            onPress={onProfilePressed}
            />
          <Text>Equipos:</Text>
          <FlatList
            data={userQ}
            keyExtractor={(equipo, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10}}>
                <Text style={{ flex: 1 }}>{item.nombre}</Text>
                <Button
                  title="Ver Miembros"
                  onPress={() => {
                    // Realiza la acción relacionada con el elemento aquí
                    console.log("Realiza una acción para " + item.nombre);
                  }}
                />
                 
              </View>
            )}
          />
          <CustomButton text='Agregar Miembro equipo' onPress={onBackPressed} bgColor='green' />
          <CustomButton text='Eliminar Equipo' onPress={onDeletePressed} bgColor='red' />
          <CustomButton text='Volver' onPress={onBackPressed} />
        </View>
      );
  };

export default SeeteamsScreen