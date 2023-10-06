import React, { useState } from 'react';
import { View, Text, StyleSheet,ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const NewPasswordScreen: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [ConfirmPassword, setConfirmPassword] = useState<string>('');
  const navigation = useNavigation();


  const onConfirmPressed = () => {
    console.warn("Contraseña Cambiada")
    navigation.navigate('InicioSesion');
  }

  const onHomePagePressed = () => {
    navigation.navigate('InicioSesion');
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}> Resetear Contraseña</Text>

        <CustomInput
          placeholder="Codigo"
          value={code}
          setValue={setCode}
        />
        <CustomInput
          placeholder="Nueva Contraseña"
          value={password}
          setValue={setPassword}
        />
        <CustomInput
          placeholder="Repita la Contraseña"
          value={ConfirmPassword}
          setValue={setConfirmPassword}
        />

        <CustomButton text={"Confirmar"} onPress={onConfirmPressed}/>

        <CustomButton text={"Volver al Inicio"} onPress={onHomePagePressed} type="TERTIARY" />
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 500,
    maxHeight: 200,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#051C60",
    margin: 20,
  },

});

export default NewPasswordScreen;