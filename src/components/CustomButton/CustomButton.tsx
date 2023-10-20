import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React from "react";

interface CustomInputProps {
  onPress: () => void;
  text: string;
  type?: string;
  bgColor?: string;
  fgColor?: string;
}

const CustomButton: React.FC<CustomInputProps> = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}: any) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    
    padding: 10,
    marginVertical: 5,
  },

  container_PRIMARY: {
    backgroundColor: "#3B71F3",
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
    maxWidth: 350,
  },

  container_TERTIARY: {
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
    maxWidth: 350,
  },

  text: {
    fontWeight: "bold",
    color: "white",
  },

  text_TERTIARY: {
    color: "gray",
  },
});

export default CustomButton;
