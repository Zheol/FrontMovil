import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions,ScrollView} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const InicioSesion: React.FC = () => {
  const [mail, setMail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSingInPressed = () => {
    //validar el usuario
    navigation.navigate('Home');
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  }

  const onSignUpPressed = () => {
    navigation.navigate('SignUp');
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <Image source={require('../../assets/logo_1.png')} style={[styles.logo, { height: height * 0.3 }]} resizeMode='contain' />

        <CustomInput
          placeholder="Usuario"
          value={mail}
          setValue={setMail}
        />
        <CustomInput
          placeholder="Contraseña"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <CustomButton text={"Acceder"} onPress={onSingInPressed}/>

        <CustomButton text={"¿Olvidaste tu contraseña?"} onPress={onForgotPasswordPressed} type="TERTIARY" />

        <CustomButton text={"Crear Cuenta"} onPress={onSignUpPressed} type="TERTIARY" />
        
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
});

export default InicioSesion;
