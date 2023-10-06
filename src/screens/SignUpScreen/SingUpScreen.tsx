import React, { useState } from 'react';
import { View, Text, StyleSheet,ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const SingUpScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRepeat, setPasswordRepeat] = useState<string>('');
  const navigation = useNavigation();

  const onRegisterPressed = () => {
    console.warn("Registrado")
    navigation.navigate('Home');
  }

  const onHaveAnAccountPressed = () => {
    navigation.navigate('InicioSesion');
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}> Crear Cuenta</Text>

        <CustomInput
          placeholder="Nombre"
          value={username}
          setValue={setUsername}
        />

        <CustomInput
          placeholder="Correo"
          value={mail}
          setValue={setMail}
        />

        <CustomInput
          placeholder="Contraseña"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <CustomInput
          placeholder="Repetir Contraseña"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry
        />

        <CustomButton text={"Registrar"} onPress={onRegisterPressed}/>

        <CustomButton text={"¿Ya tienes una cuenta?"} onPress={onHaveAnAccountPressed} type="TERTIARY" />
        
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

export default SingUpScreen;
