import { StyleSheet, TextInput, TextInputProps } from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";

const AppTextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  ...otherProps
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={Colors.darkText}
      style={[
        {
          fontFamily: Font["poppins-regular"],
          fontSize: FontSize.small,
          padding: Spacing * 1.1,
          backgroundColor: Colors.lightPrimary,
          borderRadius: Spacing,
          marginVertical: Spacing,
        },
        focused && {
          borderWidth: 1,
          borderColor: "#00000",
          shadowOffset: { width: 4, height: Spacing },
          shadowColor: Colors.primary,
          shadowOpacity: 0.2,
          shadowRadius: Spacing,
        },
      ]}
      {...otherProps}
    />
  );
};

export default AppTextInput;

const styles = StyleSheet.create({});
