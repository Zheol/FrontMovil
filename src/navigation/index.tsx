import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InicioSesion from '../screens/InicioSesion';
import SignUpScreen from '..//screens/SignUpScreen';
import ForgotPasswordScreen from '..//screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen/Index';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import CreateTeamScreen from '../screens/CreateTeamScreen';
import SeeTeamsScreen from '../screens/SeeTeamsScreen';
import DeleteTeamScreen from '../screens/DeleteTeamScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="InicioSesion" component={InicioSesion} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />        
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Edit" component={EditProfileScreen} />
        <Stack.Screen name="CreateTeam" component={CreateTeamScreen} />
        <Stack.Screen name="Teams" component={SeeTeamsScreen} />
        <Stack.Screen name="Delete" component={DeleteTeamScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation