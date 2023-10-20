import { View, Text, FlatList, Button} from 'react-native'
import React, { useState, useEffect  } from "react";
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


const DeleteTeamScreen = () => {
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

    const [visibleTeams, setVisibleTeams] = useState(userQ);

    useEffect(() => {
        if (!loading && !error && data) {
          setVisibleTeams(data.user.equipos);
        }
      }, [loading, error, data]);

    const handleDeleteTeam = (teamName) => {
        // Filtra los equipos para excluir el equipo a eliminar
        const updatedTeams = visibleTeams.filter((team) => team.nombre !== teamName);
        setVisibleTeams(updatedTeams);
        console.log(visibleTeams)
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
            data={visibleTeams}
            keyExtractor={(equipo) => equipo.nombre}
            renderItem={({ item }) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ flex: 1 }}>{item.nombre}</Text>
                <Button
                  title="Eliminar Equipo"
                  color="red" // Aquí establecemos el color a rojo
                  onPress={() => {
                    handleDeleteTeam(item.nombre);
                  }}
                />
              </View>
            )}
          />
          <CustomButton text='Agregar Miembro equipo' onPress={onBackPressed} bgColor='green' />
          <CustomButton text='Eliminar Equipo' onPress={onBackPressed} bgColor='red' />
          <CustomButton text='Volver' onPress={onBackPressed} />
        </View>
      );
  };
export default DeleteTeamScreen