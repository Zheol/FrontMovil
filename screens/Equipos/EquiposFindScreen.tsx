import {
  Dimensions,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Spacing from "../../constants/Spacing";
import Font from "../../constants/Font";
import FontSize from "../../constants/FontSize";
import { gql, useLazyQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const { height } = Dimensions.get("window");
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import AppTextInput from "../../components/AppTextInput";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { formFindEquipo } from "./types";
import {
  Button,
  PaperProvider,
  Divider,
  Icon,
  ActivityIndicator,
} from "react-native-paper";
import UserProfileModal from "../../components/UserProfileModal";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const schema = yup.object().shape({
  nombre: yup.string().required("Name is required"),
});

const FIND_EQUIPO = gql`
  query ($getEquipoInput: getEquipoInput!) {
    getEquiposbyIdProyectoName(getEquipoInput: $getEquipoInput) {
      id
      nombre
    }
  }
`;

interface Equipo {
  id: number;
  nombre: string;
}

export default function EquipoFindScreen({ route }) {
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
  const { idProyecto, nombreProyecto} =
    route.params;
  const {
    nameUser,
    emailUser,
    idUser,
  } = useContext(UserContext);
  const [getEquipo, { loading, error, data }] = useLazyQuery(FIND_EQUIPO);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const onPressSend: SubmitHandler<formFindEquipo> = (formData) => {
    getEquipo({
      variables: {
        getEquipoInput: {
          nombre: formData.nombre,
          idProyecto: idProyecto,
        },
      },
    });
    reset({ nombre: "" });
  };

  const navigation = useNavigation();

  const equipos: Equipo[] =
    data?.getEquiposbyIdProyectoName?.map((item: Equipo) => ({
      id: item.id,
      nombre: item.nombre,
    })) || [];

  return (
    <PaperProvider>
      <View
        style={{
          padding: Spacing * 2,
          marginTop: 20,
        }}
      >
        <UserProfileModal
          visible={modalVisible}
          hideModal={hideModal}
          nombre={nameUser}
          email={emailUser}
          idUser={idUser}
        />
        <View
          style={{
            alignItems: "center",
            paddingTop: 20,
          }}
        >
          <Text
            style={{
              fontFamily: Font["poppins-semiBold"],
              fontSize: FontSize.large,
              maxWidth: "60%",
              textAlign: "center",
            }}
          >
            Buscar Equipo
          </Text>
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
          <View style={{ height: 25 }}>
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
                Buscar
              </Text>
            </TouchableOpacity>
          )}

          <View style={{ width: "100%" }}>
            <Divider />
          </View>

          <View style={{ marginBottom: 60 }}>
            <ScrollView>
              <View style={{ paddingTop: 20 }}>
                {equipos.map((equipos: Equipo) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginVertical: 20,
                        backgroundColor: "#ffebcd",
                        height: 120,
                        borderRadius: 10,
                      }}
                      key={equipos.id}
                      onPress={() => {
                        // MANDAR A LA PANTALLA DEL Tareas
                        navigation.navigate("TareasNav", {
                          nombreProyecto: nombreProyecto,
                          idProyecto: idProyecto,
                          nombreEquipo: equipos.nombre,
                          idEquipo: equipos.id,
                        });
                      }}
                    >
                      <Text
                        style={{
                          width: 350,
                          color: "black",
                          textAlign: "center",
                          paddingTop: 45,
                        }}
                      >
                        {equipos.nombre}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </PaperProvider>
  );
}
