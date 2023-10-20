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

import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import CustomButtonIcon from "../../components/CustomButtonIcon.tsx/CustomButtonIcon";
import { useUser } from "../../User/UserContext";



const HomeScreen = () => {

    const navigation = useNavigation();

    const onProfilePressed = () => {
        navigation.navigate("Profile");
    };
    const onCreateTeamPressed = () =>{
        navigation.navigate("CreateTeam")
    };
    const onSeeTeamsPressed = () => {
        navigation.navigate("Teams")
    };


    return (
        <ScrollView>
        <View>
            <CustomButtonIcon
            text={""}
            onPress={onProfilePressed}
            />
            <CustomButton text="Crear Equipo" onPress={onCreateTeamPressed}></CustomButton>

            <CustomButton text="Ver Equipos" onPress={onSeeTeamsPressed}></CustomButton>
        </View>
        </ScrollView>
    );
};

export default HomeScreen;
