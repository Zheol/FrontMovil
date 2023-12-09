import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import * as yup from "yup";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { gql, useMutation } from "@apollo/client";
import { formCreateProyect } from "../../types";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import AppTextInput from "../../components/AppTextInput";
import Colors from "../../constants/Colors";
const { height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import UserProfileModal from "../../components/UserProfileModal";
import { Button, PaperProvider, Divider, Icon } from "react-native-paper";

const CREATE_PROYECTO = gql`
  mutation createProyecto($input: CreateProyectoInput!) {
    createProyecto(createProyectoInput: $input) {
      nombre
    }
  }
`;

const schema = yup.object().shape({
  nombre: yup.string().required("Campo requerido"),
  area: yup.string().required("Campo requerido"),
});

export default function ProyectoCreateScreen({ route }) {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: "",
      area: "",
    },
  });
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const { nombre, email, id } = route.params;

  const navigation = useNavigation();

  const [createProyecto, { loading, error }] = useMutation(CREATE_PROYECTO);

  const onPressSend: SubmitHandler<formCreateProyect> = (formData) => {
    const createProyectoInput = {
      nombre: formData.nombre,
      idAdmin: id,
      area: formData.area,
    };
    createProyecto({
      variables: {
        input: createProyectoInput,
      },
    })
      .then((response) => {
        const data = response.data;
        if (data && data.createProyecto) {
          reset({ nombre: "", area: "" });
          //crear alerta o dialogo de creacion
          navigation.navigate("MisProyectos");
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
          nombre={nombre}
          email={email}
        />
        <View
          style={{
            marginTop: 30,
            alignSelf: "flex-end",
          }}
        >
          <Button onPress={showModal}>
            <Icon source="dots-vertical" size={25} />
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
              marginTop: -40,
              paddingBottom: 10,
            }}
          >
            Crear Proyecto
          </Text>
          <View style={{ width: "100%" }}>
            <Divider />
          </View>
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
          <View style={{ height: 17 }}>
            {errors.nombre && (
              <Text style={{ color: "red" }}>{errors.nombre.message}</Text>
            )}
          </View>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <AppTextInput
                value={value}
                onChangeText={onChange}
                placeholder="Área"
              />
            )}
            name="area"
          />
          <View style={{ height: 17 }}>
            {errors.area && (
              <Text style={{ color: "red" }}>{errors.area.message}</Text>
            )}
          </View>
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
    </PaperProvider>
  );
}
