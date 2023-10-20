import { View, Text, StyleSheet, Pressable, Image,TouchableOpacity  } from "react-native";
import React from "react";
  
  const CustomButtonIcon: React.FC = ({
    onPress,
  }: any) => {
    return (
        <TouchableOpacity onPress={onPress}>
          <Image
            source={require('../../assets/user.png')}
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
      );
  };
  
  const styles = StyleSheet.create({
    container: {
        width: "16%",
        backgroundColor: "white",
        paddingTop: "10%",
        marginVertical: 30,
        marginLeft: 10,
    },
  
    container_ICON: {
        width: "16%",
        backgroundColor: "white",
        paddingTop: "10%",
        marginVertical: 30,
        marginLeft: 10,
    },

    logo: {
        width: "16%",
        backgroundColor: "white",
        paddingTop: "10%",
        marginVertical: 30,
        marginLeft: 10,
    }
  
  });


export default CustomButtonIcon