import {
  Dimensions,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import { gql, useMutation } from "@apollo/client";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AppTextInput from "../../components/AppTextInput";
import Colors from "../../constants/Colors";
import { formCreateEquipo } from "./types";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  PaperProvider,
  Divider,
  Icon,
  ActivityIndicator
} from "react-native-paper";
import UserProfileModal from "../../components/UserProfileModal";
import { useState } from "react";

const { height } = Dimensions.get("window");

const CREATE_EQUIPO = gql`
  mutation createEquipo($input: CreateEquipoInput!) {
    createEquipo(createEquipoInput: $input) {
      nombre
      id
    }
  }
`;


const schema = yup.object().shape({
  nombre: yup.string().required("Name is required"),
});

export default function EquipoCreateScreen({ route }) {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: "",
    },
  });

  const navigation = useNavigation();
  const { idUser, nombreUser, idProyecto, nombreProyecto, email } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const [createEquipo, { loading, error }] = useMutation(CREATE_EQUIPO);

  const onPressSend: SubmitHandler<formCreateEquipo> = (formData) => {
    const createProyectoInput = {
      nombre: formData.nombre,
      idAdmin: idUser,
      idProyecto: idProyecto,
    };
    createEquipo({
      variables: {
        input: createProyectoInput,
      },
    })
      .then((response) => {
        const data = response.data;
        if (data && data.createEquipo) {
          reset({ nombre: "" });
          navigation.navigate("MisEquipos");
        }
      })
      .catch((error) => {});
  };

  return (
    <PaperProvider>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <UserProfileModal 
          visible={modalVisible}
          hideModal={hideModal}
          nombre= {nombreUser}
          email= {email}
        />
        <View
          style={{
            marginTop: 30,
            alignSelf: "flex-start",
          }}
        >
          <Button onPress={showModal}>
            <Icon source="magnify" size={30} />
          </Button>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
              marginTop: -43,
              paddingBottom: 10,
            }}
          >
            Crear Equipo
          </Text>
          <View
            style={{
              alignSelf: "flex-end",
              marginTop: -50,
            }}
          >
            <Button onPress={showModal}>
              <Icon source="account-details" size={30} />
            </Button>
          </View>
        </View>
        <View style={{ width: "100%" }}>
            <Divider />
          </View>

        <View
          style={{
            marginVertical: Spacing * 1,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                value={value}
                onChangeText={onChange}
                placeholder="Nombre"
              />
            )}
            name="nombre"
          />
          <View style={{ height: 15 }}>
            {errors.nombre && (
              <Text style={{ color: "red" }}>{errors.nombre.message}</Text>
            )}
          </View>

          {loading ? (
            <View
              style={{
                padding: Spacing * 1.5,
                marginVertical: Spacing * 3,
              }}
            >
              <ActivityIndicator size="large" color="#d2691e" />
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit(onPressSend)}
              style={{
                padding: Spacing * 1.5,
                backgroundColor: "#005050",
                marginTop: 20,
                borderRadius: Spacing,
                shadowColor: Colors.primary,
                shadowOffset: {
                  width: 0,
                  height: Spacing,
                },
                shadowOpacity: 0.3,
                shadowRadius: Spacing,
              }}
            >
              <Text
                style={{
                  fontFamily: Font["poppins-bold"],
                  color: Colors.onPrimary,
                  textAlign: "center",
                  fontSize: FontSize.large,
                }}
              >
                Crear
              </Text>
            </TouchableOpacity>
          )}

          <View style={{ height: 40, paddingTop: 20 }}>
            {error && (
              <Text style={{ color: "red", textAlign: "center" }}>
                {error.message}
              </Text>
            )}
          </View>
        </View>
      </View>
    </PaperProvider>
  );
}
