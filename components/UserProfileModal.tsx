// UserProfileModal.tsx
import React from 'react';
import { Text, View } from 'react-native';
import {
    Modal,
    Portal,
    Button,
    PaperProvider,
    Divider,
    Icon,
  } from "react-native-paper";
  import Font from "../constants/Font";
  import FontSize from "../constants/FontSize";
import { useNavigation } from '@react-navigation/native';
interface UserProfileModalProps {
  visible: boolean;
  hideModal: () => void;
  nombre: string;
  email: string;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  visible,
  hideModal,
  nombre,
  email,
}) => {
  const containerStyle = {
    backgroundColor: 'white',
    padding: 40,
    alignItems: 'center',
  };

  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
        <Text
          style={{
            fontFamily: Font['poppins-semiBold'],
            fontSize: FontSize.large,
            textAlign: 'center',
          }}
        >
          Usuario
        </Text>
        <Text style={{ padding: 5, fontSize: FontSize.large }}>
          Nombre: {nombre}
        </Text>
        <Text style={{ padding: 5, fontSize: FontSize.large }}>
          Email: {email}
        </Text>
        <View
          style={{
            marginTop: 30,
            alignSelf: 'flex-end',
          }}
        >
          <Button onPress={goToLogin}>
            {/* Assuming Icon is your custom component, adjust it accordingly */}
            <Icon source="exit-to-app" size={25} />
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default UserProfileModal;
