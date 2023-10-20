import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CustomBoxProps {
  texto: string;
}

const CustomBox: React.FC<CustomBoxProps> = ({ texto }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{texto}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: 35,
    maxWidth: 350,
    borderColor: 'e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  text: {
    marginVertical: 5,
  },
});

export default CustomBox;
