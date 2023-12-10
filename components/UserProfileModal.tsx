// UserProfileModal.tsx
import React from "react";
import { Text, View } from "react-native";
import {
  Modal,
  Portal,
  Button,
  Icon,
  PaperProvider,
  Divider,
} from "react-native-paper";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "./AppTextInput";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
interface UserProfileModalProps {
  visible: boolean;
  hideModal: () => void;
  nombre: string;
  email: string;
  idUser: number;
}
const UserProfileModal: React.FC<UserProfileModalProps> = ({
  visible,
  hideModal,
  nombre,
  email,
  idUser,
}) => {
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text
          style={{
            fontFamily: Font["poppins-semiBold"],
            fontSize: FontSize.large,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          Usuario
        </Text>

        <View style={{ width: "100%", marginBottom: 10 }}>
          <Divider />
        </View>
        <View>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
            }}
          >
            Nombre
          </Text>
        </View>
        <AppTextInput placeholder={nombre} />
        <View>
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
            }}
          >
            Email
          </Text>
        </View>
        <AppTextInput placeholder={email} />

        <View
          style={{
            marginVertical: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            mode="outlined"
            onPress={goToLogin}
            style={{ width: "45%", marginRight: 10 }}
          >
            Actualizar
          </Button>
          <Button
            mode="outlined"
            onPress={goToLogin}
            style={{ width: "45%", marginLeft: 10 }}
          >
            Exit
          </Button>
        </View>

        <TouchableOpacity>
          <Text
            onPress={() => {
              navigation.navigate("ChangePassword", { idUser });
            }}
            style={{
              marginTop: 10,
              fontFamily: Font["poppins-semiBold"],
              color: Colors.text,
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            Actualizar contraseña
          </Text>
        </TouchableOpacity>
        <View style={{ width: "100%", marginTop: 15, marginBottom: 20 }}>
          <Divider />
        </View>
      </Modal>
    </Portal>
  );
};

export default UserProfileModal;
